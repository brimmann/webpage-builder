# WP Builder

Multi-Page HTML Builder is a JavaScript library designed to streamline the development of single HTML pages by dividing them into multiple sections during development. When building the project, it combines these sections into a single HTML file.

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/brimmann/webpage-builder/.github%2Fworkflows%2Frelease.yml)
![GitHub Release](https://img.shields.io/github/v/release/brimmann/webpage-builder) ![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/brimmannn?style=social)
![NPM Downloads](https://img.shields.io/npm/dw/webpage-builder)


## Features

- **Development Time Splitting**: Divide your HTML into multiple sections for easier development and management.
- **Build Time Merging**: Automatically merge all sections into a single HTML file during the build process.
- **Easy Integration**: Simple to integrate with existing projects and build tools.
- **Vite Based**: It is a vite based plugin.

## Installation

You can install the library via npm:

```bash
npm install wp-builder
```

## Usage
1. Create a vite project with vanilla template.
2. Install this library.
3. Add this library to your `vite.config.js` file.
4. Create your sections in .html format in `src/sections` directory.
5. Add `order.js` file in sections directory

*vite.config.js*
```javascript
import { defineConfig } from "vite";
import wpPlugin from "wp-plugin";


export default defineConfig({
    plugins: [wpPlugin()],
    
})
```

order.js defines the order of your sections in your `src/sections` directory.

*sections/order.js*
```javascript
export default [
 "header.html",
 "main.html",
 "footer.html"
 ];

```

An example directory structure:
```terminal
├───public
│       vite.svg
│       
└───src
    │   client.js
    │   index.js
    │   layout.html
    │   style.css
    │   
    ├───sections
    │       footer.html
    │       header.html
    │       main.html
    │       order.js
    │       
|index.html
```

To run dev server use this command:

```terminal
npm run dev
```
To build your page, use this command:
```terminal
npm run build
``` 

## Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License.


