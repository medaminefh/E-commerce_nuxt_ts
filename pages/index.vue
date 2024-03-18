<script setup>
import { fetchAllProducts } from "~/utils/groqFetches";
const categoriesStore = useCategoriesStore();
const store = storeToRefs(categoriesStore);

const searchValue = ref({
	searchValue: "",
	selectedCategory: store.selectedCategory,
});

const allProducts = await fetchAllProducts();
const showedProducts = computed(() => {
	let filteredProducts = allProducts.value;
	if (
		searchValue.value.selectedCategory.name == "All categories" &&
		!searchValue.value.searchValue
	) {
		return allProducts.value;
	}
	if (searchValue.value.selectedCategory.name !== "All categories") {
		filteredProducts = filteredProducts.filter((product) => {
			return product.category === searchValue.value.selectedCategory.name;
		});
	}
	if (searchValue.value.searchValue) {
		filteredProducts = filteredProducts.filter((product) => {
			return product.name
				.toLowerCase()
				.includes(searchValue.value.searchValue.toLowerCase());
		});
	}
	return filteredProducts;
});

const handelSearch = (search) => {
	searchValue.value.searchValue = search.searchValue;
	searchValue.value.selectedCategory = search.selectedCategory;
};
</script>

<template>
	<div
		class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow md:p-8 mb-4 max-w-[600px] mx-auto"
	>
		<h5 class="mb-2 text-3xl font-bold text-gray-900">
			{{ $t("about") }}
		</h5>
		<p class="mb-5 text-base text-gray-500 md:text-lg">
			{{ $t("smallAbout") }}
		</p>
	</div>
	<div class="w-full">
		<SearchComp @search="handelSearch" />
	</div>
	<div class="my-10">
		<RecentlyAddedProducts :products="allProducts.slice(0, 4)" />
	</div>
	<div class="my-10">
		<h2 class="mb-5 text-center text-3xl md:text-5xl font-medium text-gray-900">
			{{ $t("produits") }}
		</h2>

		<template v-if="!showedProducts || !showedProducts.length">
			<div
				class="text-center text-2xl flex flex-col items-center gap-y-3 font-bold text-gray-900"
			>
				<UIcon
					class="text-7xl text-gray-700"
					name="i-heroicons-face-frown-16-solid"
				/>
				<span>
					{{ $t("no-products") }}
				</span>
			</div>
		</template>
		<div
			v-else
			class="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-10"
		>
			<ProductCard
				v-for="product in showedProducts"
				:product="product"
				:key="product.name"
			/>
		</div>
	</div>

	<div
		class="flex flex-col flex-wrap md:flex-row md:justify-around border-t mt-4 items-center md:py-4 px-2"
		id="localisation"
	>
		<h2 class="mt-10 mb-5 text-3xl md:text-5xl font-medium text-gray-900">
			{{ $t("localisation") }}
		</h2>
		<div class="hidden md:block overflow-x-auto">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.1438361765104!2d10.729215111790786!3d35.57484147250757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302051a2fff6041%3A0x8a256063579ed890!2sMercerie%20maryouma!5e0!3m2!1sen!2stn!4v1706362514654!5m2!1sen!2stn"
				width="800"
				height="600"
				style="border: 0"
				allowfullscreen=""
				loading="async"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>

		<div class="block md:hidden overflow-x-auto">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.1438361765104!2d10.729215111790786!3d35.57484147250757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302051a2fff6041%3A0x8a256063579ed890!2sMercerie%20maryouma!5e0!3m2!1sen!2stn!4v1706362514654!5m2!1sen!2stn"
				width="100%"
				height="300"
				style="border: 0"
				allowfullscreen=""
				loading="async"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>

	<div class="my-10">
		<Reviews />
	</div>
</template>
