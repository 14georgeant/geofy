import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL_NAME = process.env.MODEL_NAME || 'gpt-5';

if (!OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. Set it in .env for local testing.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, max_tokens = 600, temperature = 0.2 } = req.body ?? {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages must be an array' });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages,
        max_tokens,
        temperature
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    console.error('server error:', err);
    res.status(500).json({ error: 'proxy error', details: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Local chat proxy running at http://localhost:${port}`));
