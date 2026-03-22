import { useState, useRef, useEffect } from "react";
import { marked } from "marked";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://thinkly-chatbot-assignment.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", content: data.answer },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "bot",
          content: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(input);
  };

  const suggestions = [
    "Start mock interview",
    "Ask me a DSA question",
    "Top DBMS interview questions",
    "Improve my answer: I am a hard worker",
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center text-white">

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl h-[90vh] bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Placement Prep AI
            </h1>
            <p className="text-xs text-gray-400">
              Your personal interview coach
            </p>
          </div>

          <button
            onClick={() => setMessages([])}
            className="text-xs bg-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-3xl font-semibold mb-3">
                Crack Your Next Interview 🚀
              </h2>
              <p className="text-gray-400 mb-6">
                Practice DSA, HR & get instant feedback
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative px-4 py-3 rounded-2xl ${msg.role === "user" ? "max-w-[60%]" : "max-w-[85%]"} text-sm leading-relaxed shadow ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 border border-gray-700"
                }`}
              >
                {msg.role === "bot" && (
                  <button
                    onClick={() => handleCopy(msg.content, i)}
                    className="absolute top-2 right-2 text-[10px] bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                  >
                    {copiedIndex === i ? "Copied!" : "Copy"}
                  </button>
                )}

                <div
                  className="prose prose-invert max-w-none text-sm leading-7"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(msg.content),
                  }}
                />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-4 py-2 rounded-xl text-sm animate-pulse">
                Thinking...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex gap-2 bg-gray-800 rounded-xl p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about interviews..."
              className="flex-1 bg-transparent outline-none text-sm px-2"
            />

            <button
              onClick={() => sendMessage(input)}
              className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}