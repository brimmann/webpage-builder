export default function wpPlugin() {
    return {
        name: "wp-plugin",
        buildStart() {
            console.log("Build started!")
        },
        handleHotUpdate({ file, server }) {
            console.log("File updated in ", file, server)
        },
    }
}