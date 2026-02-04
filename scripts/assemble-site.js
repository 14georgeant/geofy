// Copies built outputs into docs/ for GitHub Pages.
// Assumes each app places static build output in dist/ (or you can edit src/dest)
const fs = require('fs-extra');
const path = require('path');

(async () => {
  const root = process.cwd();
  const out = path.join(root, 'docs');
  await fs.remove(out);
  await fs.ensureDir(out);

  const sites = [
    { name: 'probabilistic', src: path.join(root, 'apps', 'probabilistic', 'dist'), dest: path.join(out, 'probabilistic') },
    { name: 'kibuefx-landers', src: path.join(root, 'apps', 'kibuefx-landers', 'dist'), dest: path.join(out, 'kibuefx-landers') }
  ];

  for (const s of sites) {
    if (await fs.pathExists(s.src)) {
      console.log(`Copying ${s.src} -> ${s.dest}`);
      await fs.copy(s.src, s.dest);
    } else {
      console.warn(`Build output missing for ${s.name}. Creating placeholder at ${s.dest}`);
      await fs.ensureDir(s.dest);
      await fs.writeFile(path.join(s.dest, 'index.html'), `<h1>${s.name} placeholder</h1><p>Build output not found. Copy your site into apps/${s.name} or run the app's build into dist/</p>`);
    }
  }

  // copy the shared chat widget into docs/assets/shared-chat/
  const widgetSrc = path.join(root, 'packages', 'shared-chat', 'dist', 'widget.js');
  const widgetDestDir = path.join(out, 'assets', 'shared-chat');
  if (await fs.pathExists(widgetSrc)) {
    await fs.ensureDir(widgetDestDir);
    await fs.copyFile(widgetSrc, path.join(widgetDestDir, 'widget.js'));
    console.log('Copied shared-chat widget to docs/assets/shared-chat/widget.js');
  } else {
    console.warn('shared-chat widget build not found; run `npm run build:shared-chat` first');
  }

  // add index page linking both sites
  const index = `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Geofy — Combined</title></head>
<body>
  <h1>Geofy — Combined Projects</h1>
  <ul>
    <li><a href="./probabilistic/">Probabilistic</a></li>
    <li><a href="./kibuefx-landers/">KibueFx Landers</a></li>
  </ul>
  <p>Chat widget is available as a corner popup when included in each site's pages.</p>
</body>
</html>`;
  await fs.writeFile(path.join(out, 'index.html'), index, 'utf8');

  console.log('Assembled docs/ for GitHub Pages');
})();
