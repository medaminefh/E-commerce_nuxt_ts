<script setup>
useHead({
	title: "Products Dashboard",
});
definePageMeta({
	layout: "admin-layout",
	middleware: ["is-admin"],
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
	},	{
		key: "published",
		label: "Published",
	},
	{
		key: "role",
	},
];

const selectedColumns = ref([...columns]);
</script>

<template>
	<div class="flex px-3 gap-x-4 py-3.5 border-b border-gray-200 dark:border-gray-700">
		<USelectMenu
			v-model="selectedColumns"
			:options="columns"
			multiple
			placeholder="Columns"
		/>
		<div class="flex gap-x-4" v-if="selectedRows.length">
			<UButton
				icon="i-heroicons-trash"
				color="red"
				rounded
				:disabled="selectedRows.length === 0"
			/>
			<UButton
				icon="i-heroicons-plus"
				color="primary"
				rounded
				@click="() => $router.push('/admin/products/new')"
			/>
		</div>
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
		
		<template #discount-data="{ row }">
				{{ row.discountValue }}
		</template>
		<template #published-data="{row}">
			<UButton icon="i-heroicons-check-badge-16-solid" size="xl" variant="ghost" disabled/>
		</template>
		<template #role-data="{ row }">
				<UButton color="white" rounded label="update"/>
		</template>
	</UTable>
</template>