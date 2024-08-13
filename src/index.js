import buildWp from "./wp-plugin/wp-builder"
export default function wpPlugin() {
    return {
        name: "wp-plugin",
        buildStart() {
            console.log("Modifying index.html for build...")
            buildWp()
        },
        handleHotUpdate() {
            console.log("Modifying index.html...")
            buildWp()
        },
    }
}