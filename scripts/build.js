import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import { generateRoutes } from "./src/routeLoader";
import App from "./src/App";

const routes = generateRoutes();

async function build() {
  for (const route of routes) {
    const location = route.path;

    let initialProps = {};
    if (route.getStaticProps) {
      const result = await route.getStaticProps();
      initialProps = result.props || {};
    }

    const appElement = (
      <StaticRouter location={location}>
        <App initialProps={initialProps} />
      </StaticRouter>
    );

    const appHtml = renderToString(appElement);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Your App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script>window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)}</script>
        <script src="/index.js"></script>
      </body>
      </html>
    `;

    // Determine output file path
    let outputPath = path.join("dist", location);
    if (outputPath.endsWith("/")) {
      outputPath += "index.html";
    } else {
      outputPath += ".html";
    }

    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Write the HTML file
    fs.writeFileSync(outputPath, html, "utf-8");

    console.log(`Built page: ${outputPath}`);
  }
}

build().catch((err) => {
  console.error("Error during build:", err);
});
