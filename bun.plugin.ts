import { Plugin } from "bun";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  name: "postcss-plugin",
  setup(builder) {
    builder.onLoad({ filter: /\.css$/ }, async (args) => {
      const fs = await import("fs/promises");
      const css = await fs.readFile(args.path, "utf8");
      const result = await postcss([tailwindcss, autoprefixer]).process(css, {
        from: args.path,
      });

      return {
        contents: result.css,
        loader: "css",
      };
    });
  },
} as Plugin;
