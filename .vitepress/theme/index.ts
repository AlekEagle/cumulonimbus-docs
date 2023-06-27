import DefaultTheme from "vitepress/theme";

// @ts-ignore
const components = import.meta.glob(
  ["./components/*.vue", "./components/*.md"],
  { eager: true }
);

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    for (const path in components) {
      const name = path.match(/\.\/components\/(.*)\.(vue|md)$/)?.[1];
      if (name) {
        app.component(name, components[path].default);
      }
    }

    // @ts-ignore
    if (!import.meta.env.SSR) {
      Object.defineProperty(window, "iqPoints", {
        get: () => {
          return -Infinity;
        },
        set: () => {
          throw new Error("Cannot modify read-only property");
        },
      });
    }
  },
};
