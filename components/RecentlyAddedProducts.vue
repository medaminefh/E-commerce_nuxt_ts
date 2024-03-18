<script setup>
defineProps({
	products: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<div
		class="pl-4 py-2 pr-2 bg-[#F6F193] rounded-sm flex flex-col lg:flex-row w-full justify-between gap-y-7 text-gray-800"
	>
		<div class="w-full lg:w-1/4 flex flex-col gap-y-6 justify-center">
			<h1 class="text-3xl font-bold">
				{{ $t("recently-added-products") }}
			</h1>
			<p class="text-xl leading-8">
				{{ $t("we-restock-our-products") }}
			</p>
		</div>
		<div
			class="flex justify-start lg:justify-evenly lg:w-[70%] overflow-x-auto bg-white rounded-sm no-scrollbar"
		>
			<ProductCard
				v-for="product in products"
				:product="product"
				:key="product.name"
				class="flex-shrink-0 md:flex-shrink"
			/>
		</div>
	</div>
</template>
