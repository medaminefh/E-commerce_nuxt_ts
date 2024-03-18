<script setup>
import { ref } from "vue";

const { t: $t } = useI18n();

const categoriesStore = useCategoriesStore();

const categories = computed(() => categoriesStore.categories);
const selectedCategory = storeToRefs(categoriesStore).selectedCategory;
const loading = ref(false);

const state = ref({
	searchValue: "",
	selectedCategory: selectedCategory.value,
});

const getCategories = async () => {
	if (!categoriesStore.fetched) {
		loading.value = true;
		try {
			await categoriesStore.fetchCategories();
			loading.value = false;
		} catch (error) {
			useToast().add({
				title: "Error",
				color: "red",
				description: "error while fetching categories",
			});
			loading.value = false;
		}
	}
};

const emits = defineEmits(["search"]);

watch(
	state,
	(newState) => {
		emits("search", newState);
	},
	{ deep: true }
);
</script>
<template>
	<div
		class="flex justify-center items-center flex-wrap h-32 rounded-"
		dir="ltr"
	>
		<USelectMenu
			@focus="getCategories"
			:search-attributes="['name']"
			by="id"
			:loading="loading"
			searchable
			option-attribute="name"
			size="xl"
			:ui="{ rounded: 'rounded-none' }"
			v-model="state.selectedCategory"
			:options="categories"
			class="w-full md:w-min max-w-[600px]"
		/>
		<UInput
			class="w-full md:w-1/2 max-w-[600px]"
			:ui="{ rounded: 'rounded-none' }"
			icon="i-heroicons-magnifying-glass-20-solid"
			trailing
			size="xl"
			v-model="state.searchValue"
			color="white"
			:trailing="false"
			:placeholder="$t('search') + '...'"
		/>
	</div>
</template>
