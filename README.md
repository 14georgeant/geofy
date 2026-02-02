# geofy

Combined project site that brings together:
- Probabilistic (apps/probabilistic)
- KibueFx Landers (apps/kibuefx-landers)
- A shared, corner-popup ChatGPT assistant (packages/shared-chat)
- A server proxy you can deploy to Vercel (server/vercel/api/chat.ts)

Quick overview
1. Put your site sources/build outputs:
   - For static builds: place each site's built files into apps/<site>/dist/
   - Or keep framework sources in apps/<site>/ and ensure `npm run build` outputs to dist/

2. Build the shared chat widget:
   - cd packages/shared-chat
   - npm ci
   - npm run build
   - This outputs dist/widget.js

3. Assemble the GitHub Pages site:
   - From repo root:
     - npm ci
     - npm run build
   - This produces docs/ which is deployed to gh-pages by the included GitHub Action.

Chat server (Vercel recommended)
- The Vercel serverless function is at server/vercel/api/chat.ts
- Deploy to Vercel and set environment variable:
  - OPENAI_API_KEY: your OpenAI API key
  - MODEL_NAME (optional): gpt-5 or your desired model id
- After deploy, you'll get a URL like https://geofy-chat-proxy.vercel.app — set data-api-base to that URL when including the widget:
  <script src="/assets/shared-chat/widget.js" data-api-base="https://geofy-chat-proxy.vercel.app"></script>

GitHub Pages
- This scaffold uses a GitHub Action that builds and publishes docs/ to the gh-pages branch when you push to main.
- In Repository Settings > Pages, set the source to the gh-pages branch (if necessary). The action creates / updates the gh-pages branch automatically.

Security notes
- Never commit your OPENAI_API_KEY. Use Vercel's Environment Variables UI to add it.
- Consider adding rate-limiting / auth on the proxy if you plan to expose it publicly.
