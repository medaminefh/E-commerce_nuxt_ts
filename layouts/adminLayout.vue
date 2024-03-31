<template>
	<NuxtLoadingIndicator />
	<Html>
		<UCard
			:ui="{ header: { base: 'sticky top-0 bg-white z-10 border-b py-4' } }"
		>
			<template #header>
				<Header />
			</template>
			<aside
				class="fixed top-[82px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div
					class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 border-r"
				>
					<ul class="space-y-2 mt-4 font-medium">
						<li v-for="item in items">
							<NuxtLink
								:to="item.link"
								@click="selectedItem = item.title"
								:class="[
									selectedItem == item.title
										? 'bg-gray-800 text-white'
										: 'text-gray-900 hover:bg-gray-100',
								]"
								class="flex items-center p-2 rounded-lg group w-full"
							>
								<UIcon :name="item.icon" size="xl" />
								<span class="ms-3">{{ item.title }}</span>
							</NuxtLink>
						</li>
					</ul>
				</div>
			</aside>
			<div class="p-4 sm:ml-64">
				<NuxtPage :page-key="(route) => route.fullPath" />
			</div>
			<template #footer>
				<Footer />
			</template>
		</UCard>
	</Html>
</template>
<script setup>
useHead({
	title: "E-store",
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/logo.jpg" }],
});

const items = ref([
	{
		title: "Dashboard",
		icon: "i-heroicons-home",
		link: "/admin/productsDash",
	},
	{
		title: "Orders",
		icon: "i-heroicons-arrow-up-on-square",
		link: "/admin/ordersDash",
	},
	{
		title: "Users",
		icon: "i-heroicons-user-group",
		link: "/admin/usersDash",
	},
	{
		title: "Products",
		icon: "i-heroicons-shopping-bag",
		link: "/admin/productsDash",
	},
]);

const selectedItem = ref("Dashboard");

</script>
