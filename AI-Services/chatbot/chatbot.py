import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()  # 👈 MUST be before Groq()

api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

def answer_question(question):
    q = question.lower()

    # 🧠 MOCK INTERVIEW MODE
    if "start mock interview" in q:
        prompt = """
You are a professional HR interviewer for a Software Engineer role.

Start a mock interview.

STRICT RULES:
- Ask ONLY ONE question at a time
- DO NOT answer on behalf of the candidate
- DO NOT add explanations
- Wait for user's response before continuing

Start with:
"Tell me about yourself."
"""

    elif "answer:" in q or "my answer:" in q:
        prompt = f"""
You are an HR interviewer evaluating a candidate.

STRICT RULES:
- Evaluate ONLY the given answer
- DO NOT introduce unrelated topics
- After feedback, ask ONLY ONE next relevant interview question

User's answer:
{question}

Format in Markdown:

**Strengths**
- ...

**Weaknesses**
- ...

**Improved Answer**
- ...

**Next Question**
- ...
"""

    else:
        prompt = f"""
You are an expert Placement Interview Coach.

STRICT RULES:
- Answer ONLY the user's question
- DO NOT introduce new topics or random interview questions
- Stay focused and relevant

Format response in Markdown:

**Explanation**
...

**Key Points**
- ...

**Example Answer**
...

**Final Tip**
...

At the end, suggest EXACTLY 2 relevant follow-up questions:

**Follow-up**
- ...
- ...

Question: {question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,  # slightly lower = more control
        max_tokens=700
    )

    return response.choices[0].message.content