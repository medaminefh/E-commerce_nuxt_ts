<template>
	<!-- Not found page with tailwindcss -->
	<div class="flex items-center justify-center h-screen">
		<div class="text-center">
			<img
				src="/logo.jpg"
				class="rounded-full animate-bounce mx-auto"
				:width="40"
				:height="40"
			/>
			<h1 class="text-5xl font-bold text-gray-900">404</h1>
			<p class="text-2xl font-bold text-gray-900">Not found</p>
			<UButton to="/" color="blue" size="xl" class="mt-4">{{
				$t("back")
			}}</UButton>
		</div>
	</div>
</template>
