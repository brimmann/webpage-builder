// vite.config.js
import { defineConfig } from "file:///D:/software-projects/webpage-builder/node_modules/vite/dist/node/index.js";

// src/wp-plugin/wp-builder.js
import { readdir, readFile, writeFile } from "fs/promises";
import path, { join } from "path";
import { JSDOM } from "file:///D:/software-projects/webpage-builder/node_modules/jsdom/lib/api.js";
import { format } from "file:///D:/software-projects/webpage-builder/node_modules/prettier/index.mjs";
async function buildWp() {
  console.log("Applying wp...");
  const sectionsDir = path.join(process.cwd(), "src/sections");
  const indexFile = path.join(process.cwd(), "index.html");
  console.log(`looking for order.js file in ${sectionsDir}`);
  const orderFilePath = path.join(sectionsDir, "order.js");
  try {
    const orderArray = await import(orderFilePath);
  } catch (err) {
    console.log(`order.js file not found in ${sectionsDir}`);
  }
  try {
    const files = await readdir(sectionsDir);
    if (files.length <= 0) {
      console.log("No files in sections directory detected");
      return;
    }
    let combinedContent = "";
    for (const file of files) {
      const path2 = join(sectionsDir, file);
      const content = await readFile(path2, "utf-8");
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

// src/wp-plugin/wp-plugin.js
function wpPlugin() {
  return {
    name: "wp-plugin",
    buildStart() {
      console.log("Build started!");
    },
    handleHotUpdate() {
      console.log("Modifying index.html...");
      buildWp();
    }
  };
}

// vite.config.js
var vite_config_default = defineConfig({
  plugins: [wpPlugin()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3dwLXBsdWdpbi93cC1idWlsZGVyLmpzIiwgInNyYy93cC1wbHVnaW4vd3AtcGx1Z2luLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcc29mdHdhcmUtcHJvamVjdHNcXFxcd2VicGFnZS1idWlsZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxzb2Z0d2FyZS1wcm9qZWN0c1xcXFx3ZWJwYWdlLWJ1aWxkZXJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3NvZnR3YXJlLXByb2plY3RzL3dlYnBhZ2UtYnVpbGRlci92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB3cFBsdWdpbiBmcm9tIFwiLi9zcmMvd3AtcGx1Z2luL3dwLXBsdWdpblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFt3cFBsdWdpbigpXVxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcc29mdHdhcmUtcHJvamVjdHNcXFxcd2VicGFnZS1idWlsZGVyXFxcXHNyY1xcXFx3cC1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHNvZnR3YXJlLXByb2plY3RzXFxcXHdlYnBhZ2UtYnVpbGRlclxcXFxzcmNcXFxcd3AtcGx1Z2luXFxcXHdwLWJ1aWxkZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3NvZnR3YXJlLXByb2plY3RzL3dlYnBhZ2UtYnVpbGRlci9zcmMvd3AtcGx1Z2luL3dwLWJ1aWxkZXIuanNcIjtpbXBvcnQgeyByZWFkZGlyLCByZWFkRmlsZSwgd3JpdGVGaWxlIH0gZnJvbSBcImZzL3Byb21pc2VzXCI7XHJcbmltcG9ydCBwYXRoLCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBKU0RPTSB9IGZyb20gXCJqc2RvbVwiO1xyXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwicHJldHRpZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkV3AoKSB7XHJcbiAgY29uc29sZS5sb2coXCJBcHBseWluZyB3cC4uLlwiKTtcclxuXHJcbiAgY29uc3Qgc2VjdGlvbnNEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJzcmMvc2VjdGlvbnNcIik7XHJcbiAgY29uc3QgaW5kZXhGaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiaW5kZXguaHRtbFwiKTtcclxuXHJcbiAgY29uc29sZS5sb2coYGxvb2tpbmcgZm9yIG9yZGVyLmpzIGZpbGUgaW4gJHtzZWN0aW9uc0Rpcn1gKVxyXG4gIGNvbnN0IG9yZGVyRmlsZVBhdGggPSBwYXRoLmpvaW4oc2VjdGlvbnNEaXIsICdvcmRlci5qcycpXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG9yZGVyQXJyYXkgPSBhd2FpdCBpbXBvcnQob3JkZXJGaWxlUGF0aClcclxuICB9IGNhdGNoKGVycikge1xyXG4gICAgY29uc29sZS5sb2coYG9yZGVyLmpzIGZpbGUgbm90IGZvdW5kIGluICR7c2VjdGlvbnNEaXJ9YClcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHJlYWRkaXIoc2VjdGlvbnNEaXIpO1xyXG5cclxuICAgIGlmIChmaWxlcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIk5vIGZpbGVzIGluIHNlY3Rpb25zIGRpcmVjdG9yeSBkZXRlY3RlZFwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb21iaW5lZENvbnRlbnQgPSBcIlwiO1xyXG5cclxuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICBjb25zdCBwYXRoID0gam9pbihzZWN0aW9uc0RpciwgZmlsZSk7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZWFkRmlsZShwYXRoLCBcInV0Zi04XCIpO1xyXG4gICAgICBjb21iaW5lZENvbnRlbnQgKz0gY29udGVudCArIFwiXFxuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGluZGV4RmlsZUNvbnRlbnQgPSBhd2FpdCByZWFkRmlsZShpbmRleEZpbGUsIFwidXRmLThcIik7XHJcblxyXG4gICAgY29uc3QgZG9tID0gbmV3IEpTRE9NKGluZGV4RmlsZUNvbnRlbnQpO1xyXG4gICAgY29uc3QgZG9jdW1lbnQgPSBkb20ud2luZG93LmRvY3VtZW50O1xyXG4gICAgY29uc3QgYXBwRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIik7XHJcblxyXG4gICAgYXBwRGl2LmlubmVySFRNTCA9IGNvbWJpbmVkQ29udGVudDtcclxuXHJcbiAgICBsZXQgc2VyaWFsaXplZEluZGV4RmlsZSA9IGRvbS5zZXJpYWxpemUoKTtcclxuICAgIHNlcmlhbGl6ZWRJbmRleEZpbGUgPSBhd2FpdCBmb3JtYXQoc2VyaWFsaXplZEluZGV4RmlsZSwgeyBwYXJzZXI6IFwiaHRtbFwiIH0pO1xyXG4gICAgYXdhaXQgd3JpdGVGaWxlKGluZGV4RmlsZSwgc2VyaWFsaXplZEluZGV4RmlsZSwgXCJ1dGYtOFwiKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcc29mdHdhcmUtcHJvamVjdHNcXFxcd2VicGFnZS1idWlsZGVyXFxcXHNyY1xcXFx3cC1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHNvZnR3YXJlLXByb2plY3RzXFxcXHdlYnBhZ2UtYnVpbGRlclxcXFxzcmNcXFxcd3AtcGx1Z2luXFxcXHdwLXBsdWdpbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovc29mdHdhcmUtcHJvamVjdHMvd2VicGFnZS1idWlsZGVyL3NyYy93cC1wbHVnaW4vd3AtcGx1Z2luLmpzXCI7aW1wb3J0IGJ1aWxkV3AgZnJvbSBcIi4vd3AtYnVpbGRlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdwUGx1Z2luKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBcIndwLXBsdWdpblwiLFxyXG4gICAgICAgIGJ1aWxkU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgc3RhcnRlZCFcIilcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZUhvdFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNb2RpZnlpbmcgaW5kZXguaHRtbC4uLlwiKVxyXG4gICAgICAgICAgICBidWlsZFdwKClcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUyxTQUFTLG9CQUFvQjs7O0FDQWUsU0FBUyxTQUFTLFVBQVUsaUJBQWlCO0FBQzdYLE9BQU8sUUFBUSxZQUFZO0FBQzNCLFNBQVMsYUFBYTtBQUN0QixTQUFTLGNBQWM7QUFFdkIsZUFBTyxVQUFpQztBQUN0QyxVQUFRLElBQUksZ0JBQWdCO0FBRTVCLFFBQU0sY0FBYyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsY0FBYztBQUMzRCxRQUFNLFlBQVksS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLFlBQVk7QUFFdkQsVUFBUSxJQUFJLGdDQUFnQyxXQUFXLEVBQUU7QUFDekQsUUFBTSxnQkFBZ0IsS0FBSyxLQUFLLGFBQWEsVUFBVTtBQUN2RCxNQUFJO0FBQ0YsVUFBTSxhQUFhLE1BQU0sT0FBTztBQUFBLEVBQ2xDLFNBQVEsS0FBSztBQUNYLFlBQVEsSUFBSSw4QkFBOEIsV0FBVyxFQUFFO0FBQUEsRUFDekQ7QUFFQSxNQUFJO0FBQ0YsVUFBTSxRQUFRLE1BQU0sUUFBUSxXQUFXO0FBRXZDLFFBQUksTUFBTSxVQUFVLEdBQUc7QUFDckIsY0FBUSxJQUFJLHlDQUF5QztBQUNyRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLGtCQUFrQjtBQUV0QixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNQSxRQUFPLEtBQUssYUFBYSxJQUFJO0FBQ25DLFlBQU0sVUFBVSxNQUFNLFNBQVNBLE9BQU0sT0FBTztBQUM1Qyx5QkFBbUIsVUFBVTtBQUFBLElBQy9CO0FBRUEsUUFBSSxtQkFBbUIsTUFBTSxTQUFTLFdBQVcsT0FBTztBQUV4RCxVQUFNLE1BQU0sSUFBSSxNQUFNLGdCQUFnQjtBQUN0QyxVQUFNLFdBQVcsSUFBSSxPQUFPO0FBQzVCLFVBQU0sU0FBUyxTQUFTLGNBQWMsTUFBTTtBQUU1QyxXQUFPLFlBQVk7QUFFbkIsUUFBSSxzQkFBc0IsSUFBSSxVQUFVO0FBQ3hDLDBCQUFzQixNQUFNLE9BQU8scUJBQXFCLEVBQUUsUUFBUSxPQUFPLENBQUM7QUFDMUUsVUFBTSxVQUFVLFdBQVcscUJBQXFCLE9BQU87QUFBQSxFQUN6RCxTQUFTLEtBQUs7QUFDWixZQUFRLElBQUksR0FBRztBQUFBLEVBQ2pCO0FBQ0Y7OztBQ2hEZSxTQUFSLFdBQTRCO0FBQy9CLFNBQU87QUFBQSxJQUNILE1BQU07QUFBQSxJQUNOLGFBQWE7QUFDVCxjQUFRLElBQUksZ0JBQWdCO0FBQUEsSUFDaEM7QUFBQSxJQUNBLGtCQUFrQjtBQUNkLGNBQVEsSUFBSSx5QkFBeUI7QUFDckMsY0FBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQ0o7OztBRlRBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFDeEIsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
