import fs from "fs";
import path from "path";
import React from "react";

interface Route {
  path: string;
  component: React.ComponentType;
}

const isServer = typeof window === "undefined";

// Helper function to convert file names to route paths
const getRoutePath = (filePath: string) => {
  const relativePath = path.relative(
    path.resolve(__dirname, "pages"),
    filePath,
  );
  const parsedPath = relativePath.replace(/\.tsx$/, "");

  // Replace dynamic route syntax [param] with :param
  const routePath = parsedPath.replace(/\[(.+?)\]/g, ":$1");

  // Handle index files
  if (routePath === "index" || routePath.endsWith("/index")) {
    return "/" + routePath.replace(/\/?index$/, "");
  }

  return "/" + routePath;
};

export const generateRoutes = (
  dir = path.resolve(__dirname, "pages"),
): Route[] => {
  let routes: Route[] = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read subdirectories
      routes = routes.concat(generateRoutes(filePath));
    } else if (stat.isFile() && /\.(tsx|jsx)$/.test(file)) {
      const routePath = getRoutePath(filePath).replace(/\/index$/, "") || "/";
      const componentPath = `./pages/${path.relative(path.resolve(__dirname, "pages"), filePath).replace(/\\/g, "/")}`;

      if (isServer) {
        // Synchronously import the component on the server
        const componentModule = require(componentPath);
        routes.push({
          path: routePath,
          component: componentModule.default || componentModule,
        });
      } else {
        // Use dynamic import on the client
        const Component = React.lazy(() => import(componentPath));
        routes.push({
          path: routePath,
          component: Component,
        });
      }
    }
  });

  return routes;
};
