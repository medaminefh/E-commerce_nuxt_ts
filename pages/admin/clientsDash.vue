
<script setup>
useHead({
	title: "Clients Dashboard",
});

const {token} = storeToRefs(useAuthStore());

const pagination = ref({
	page: 1,
	limit: 10,
});

const { data: clients, pending } = useFetch(
	`/api/clients`,
	{
		method: "GET",
		headers: {
			Authorization: token.value,
		},
	}
);

const columns = [
	{
		key: "hidden",
	},
	{
		key: "fullName",
		label: "Client",
	},
	{
		key: "address",
		label: "Address",
	},
	{
		key: "phone",
		label: "Phone",
	},	
	{
		key: "email",
		label: "Email",
	},
	{
		key: "country",
		label: "Country",
	},
	{
		key: "city",
		label: "City",
	},
	{
		key: "createdAt",
		label: "Created at",
	},
];

const showedClients = computed(() => {
	const { page, limit } = pagination.value;
	// sort from last updated one
	const sortedClients = clients.value ? [...clients.value]?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	) : []
	return sortedClients.slice((page - 1) * limit, page * limit)
})

</script>

<template>
	
	<UButton
				@click="useGoBack"
				color="white"
				variant="ghost"
				class="text-lg text-gray-900 underline"
				>back</UButton
			>
	<h1 class="text-4xl mb-10 text-gray-800">Clients dashboard</h1>
	<UTable
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
		:columns="columns"
		:rows="showedClients"
		:loading="pending"
	>
	<template #createdAt-data="{row}">
		{{ new Date(row.createdAt).toLocaleDateString() }}
	</template>
	</UTable>
	<UPagination v-model="pagination.page" :page-count="pagination.limit" :total="clients?.length" />
</template>

