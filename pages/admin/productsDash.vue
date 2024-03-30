<script setup>
useHead({
	title: "Products Dashboard",
});
definePageMeta({
	layout: "admin-layout",
});
const sort = ref({
	column: "name",
	direction: "desc",
});
const { data: products } = await useLazyFetch(
	`/api/products?orderBy=${sort.value.column}&order=${sort.value.direction}`
);

const selectedRows = ref([]);
const columns = [
	{
		key: "_id",
		label: "Product",
	},
	{
		key: "title",
		label: "title",
		sortable: true,
	},
	{
		key: "price",
		label: "Price",
		sortable: true,
	},
	{
		key: "discount",
		label: "Discount",
		sortable: true,
	},
	{
		key: "role",
	},
];

const selectedColumns = ref([...columns]);
</script>

<template>
	<div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
		<USelectMenu
			v-model="selectedColumns"
			:options="columns"
			multiple
			placeholder="Columns"
		/>
	</div>
	<UTable
		v-model="selectedRows"
		v-model.sort="sort"
		sort-asc-icon="i-heroicons-arrow-up-20-solid"
		sort-desc-icon="i-heroicons-arrow-down-20-solid"
		:sort-button="{
			icon: 'i-heroicons-sparkles-20-solid',
			color: 'primary',
			variant: 'outline',
			size: '2xs',
			square: false,
			ui: { rounded: 'rounded-full' },
		}"
		:columns="selectedColumns"
		:rows="products"
	>
		<template #_id-data="{ row }">
			<img :src="row.image" :alt="row.image" class="w-10 h-10" />
		</template>
		<template #title-data="{ row }">
			<div class="text-ellipsis overflow-hidden max-w-40">
				{{ row.title }}
			</div>
		</template>
		<template #role-data="{ row }">
			<UButton icon="i-heroicons-trash" color="red" rounded />
		</template>
	</UTable>
</template>
