<script setup>
const open = ref(false);
const cartStore = storeToRefs(useCartStore());
const authStore = storeToRefs(useAuthStore());
const {user} = authStore;
const isLoggedIn = computed(() => authStore.token.value);

const itemsCount = computed(() => cartStore.itemCount.value);
</script>

<template>
	<div class="flex items-center justify-between flex-row-reverse">
		<div class="flex gap-x-5 md:hidden">
			<UChip
				inset
				:text="itemsCount"
				:show="itemsCount > 0"
				color="red"
				title="cart"
				position="bottom-left"
				size="lg"
				class="md:hidden"
			>
				<UButton
					to="/checkout"
					color="white"
					variant="ghost"
					class="text-gray-800 p-0"
					size="xl"
					icon="i-heroicons-shopping-cart"
				/>
			</UChip>
			<!-- Mobile menu button -->
			<UButton
				type="button"
				color="white"
				class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none self-start focus:ring-inset md:hidden"
				@click="open = !open"
			>
				<UIcon
					name="i-heroicons-bars-3-20-solid"
					class="w-6 h-6"
					v-if="!open"
				/>
				<UIcon name="i-heroicons-x-mark-solid" class="w-6 h-6" v-if="open" />
			</UButton>
		</div>
		<!-- Links -->
		<div class="md:flex gap-x-4 items-center hidden">
			<UChip
				class="cursor-pointer"
				:show="itemsCount > 0"
				:text="itemsCount"
				v-if="user?.role=='user'"
				inset
				title="cart"
				color="red"
				position="bottom-left"
				size="lg"
			>
				<UButton
					color="white"
					to="/checkout"
					variant="ghost"
					class="text-gray-800 p-0"
					size="xl"
					icon="i-heroicons-shopping-cart"
				/>
			</UChip>

			<UserDropDown v-if="isLoggedIn" :user="user" />
			<UButton
			v-else
				color="white"
				variant="ghost"
				class="text-gray-800 p-0"
				size="xl"
				icon="i-heroicons-user-circle"
				to="/signin"
			/>

			<!-- Contact btn -->
			<UButton
				to="#contact"
				color="white"
				title="contact"
				class="px-3 py-2 ring-1 font-semibold text-gray-700 text-sm rounded-md hover:bg-gray-100 hover:text-gray-900"
				>{{ "contact" }}</UButton
			>
		</div>

		<!-- Logo -->
		<NuxtLink to="/" class="flex items-center gap-x-2">
			<img
				src="/logo.png"
				:width="80"
				alt="E-store logo"
			/>
		</NuxtLink>
	</div>

	<div
		class="md:hidden bg-white p-4 flex flex-col gap-y-2 absolute z-10 w-full left-0 right-0 border-b"
		v-if="open"
		@click.stop
	>
		<div class="flex flex-col">
			<a
				href="#contact"
				title="contact"
				class="px-3 font-light text-gray-700 text-base underline"
				>Contact</a
			>
			<NuxtLink
			v-if="!isLoggedIn"
				to="/signin"
				class="px-3 font-light text-gray-700 text-base underline"
			>
				Signup/Login
			</NuxtLink>
			<UAvatar v-else-if="user?.role=='user'" src="/avatar1.jpg" size="xs" alt="avatar"/>
			<NuxtLink v-else to="/admin/productsDash">
				<UAvatar src="/avatar1.jpg" size="xs" alt="avatar"/>
			</NuxtLink>
		
		</div>
	</div>
</template>
