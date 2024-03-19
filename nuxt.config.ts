// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		SERVER_URL: process.env.SERVER_URL || "http://localhost:5555",
	},
	modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
	colorMode: {
		preference: "light",
	},
	ui: {
		icons: ["circle-flags", "bxl"],
	},
});
