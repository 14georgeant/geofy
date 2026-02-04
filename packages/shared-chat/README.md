Build widget:
1. cd packages/shared-chat
2. npm ci
3. npm run build
4. The built file is dist/widget.js

Include in any static page:
<script src="/assets/shared-chat/widget.js" data-api-base="https://your-vercel-proxy.example.com"></script>

Notes:
- data-api-base is optional. If omitted, the widget will call /api/chat on the same origin (useful if you host the proxy on the same domain).
- The widget expects a server endpoint at {apiBase}/api/chat that returns a structure similar to OpenAI Chat Completions:
  { choices: [ { message: { content: "..." } } ] }
