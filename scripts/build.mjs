import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(projectRoot, "src/pagepatch.js");
const outputPath = resolve(projectRoot, "dist/pagepatch.js");
const deployScriptPath = resolve(projectRoot, "deploy/pagepatch.js");
const demoSourcePath = resolve(projectRoot, "demo/index.html");
const deployDemoPath = resolve(projectRoot, "deploy/demo/index.html");
const iconPath = resolve(projectRoot, "assets/pagepatch-icon.png");
const iconSmallPath = resolve(projectRoot, "assets/pagepatch-icon-64.png");
const deployIconPath = resolve(projectRoot, "deploy/pagepatch-icon.png");
const source = await readFile(sourcePath, "utf8");
const iconData = await readFile(iconSmallPath);
const banner = "/* PagePatch v0.5.0 | Standalone visual change-request editor */\n";
const builtScript = banner + source.replace("__PAGEPATCH_ICON_DATA__", `data:image/png;base64,${iconData.toString("base64")}`);
const demoSource = await readFile(demoSourcePath, "utf8");

await mkdir(dirname(outputPath), { recursive: true });
await mkdir(dirname(deployDemoPath), { recursive: true });
await writeFile(outputPath, builtScript, "utf8");
await writeFile(deployScriptPath, builtScript, "utf8");
await writeFile(deployDemoPath, demoSource.replace("../dist/pagepatch.js", "../pagepatch.js"), "utf8");
await copyFile(iconPath, deployIconPath);
console.log(`Built ${outputPath}`);
console.log(`Prepared ${resolve(projectRoot, "deploy")}`);
