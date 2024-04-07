<script setup>
const open = ref(false);
const cartStore = storeToRefs(useCartStore());
const authStore = storeToRefs(useAuthStore());
const {user} = authStore;
const isLoggedIn = computed(() => authStore.token.value);

const itemsCount = computed(() => cartStore.itemCount.value);


</script>

<template>
	<div class="flex items-center justify-between gap-x-3">
		<!-- Logo -->
		<NuxtLink to="/" class="flex items-center gap-x-2">
			<NuxtImg
				src="/logo.png"
				:width="80"
				alt="E-store logo"
			/>
		</NuxtLink>

		<SearchBtn size="md" />
		<!-- Links -->
		<div class="md:flex gap-x-4 items-center hidden">

			<UserDropDown class="hidden md:block" />

			<!-- Contact btn -->
			<UButton
				to="#contact"
				color="white"
				title="contact"
				class="px-3 py-2 ring-1 font-semibold text-gray-700 text-sm rounded-md hover:bg-gray-100 hover:text-gray-900"
				>{{ "contact" }}</UButton
			>
		</div>

		<!-- Mobile -->
		<UserDropDown class="md:hidden" :humburger="true" />

	</div>
</template>
