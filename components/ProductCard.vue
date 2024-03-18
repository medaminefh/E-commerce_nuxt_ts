<script setup>
const props = defineProps({
	product: {
		type: Object,
		required: true,
	},
});
const { t } = useI18n();

const toast = useToast();

const cartStore = useCartStore();

const finalPrice = computed(() => {
	if (props.product?.discount) {
		return formatCurrency(props.product?.priceAfterDiscount);
	}
	return formatCurrency(props.product?.defaultPrice);
});

const calculateDiscount = calculateDiscountPercentage(
	props.product?.defaultPrice,
	props.product?.priceAfterDiscount
);

const addProductToCart = () => {
	cartStore.addItem(props.product);
	toast.add({
		title: "Success",
		description: t("product-added"),
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
			:to="'/product/' + product?.slug"
		>
			<CustomImg :asset_id="product?.defaultImage" :alt="product?.name" />

			<span
				v-if="product?.discount"
				dir="ltr"
				class="absolute top-0 left-0 m-2 rounded-full bg-black text-white px-2 text-center text-sm font-medium"
				>{{ calculateDiscount }}% {{ $t("off") }}</span
			>
		</NuxtLink>
		<div class="mt-4 px-5 pb-5">
			<NuxtLink :to="'/product/' + product?.slug">
				<h5
					class="text-xl tracking-tight text-slate-900 text-ellipsis line-clamp-1"
				>
					{{ product?.name }}
				</h5>
			</NuxtLink>
			<div class="mt-2 mb-5 flex items-center gap-x-1">
				<span class="text-xl font-bold text-slate-900">{{ finalPrice }}</span>
				<span
					v-if="product?.discount"
					class="text-sm text-slate-900 line-through"
					>{{ formatCurrency(product?.defaultPrice) }}</span
				>
			</div>
			<UButton
				@click="addProductToCart"
				:title="$t('add_to_cart')"
				class="flex items-center justify-center flex-wrap rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
				icon="i-heroicons-shopping-cart"
			>
				{{ $t("add_to_cart") }}</UButton
			>
		</div>
	</div>
</template>
