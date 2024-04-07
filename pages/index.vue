<script setup>
const { data: products } = await useFetch("/api/products");
</script>

<template>
	<div class="grid md:grid-cols-2 grid-cols-1">
		<div
			class="flex flex-col justify-center gap-y-10 text-gray-900 uppercase font-medium"
		>
			<h3 class="text-6xl text-center">
				<span class="text-pink-600">E-</span>store
			</h3>
			<h4 class="text-5xl leading-normal text-center">
				Make your life Easier with <span class="text-pink-600">US.</span>
			</h4>
		</div>
		<div>
			<NuxtImg
				src="/landing_img1.jpg"
				alt="landing image"
				class="w-full object-scale-down"
			/>
		</div>
	</div>
	<div class="my-10">
		<h2 class="mb-5 text-center text-3xl md:text-5xl font-medium text-gray-900">
			Products
		</h2>

		<template v-if="!products">
			<div
				class="text-center text-2xl flex flex-col items-center gap-y-3 font-bold text-gray-900"
			>
				<UIcon
					class="text-7xl text-gray-700"
					name="i-heroicons-face-frown-16-solid"
				/>
				<span> No products </span>
			</div>
		</template>
		<div
			v-else
			class="grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-4 md:gap-4 mt-10"
		>
			<ProductCard
				v-for="product in products"
				:product="product"
				:key="product.name"
			/>
		</div>
	</div>
</template>
