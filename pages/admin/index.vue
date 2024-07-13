<script setup>
useHead({
	title: "Dashboard",
});

const { token } = storeToRefs(useAuthStore());

const { data, pending } = useFetch("/api/dashboard", {
	method: "GET",
	headers: {
		Authorization: token.value,
	},
});
</script>
<template>
	<h1 class="text-4xl text-center mb-10 text-gray-800">
		Dashboard
	</h1>

	<div class="flex flex-wrap gap-10 justify-center">
		<NuxtLink
			to="/admin/productsDash"
			class="text-3xl text-gray-800 hover:scale-105"
		>
			<div
				class="bg-red-300 border-2 border-dashed border-gray-700 h-40 min-w-56 rounded flex justify-center items-center"
			>
				<div class="flex flex-col items-center">
					<UIcon name="i-heroicons-shopping-bag" color="black" size="2xl" />
					Products
					<span class="text-lg text-gray-700 dark:text-gray-100">
						({{ pending ? 0 : data.totalProducts }})
					</span>
				</div>
			</div>
		</NuxtLink>

		<NuxtLink
			to="/admin/clientsDash"
			class="text-3xl text-gray-800 hover:scale-105"
		>
			<div
				class="bg-yellow-300 opacity-75 border-2 border-dashed border-gray-700 h-40 min-w-56 rounded flex justify-center items-center"
			>
				<div class="flex flex-col items-center">
					<UIcon name="i-heroicons-user-group" color="black" size="2xl" />
					Clients
					<span class="text-lg text-gray-700 dark:text-gray-100">
						({{pending ? 0 : data.totalUsers }})
					</span>
				</div>
			</div>
		</NuxtLink>

		<NuxtLink
			to="/admin/ordersDash"
			class="text-3xl text-gray-800 hover:scale-105"
		>
			<div
				class="bg-blue-300 opacity-75 border-2 border-dashed border-gray-700 h-40 min-w-56 rounded flex justify-center items-center"
			>
				<div class="flex flex-col items-center">
					<UIcon
						name="i-heroicons-arrow-up-on-square"
						color="black"
						size="2xl"
					/>
					Orders
					<span class="text-lg text-gray-700 dark:text-gray-100">
						({{ pending ? 0 : data.totalOrders }})
					</span>
				</div>
			</div>
		</NuxtLink>

		<NuxtLink
			to="/admin/settingsDash"
			class="text-3xl text-gray-50 hover:scale-105"
		>
			<div
				class="bg-slate-500 opacity-75 border-2 border-dashed border-gray-700 h-40 min-w-56 rounded flex justify-center items-center"
			>
				<div class="flex flex-col items-center">
					<UIcon name="i-heroicons-cog" color="black" size="2xl" />
					Settings
				</div>
			</div>
		</NuxtLink>
	</div>
</template>