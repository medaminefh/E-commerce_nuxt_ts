// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				devtools: { enabled: true },
				runtimeConfig: {
								SERVER_URL: process.env.SERVER_URL || "http://localhost:5555",
								cloudName: process.env.CLOUD_NAME || "demo",
								preset: process.env.PRESET || "demo",
								api_key: process.env.API_KEY,
								api_secret: process.env.API_SECRET,
				},
				modules: [
				 "@nuxt/ui",
				 "@pinia/nuxt",
				 "@pinia-plugin-persistedstate/nuxt",
				 "@nuxt/image",
				],
				colorMode: {
								preference: "light",
				},
				ui: {
								icons: ["circle-flags", "bxl"],
				},
});