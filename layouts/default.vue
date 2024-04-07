<template>
	<NuxtLoadingIndicator />
	<Html>
		<UCard
			:ui="{ background: '',header: { base: 'sticky bg-white top-0 z-10 border-b py-4' }, footer: { base: 'bg-gray-50' }}"
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
useHead({
	title: "E-store",
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/logo.png" }],
});

useSeoMeta({
	title: "E-store",
	ogTitle: "E-store",
	description: "E-Store: Your one-stop online destination for all your shopping needs. Make your life easier with us.",
	ogDescription: "E-Store: Your one-stop online destination for all your shopping needs. Make your life easier with us.",
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
