<template>
	<div class="px-1 md:px-6 py-4">
		<NuxtErrorBoundary>
			<NuxtPage :page-key="(route) => route.fullPath" />
			<template #error="{ error }">
				<div class="flex items-center justify-center h-screen">
					<p class="text-2xl text-gray-800 dark:text-gray-200">
						An error occurred while loading the page, please refresh the page.
						If the error persists, please contact the administrator!
						{{ error }}
					</p>
				</div>
			</template>
		</NuxtErrorBoundary>
	</div>
</template>
<script setup>
useHead({
	title: "Admin Dashboard",
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/logo.png" }],
});

definePageMeta({
	layout: "admin",
	middleware: ["is-authenticated", "is-admin"],
});
</script>