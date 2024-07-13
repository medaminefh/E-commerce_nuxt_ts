<template>
	<NuxtLoadingIndicator />
	<Html>
		<UCard
			:ui="{
				body: {
					padding: '',
				},
				footer: {
					padding: '',
				},
			}"
		>
			<template #header>
				<Header />
			</template>
			<div class="grid grid-cols-11">
				<aside
					class="hidden md:block left-0 min-h-screen relative"
					:class="{ 'col-span-2': open, 'col-span-1': !open }"
					aria-label="Sidebar"
				>
					<UButton
						@click="open = !open"
						class="bg-gray-100 rounded-full absolute top-36 -right-4"
						variant="ghost"
						color="gray"
					>
						<UIcon
							:name="
								open
									? 'i-heroicons-arrow-left-circle-16-solid'
									: 'i-heroicons-arrow-right-circle-16-solid'
							"
							class="text-2xl font-bold rtl:rotate-180"
						/>
					</UButton>
					<div
						class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 border-r"
					>
						<ul class="space-y-2 mt-4 font-medium">
							<li v-for="item in items" :key="item.title">
								<NuxtLink
									v-if="!item.disabled"
									:title="item.title"
									:to="item.link"
									@click="selectedItem = item.link"
									:class="[
										selectedItem == item.link
											? 'bg-gray-800 text-white'
											: 'text-gray-900 hover:bg-gray-100',
										!open ? 'justify-center' : 'justify-start',
										'flex items-center p-2 rounded-lg group w-full',
									]"
								>
									<UIcon
										:name="item.icon"
										size="xl"
										:class="[open ? 'text-lg' : 'text-2xl']"
									/>
									<span :class="[open ? 'ms-3' : 'hidden']">{{
										item.title
									}}</span>
								</NuxtLink>
								<UButton
									v-else
									variant="ghost"
									disabled
									class="flex items-center p-2 rounded-lg group w-full text-gray-400"
								>
									<UIcon :name="item.icon" size="xl" />
									<span :title="item.description" class="ms-3">{{
										item.title
									}}</span>
								</UButton>
							</li>
						</ul>
					</div>
				</aside>
				<div
					:class="[open ? 'md:col-span-9' : 'md:col-span-10', 'col-span-11']"
				>
					<slot />
				</div>
			</div>
			<template #footer>
				<Footer :isAdmin="true" />
			</template>
		</UCard>

		<UModals
			:ui="{
				container: 'items-center',
			}"
		/>
		<UNotifications />
	</Html>
</template>
<script setup>
useHead({
	title: "E-store",
	meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
	link: [{ rel: "icon", href: "/logo.png" }],
});

definePageMeta({
	middleware: ["is-authenticated", "is-admin"],
});

const items = ref([
	{
		title: "Dashboard",
		icon: "i-heroicons-home",
		link: "/admin",
	},
	{
		title: "Products",
		icon: "i-heroicons-shopping-bag",
		link: "/admin/productsDash",
	},
	{
		title: "Clients",
		icon: "i-heroicons-user-group",
		link: "/admin/clientsDash",
	},
	{
		title: "Orders",
		icon: "i-heroicons-arrow-up-on-square",
		link: "/admin/ordersDash",
	},
	{
		title: "Settings",
		icon: "i-heroicons-cog",
		link: "/admin/settingsDash",
	},
]);

const selectedItem = ref("Dashboard");
const open = ref(false);

const route = useRoute();
watchEffect(() => {
	selectedItem.value = route.fullPath;
});
</script>
