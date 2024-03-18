// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		SERVER_URL: process.env.SERVER_URL || "http://localhost:5555",
	},
	modules: [
		"@nuxt/ui",
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
	],
	i18n: {
		vueI18n: "./i18n.config.ts",
	},
	colorMode: {
		preference: "light",
	},
	ui: {
		icons: ["circle-flags", "bxl"],
	},
});
