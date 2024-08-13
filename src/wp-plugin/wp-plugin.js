import buildWp from "./wp-builder"
export default function wpPlugin() {
    return {
        name: "wp-plugin",
        buildStart() {
            console.log("Build started!")
        },
        handleHotUpdate() {
            console.log("Modifying index.html...")
            buildWp()
        },
    }
}