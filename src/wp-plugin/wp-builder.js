import { readdir, readFile, writeFile } from "fs/promises";
import path, { join } from "path";
import { JSDOM } from "jsdom";
import { format } from "prettier";

console.log("RUNNING..");

const sectionsDir = path.join(process.cwd(), "src/sections");
const indexFile = path.join(process.cwd(), "index.html");

try {
  const files = await readdir(sectionsDir);
  console.log("files", files);

  let combinedContent = "";

  for (const file of files) {
    const path = join(sectionsDir, file);
    const content = await readFile(path, "utf-8");
    combinedContent += content + "\n";
  }
  console.log("combinedContent");
  console.log(combinedContent);

  let indexFileContent = await readFile(indexFile, "utf-8");
  console.log("indexFileContent");
  console.log(indexFileContent);

  const dom = new JSDOM(indexFileContent);
  const document = dom.window.document;
  const appDiv = document.querySelector("#app");
  console.log(appDiv);

  appDiv.innerHTML = combinedContent;
  console.log("appDiv.innerHTML", appDiv.innerHTML);

  let serializedIndexFile = dom.serialize();
  console.log("dom.serialize()", serializedIndexFile);
  serializedIndexFile = await format(serializedIndexFile, { parser: "html" });
  await writeFile(indexFile, serializedIndexFile, "utf-8");

  // indexFileContent = "Just this"
  // await writeFile(indexFile, indexFileContent, "utf-8");

  // const appDivStart = indexFileContent.indexOf(`<div id="app">`);
  // const appDivEnd = indexFileContent.indexOf(`</div>`);
  // console.log("appDivStart appDivEnd", appDivStart, appDivEnd);

  // if (appDivStart !== -1 && appDivEnd !== -1) {
  //   indexFileContent =
  //     indexFileContent.slice(0, appDivStart + 13) +
  //     "\n" +
  //     "combinedContent" +
  //     "\n" +
  //     indexFileContent.slice(appDivEnd - 6);

  //   await writeFile(indexFile, indexFileContent, "utf-8");
  //   console.log("Successfully created index.html");
  // } else {
  //   console.error(`Couldn't find <div id="app"></div>`);
  // }
} catch (err) {
  console.log(err);
}
