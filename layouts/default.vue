<template>
	<NuxtLoadingIndicator />
	<Html :lang="locale" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
		<UCard
			:ui="{ header: { base: 'sticky top-0 bg-white z-10 border-b py-4' } }"
		>
			<template #header>
				<Header />
			</template>
			<slot />
			<template #footer>
				<Footer />
			</template>
		</UCard>
		<UNotifications />
	</Html>
</template>

<script setup>
const { locale, t } = useI18n();

useHead({
	title: "Mercerie Maryouma",
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/logo.jpg" }],
	htmlAttrs: {
		lang: locale.value,
		dir: locale.value === "ar" ? "rtl" : "ltr",
	},
});

useSeoMeta({
	title: "Mercerie Maryouma",
	ogTitle: "Mercerie Maryouma",
	description: t("about"),
	ogDescription: t("about"),
	ogImage:
		"https://lh5.googleusercontent.com/p/AF1QipPXACoQwrznNAVbMx7MPh95RJKBBOQH4c2_bIef=w408-h408-k-no",
	twitterCard:
		"https://lh5.googleusercontent.com/p/AF1QipPXACoQwrznNAVbMx7MPh95RJKBBOQH4c2_bIef=w408-h408-k-no",
});
</script>

<style>
html {
	scroll-behavior: smooth;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
