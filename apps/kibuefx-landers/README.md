Copy the KibueFx-Landers site here.

If you have the built static site (from https://14georgeant.github.io/KibueFx-Landers/),
copy the build artifacts into apps/kibuefx-landers/dist/ so the assemble script can copy them into docs/.
To include the chat widget, add:
<script src="/assets/shared-chat/widget.js" data-api-base="https://<your-vercel-server>.vercel.app"></script>
