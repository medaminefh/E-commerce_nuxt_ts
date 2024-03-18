<script setup lang="ts">
import type { IProduct } from "../types/productType";
// fetch data from the server
defineProps<{ products: IProduct[] }>();
</script>

<template>
	<h1 class="text-xl">{{ $t("seasonSales") }} 🔥</h1>
	<div
		class="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-10"
	>
		<template v-if="!products.length">
			<div class="mx-auto text-center text-2xl font-bold text-gray-900">
				{{ $t("no-products") }}
			</div>
		</template>
		<template v-else>
			<LazyProductCard
				v-for="product in products"
				:product="product"
				:key="product.id"
			/>
		</template>
	</div>
</template>
