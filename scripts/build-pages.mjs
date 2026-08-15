import { spawn } from "node:child_process";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = new URL("../dist/client/", import.meta.url);
const projectPath = "/hydeparkavenue";
const publicUrl = `https://benjaminsiegel.github.io${projectPath}`;
const previewUrl = "http://127.0.0.1:4173/";

const server = spawn("npm", ["run", "start"], {
  cwd: new URL("../", import.meta.url),
  env: { ...process.env, PORT: "4173" },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk; });
server.stderr.on("data", (chunk) => { serverOutput += chunk; });

async function getRenderedPage() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(previewUrl);
      if (response.ok) return response.text();
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production server did not start.\n${serverOutput}`);
}

function addPagesBasePath(source) {
  return source
    .replaceAll("/_next/", `${projectPath}/_next/`)
    .replaceAll("/plans/", `${projectPath}/plans/`)
    .replaceAll("/hyde-park-avenue-forest-hills.webp", `${projectPath}/hyde-park-avenue-forest-hills.webp`)
    .replaceAll('"/og.png"', `"${projectPath}/og.png"`)
    .replaceAll('"pathname":"/"', `"pathname":"${projectPath}/"`)
    .replace(/https?:\/\/(?:localhost|127\.0\.0\.1):4173\/(?:hydeparkavenue\/)?og\.png/g, `${publicUrl}/og.png`);
}

async function rewriteBuiltAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const path = join(entry.parentPath, entry.name);
    if (entry.isDirectory()) return rewriteBuiltAssets(path);
    if (![".css", ".js"].includes(extname(entry.name))) return;
    const source = await readFile(path, "utf8");
    const rewritten = addPagesBasePath(source);
    if (rewritten !== source) await writeFile(path, rewritten);
  }));
}

try {
  const renderedPage = addPagesBasePath(await getRenderedPage());
  await rewriteBuiltAssets(outputDirectory);
  await writeFile(new URL("index.html", outputDirectory), renderedPage);
  await writeFile(new URL("404.html", outputDirectory), renderedPage);
  await writeFile(new URL(".nojekyll", outputDirectory), "");
} finally {
  server.kill("SIGTERM");
}
