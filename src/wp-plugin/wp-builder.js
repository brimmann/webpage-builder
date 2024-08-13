import { readdir, readFile, writeFile } from "fs/promises";
import path, { join } from "path";
import { JSDOM } from "jsdom";
import { format } from "prettier";

export default async function buildWp() {
  console.log("Applying wp...");

  const sectionsDir = path.join(process.cwd(), "src/sections");
  const indexFile = path.join(process.cwd(), "index.html");

  try {
    const files = await readdir(sectionsDir);

    if (files.length <= 0) {
      console.log("No files in sections directory detected");
      return;
    }

    let combinedContent = "";

    for (const file of files) {
      const path = join(sectionsDir, file);
      const content = await readFile(path, "utf-8");
      combinedContent += content + "\n";
    }

    let indexFileContent = await readFile(indexFile, "utf-8");

    const dom = new JSDOM(indexFileContent);
    const document = dom.window.document;
    const appDiv = document.querySelector("#app");

    appDiv.innerHTML = combinedContent;

    let serializedIndexFile = dom.serialize();
    serializedIndexFile = await format(serializedIndexFile, { parser: "html" });
    await writeFile(indexFile, serializedIndexFile, "utf-8");
  } catch (err) {
    console.log(err);
  }
}
