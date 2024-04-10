<script setup>
import OrderDetailsModal from '~/components/Modals/OrderDetailsModal.vue';
import UserDetailsModal from '~/components/Modals/UserDetailsModal.vue';

useHead({
	title: "Orders Dashboard",
});

const {token} = storeToRefs(useAuthStore());

const pagination = ref({
	page: 1,
	limit: 10,
});

const { data: orders, pending } = await useLazyFetch(
	`/api/orders`,
	{
		method: "GET",
		headers: {
			Authorization: token.value,
		},
	}
);

const columns = [
	{
		key: "orderId",
		label: "# Order ID",
		sortable:true
	},
	{
		key: "client",
		label: "Client",
	},	{
		key: "address",
		label: "Address",
	},
	
	{
		key: "subTotal",
		label: "Sub-Total",
	},
	{
		key: "total",
		label: "Total",
		sortable:true
	},
		{
		key: "createdAt",
		label: "Created at",
		sortable:true
	},
	{
		key: "role",
	},
];

const modal = useModal()

function openModal (order) {
  modal.open(OrderDetailsModal, {
    data: order,
	onClose: () => {
        // Do something and then close
        modal.close();
      },
  })
}

function openUserDetailsModal(user){
  modal.open(UserDetailsModal, {
	client: user,
	onClose: () => {
		// Do something and then close
		modal.close();
	  },
  })
}


</script>

<template>
	
	<UButton
				@click="useGoBack"
				color="white"
				variant="ghost"
				class="text-lg text-gray-900 underline"
				>back</UButton
			>
	<h1 class="text-4xl mb-10 text-gray-800">Orders dashboard</h1>
	<div class="flex justify-between gap-x-4 py-3.5 border-b border-gray-200">
</div>
	<UTable

		:columns="columns"
		:rows="orders || []"
		:loading:="pending"
	>
		<template #orderId-data="{ row }">
			#{{ row.orderId}}
		</template>
		
		<template #client-data="{ row }">
			<span class="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer hover:no-underline" @click="openUserDetailsModal(row.client)">
				{{ row.client.fullName}}
			</span>
		</template>
		
		<template #address-data="{ row }">
			<div class="max-w-52 text-ellipsis overflow-hidden">
				{{ row.client.address}}
				{{ row.client.city}}
				{{ row.client.country}}
			</div>

		</template>

		<template #subTotal-data="{ row }">
				{{ formatCurrency(row.subTotal)}}
		</template>

		<template #total-data="{ row }">
				{{ formatCurrency(row.total)}}
		</template>
		<template #createdAt-data="{ row }">
				{{ new Date(row.createdAt).toLocaleDateString() }}
		</template>
		
		<template #role-data="{ row }">
			<UButton color="white" rounded label="View more" @click="openModal(row)"/>
		</template>
		
		
	</UTable>
	<UPagination v-model="pagination.page" :page-count="5" :total="orders?.length" />
</template>
