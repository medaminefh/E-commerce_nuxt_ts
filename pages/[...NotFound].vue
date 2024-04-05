<template>
	<!-- Not found page with tailwindcss -->
	<div class="flex items-center justify-center h-screen">
		<div class="text-center">
			<img
				src="/logo.png"
				class="animate-bounce mx-auto"
				:width="100"
			/>
			<h1 class="text-5xl font-bold text-gray-900">404</h1>
			<p class="text-2xl font-bold text-gray-900">Not found</p>
			<UButton to="/" color="blue" size="xl" class="mt-4"> back</UButton>
		</div>
	</div>
</template>
