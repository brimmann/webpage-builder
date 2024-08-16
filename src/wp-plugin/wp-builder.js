import { readFile, writeFile } from "fs/promises";
import path, { join } from "path";
import { JSDOM } from "jsdom";
import { format } from "prettier";
import { pathToFileURL } from "url";
import { existsSync } from "fs";

export default async function buildWp() {
  console.log("Applying wp...");

  const sectionsDir = path.join(process.cwd(), "src/sections");
  const indexFile = path.join(process.cwd(), "index.html");
  if(!existsSync(sectionsDir)) {
    console.log(`Section directory not found at: ${sectionsDir}`)
    return
  }
  if(!existsSync(indexFile)) {
    console.log(`index.html file not found at: ${indexFile}`)
    return
  }

  console.log(`looking for order.js file in ${sectionsDir}`);
  const orderFile = path.join(sectionsDir, "order.js");
  if(!existsSync(orderFile)) {
    console.log(`order.js file not found at: ${orderFile}`)
    return
  }
  let orderArray;
  try {
    const orderArrayModule = await import(`${pathToFileURL(orderFile).href}?cacheBust=${Date.now()}`);
    orderArray = orderArrayModule.default;
  } catch (err) {
    // console.log(`order.js file not found in ${sectionsDir}`);
    console.log(err);
  }

  try {
    // const files = await readdir(sectionsDir);
    console.log(orderArray);

    // if (files.length <= 0) {
    //   console.log("No files in sections directory detected");
    //   return;
    // }

    let combinedContent = "";

    await Promise.all(
      orderArray.map(async (fileName) => {
        const path = join(sectionsDir, fileName);
        const content = await readFile(path, "utf-8");
        combinedContent += content + "\n";
      })
    );

    // for (const file of files) {
    //   const path = join(sectionsDir, file);
    //   const content = await readFile(path, "utf-8");
    //   combinedContent += content + "\n";
    // }

    let indexFileContent = await readFile(indexFile, "utf-8");

    const dom = new JSDOM(indexFileContent);
    const document = dom.window.document;
    const appDiv = document.querySelector("#app");

    appDiv.innerHTML = combinedContent;

    let serializedIndexFile = dom.serialize();
    serializedIndexFile = await format(serializedIndexFile, { parser: "html" });
    await writeFile(indexFile, serializedIndexFile, "utf-8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("File not found: ", err.path);
    } else {
      console.log("catch", err);
    }
  }
}
