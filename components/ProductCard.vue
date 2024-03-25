<script setup>
const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
});

const toast = useToast();

const cartStore = useCartStore();

const addProductToCart = () => {
	console.log("addProductToCart", props.product);
	cartStore.addItem(props.product);
	toast.add({
		title: "Success",
		description: "Product added",
		timeout: 600,
	});
};
</script>

<template>
	<div
		class="relative flex w-60 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
	>
		<NuxtLink
			class="relative mx-3 mt-3 flex h-60 md:h-56 overflow-hidden rounded-xl"
			:to="'/product/' + product?._id"
		>
			<img :src="product?.image" :alt="product?.title" />

			<span
				v-if="product?.discount"
				class="absolute top-0 left-0 m-2 rounded-full bg-black text-white px-2 text-center text-sm font-medium"
				>{{
					calculateDiscountPercentage(
						product.price,
						product.priceAfterDiscount
					)
				}}% off</span
			>
		</NuxtLink>
		<div class="mt-4 px-5 pb-5">
			<NuxtLink :to="'/product/' + product?._id">
				<h5
					class="text-xl tracking-tight text-slate-900 text-ellipsis line-clamp-1"
				>
					{{ product?.title }}
				</h5>
			</NuxtLink>
			<div class="mt-2 mb-5 flex items-center gap-x-1">
				<span class="text-xl font-bold text-slate-900">{{
					formatCurrency(
						product.discount ? product.priceAfterDiscount : product.price
					)
				}}</span>
				<span
					v-if="product?.discount"
					class="text-sm text-slate-900 line-through"
					>{{ formatCurrency(product?.price) }}</span
				>
			</div>
			<UButton
				@click="addProductToCart"
				title="Add to cart"
				class="flex items-center justify-center flex-wrap rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
				icon="i-heroicons-shopping-cart"
			>
				Add to cart</UButton
			>
		</div>
	</div>
</template>
