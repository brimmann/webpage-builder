# WP Builder

Multi-Page HTML Builder is a JavaScript library designed to streamline the development of single HTML pages by dividing them into multiple sections during development. When building the project, it combines these sections into a single HTML file.

## Features

- **Development Time Splitting**: Divide your HTML into multiple sections for easier development and management.
- **Build Time Merging**: Automatically merge all sections into a single HTML file during the build process.
- **Easy Integration**: Simple to integrate with existing projects and build tools.
- **Vite Based**: It is a vite based plugin

## Installation

You can install the library via npm:

```bash
npm install wp-builder
```

## Usage
Create a vanilla vite project and then create a folder named **sections** inside your src folder and add file order.js to it. Add all your sections of html that you want to be part of yoru page and export and default from your order.js file.

*sections/order.js*
```javascript
export default [
 "header.html",
 "main.html",
 "footer.html"
 ];

```

This determine the order of sections that will be injected to your main html.

An example directorty structure:
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


