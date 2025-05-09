export default async function handler(req, res) {
  const { text, job } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a resume improvement assistant.",
        },
        {
          role: "user",
          content: `Optimize this resume for the job '${job}':\n${text}`,
        },
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
