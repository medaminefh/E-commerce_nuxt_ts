<script setup>
useHead({
	title: "Products Dashboard",
});

const {token} = storeToRefs(useAuthStore());

const pagination = ref({
	page: 1,
	limit: 10,
});

const { data: products, pending } = await useFetch(
	`/api/products/adminProducts`,
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
		label: "Title",
	},	{
		key: "discount",
		label: "Discount",
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
		sortable: true,
	},
		{
		key: "updatedAt",
		label: "Updated at",
		sortable: true,
	},
	{
		key: "role",
	},
];

const showedProducts = computed(() => {
	const { page, limit } = pagination.value;
	// sort from last updated one
	const sortedProducts = [...products?.value]?.sort(
		(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
	)
	return sortedProducts.slice((page - 1) * limit, page * limit)
})

const selectedColumns = ref([...columns]);

</script>

<template>
	
	<UButton
				@click="useGoBack"
				color="white"
				variant="ghost"
				class="text-lg text-gray-900 underline"
				>back</UButton
			>
	<h1 class="text-4xl mb-10 text-gray-800">Products dashboard</h1>
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
			title="Unpublish"
			icon="i-heroicons-eye-slash"
			color="red"
			rounded
			/>
		</div>
		<UButton
		icon="i-heroicons-plus"
		title="Add new product"
		color="primary"
		class="flex-end"
		rounded
		@click="() => $router.push('/admin/products/new')"
		/>
</div>
	<UTable
		v-model="selectedRows"
		:columns="selectedColumns"
		:rows="showedProducts"
		:loading:="pending"
	>
		<template #_id-data="{ row }">
			<NuxtImg :src="row.image" :alt="row.image" class="w-10 h-10" />
		</template>
		<template #title-data="{ row }">
			<div class="text-ellipsis overflow-hidden max-w-40">
				{{ row.title }}
			</div>
		</template>
		
		<template #discount-data="{ row }">
				<UToggle v-model="row.discount" disabled/>
		</template>

		<template #price-data="{ row }">
				{{ formatCurrency(row.discount? row.priceAfterDiscount : row.price)}}
		</template>
		
		<template #published-data="{row}">
			<UButton v-if="row.published" icon="i-heroicons-check-badge-16-solid" size="xl" variant="ghost" disabled/>
			
				<UButton v-else icon="i-heroicons-x-circle-16-solid" size="xl" variant="ghost" color="red" disabled/>

		</template>
		
		<template #updatedAt-data="{row}">
			{{ new Date(row.updatedAt).toLocaleDateString() }}
		</template>
		<template #role-data="{ row }">
				<UButton color="white" rounded label="update" @click="() => $router.push(`/admin/products/${row._id}`)"/>
		</template>
	</UTable>
	<UPagination v-model="pagination.page" :page-count="pagination.limit" :total="products.length" />
</template>
