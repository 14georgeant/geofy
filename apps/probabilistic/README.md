Copy your existing Probabilistic site here.

Options:
- If you have a static build, put it into apps/probabilistic/dist/ (index.html, assets).
- If it's a framework project, keep project sources here and make sure `npm run build` outputs to dist/ (or adapt scripts/assemble-site.js).
To include the chat widget on pages, add:
<script src="/assets/shared-chat/widget.js" data-api-base="https://<your-vercel-server>.vercel.app"></script>
