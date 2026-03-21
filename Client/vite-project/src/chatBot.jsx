import { useState, useRef, useEffect } from "react";
import { marked } from "marked";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    const newMessages = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: msg }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "bot", content: data.answer },
      ]);
    } catch (err) {
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
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  const suggestions = [
    "Ask me a DSA question",
    "Start a mock HR interview",
    "Tell me top DBMS interview questions",
    "Improve my answer: 'I am a hard worker'",
  ];

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Placement Prep AI</h1>
          <p className="text-sm text-gray-400">
            Your personal interview coach
          </p>
        </div>
        <button
          onClick={() => setMessages([])}
          className="text-sm bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        
        {messages.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-2">
              Crack Your Next Interview 🚀
            </h2>
            <p className="text-gray-400 mb-6">
              Practice DSA, HR questions, and get instant feedback
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-700"
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
              className={`px-4 py-3 rounded-2xl max-w-xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 border border-gray-700 prose prose-invert max-w-none"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(msg.content),
                }}
              />
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-2 rounded-xl text-sm">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about DSA, HR, interviews..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 outline-none text-sm"
        />
        <button
          onClick={() => sendMessage(input)}
          className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}