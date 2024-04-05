<script setup>
useHead({
	title: "Products Dashboard",
});

const {token} = storeToRefs(useAuthStore());
const page = ref(1)
const items = ref(Array(55))

const sort = ref({
	column: "name",
	direction: "desc",
});

const { data: products } = await useLazyFetch(
	`/api/products/adminProducts?orderBy=${sort.value.column}&order=${sort.value.direction}`,
	{
		method: "GET",
		headers: {
			Authorization: token.value,
		},
	}
);

const onSubmit = async (e) => {
	e.preventDefault();
	const ids = selectedRows.value.map((row) => row._id);
	console.log(ids);
	const toast = useToast();
	try {
		const { data } = await useLazyFetch(
			`/api/products/unpublish`,
			{
				method: "PATCH",
				headers: {
					Authorization: token.value,
				},
				body: JSON.stringify({ ids }),
			}
		);
		if(data) {
			products.value = products.value.map((product) => {
				if (ids.includes(product._id)) {
					product.published = false;
				}
				return product;
			});
			selectedRows.value = [];

			toast.add({
				title: "Success",
				description: "Products unpublished successfully",
			timeout: 1200,
		});
	}
		
	} catch (error) {
		toast.add({
			title: "Error",
			color: "red",
			description: "Error with the server, please try again later.",
			timeout: 1200,
		});
		console.log(error);
		
	}
};

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
	
	<div class="flex justify-between gap-x-4 py-3.5 border-b border-gray-200">
		<div class="flex gap-x-4">
			<USelectMenu
			v-model="selectedColumns"
			:options="columns.filter(col => col.key !== 'role')"
			multiple	
			placeholder="Columns"
		/>
			<UButton
			@click="onSubmit"
			v-if="selectedRows.length"
			icon="i-heroicons-trash"
			color="red"
			rounded
			/>
		</div>
		<UButton
		icon="i-heroicons-plus"
		color="primary"
		class="flex-end"
		rounded
		@click="() => $router.push('/admin/products/new')"
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
		:rows="products || []"
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
			<UButton v-if="row.published" icon="i-heroicons-check-badge-16-solid" size="xl" variant="ghost" disabled/>
			
				<UButton v-else icon="i-heroicons-x-circle-16-solid" size="xl" variant="ghost" color="red" disabled/>

		</template>
		<template #role-data="{ row }">
				<UButton color="white" rounded label="update" @click="() => $router.push(`/admin/products/${row._id}`)"/>
		</template>
	</UTable>
	<UPagination v-model="page" :page-count="5" :total="items.length" />
</template>
