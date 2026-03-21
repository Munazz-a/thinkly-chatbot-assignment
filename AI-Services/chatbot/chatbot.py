import os
from urllib import response
from dotenv import load_dotenv
from groq import Groq
from typer import prompt

load_dotenv()  # 👈 MUST be before Groq()

api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

# Question Answering (RAG)
def answer_question(question):
    prompt = f"""
You are an expert Placement Interview Coach.

You help students with:
- DSA (Data Structures & Algorithms)
- HR interview questions
- Resume improvement
- Behavioral answers

Your style:
- Clear and structured
- Practical and actionable
- Slightly encouraging (not robotic)

Response format:

1. Brief Explanation
2. Key Points (bullet points)
3. Example (if applicable)
4. Final Tip

Question: {question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=700
    )

    return response.choices[0].message.content