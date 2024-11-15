// import { fileURLToPath, URL } from "node:url"

// import { defineConfig } from "vite"
// import vue from "@vitejs/plugin-vue"
// import vueJsx from "@vitejs/plugin-vue-jsx"
// import vueDevTools from "vite-plugin-vue-devtools"
// import sass from "sass-embedded"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueJsx(), vueDevTools()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         implementation: sass,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
// })

import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"
import sass from "sass-embedded"
import mkcert from "vite-plugin-mkcert"

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const options = {
    plugins: [vue(), vueJsx(), vueDevTools()],
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }

  if (command === "serve") {
    return {
      ...options,
      server: {
        host: "nexus.local",
      },
      plugins: [...options.plugins, mkcert()],
    }
  }

  return {
    ...options,
  }
})
