/ / Vercel Serverless Function for the Chat proxy.
 // Deploy this file by creating a Vercel project from the geofy repo and leaving the root as `/`
 // Vercel will automatically expose /api/chat
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send({ error: 'Method not allowed' });
    }
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const MODEL_NAME = process.env.MODEL_NAME || 'gpt-5';

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
    }

    const { messages, max_tokens = 600, temperature = 0.2 } = req.body ?? {};

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
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

    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err: any) {
    console.error('vercel/api/chat error:', err);
    res.status(500).json({ error: 'proxy error', details: err.message });
  }
}
