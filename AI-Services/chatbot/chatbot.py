import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()  # 👈 MUST be before Groq()

api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

# Question Answering (RAG)
def answer_question(question):
    q = question.lower()

    # 🧠 MOCK INTERVIEW MODE
    if "start mock interview" in q:
        prompt = """
You are a professional HR interviewer for a Software Engineer role.

Start a mock interview.

- Ask ONE question at a time
- Wait for the user's response
- Keep it realistic and conversational

Start with:
"Tell me about yourself."
"""
    elif "answer:" in q or "my answer:" in q:
        prompt = f"""
You are an HR interviewer evaluating a candidate.

User's answer:
{question}

Give feedback in Markdown format:

**Strengths**
- ...

**Weaknesses**
- ...

**Improved Answer**
- ...

Then ask the NEXT interview question.
"""
    else:
        prompt = f"""
You are an expert Placement Interview Coach.

Format response in Markdown:

**Explanation**
...

**Key Points**
- ...

**Example**
...

**Final Tip**
...

Also suggest 2 short follow-up questions at the end like:
- Follow-up: ...
- Follow-up: ...

Question: {question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=700
    )

    return response.choices[0].message.content