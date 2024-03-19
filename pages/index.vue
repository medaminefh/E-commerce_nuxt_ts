<script setup>
const { data: products } = await useFetch("/api/products");
</script>

<template>
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
			class="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-10"
		>
			<ProductCard
				v-for="product in products"
				:product="product"
				:key="product.name"
			/>
		</div>
	</div>
</template>
