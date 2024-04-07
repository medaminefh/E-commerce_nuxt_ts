<script setup lang="ts">
const {itemCount} = storeToRefs(useCartStore());
const authStore = storeToRefs(useAuthStore());
const {user, token} = authStore;

defineProps({
humburger: {
  type: Boolean,
  default: false
}
})

const signedOut = async() => {
  useLogout()
    loggedInItems.value[0][0].label = '';
}


const loggedInItems = ref([
  [{
    slot: 'account',
    label: user.value?.email,
    disabled: user.value?.role == "user" ? true : false,
    icon: 'i-heroicons-user-circle',
    action: () => navigateTo('/admin')
  },{
    label: 'Cart',
    icon: 'i-heroicons-shopping-bag',
    disabled: itemCount.value == 0,
    action: () => navigateTo('/checkout')
  }],
  [{
    label: 'Sign Out',
    icon: 'i-heroicons-logout',
    action: signedOut
  }]
])

const notLoggedInItems = ref([
  [{
    label: 'SIGN IN',
    slot: 'account',
	  icon: 'i-heroicons-user-circle',
	action: () => navigateTo('/signin')
  },{
    label: 'Cart',
    icon: 'i-heroicons-shopping-bag',
	disabled: itemCount.value == 0 ,
	action: () => navigateTo('/checkout')
  }]
])

watchEffect(() => {
  // set the disable of the cart button
  loggedInItems.value[0][1].disabled = itemCount.value == 0;
  notLoggedInItems.value[0][1].disabled = itemCount.value == 0;
  if(!loggedInItems.value[0][0].label && token.value) {
    loggedInItems.value[0][0].label = user.value.email;
    loggedInItems.value[0][0].disabled = user.value?.role == "user" ? true : false;
  }
})

</script>

<template>
<UDropdown v-if="token" :items="loggedInItems" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
    v-if="humburger"
				type="button"
				color="white"
				class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none self-start focus:ring-inset md:hidden"
                icon="i-heroicons-bars-3-20-solid"
			/>

    <UAvatar v-else src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm" />

    <template #account="{ item }">

      <div v-if="user?.role=='admin'" class="flex flex-between items-center w-full" @click="item.action">

        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </div>
      
      <div v-else class="flex flex-between items-center w-full">

        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </div>
    </template>

    <template #item="{ item }">
        <div @click="item.action" class="flex flex-between items-center w-full">
            <span class="truncate">{{ item.label }}</span>
            <span v-if="item.label == 'Cart'">({{itemCount}})</span>
            
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </div>
    </template>
  </UDropdown>
  


  <UDropdown v-else :items="notLoggedInItems" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UButton
    v-if="humburger"
				type="button"
				color="white"
				class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none self-start focus:ring-inset md:hidden"
                icon="i-heroicons-bars-3-20-solid"
			/>
      <UButton 
        v-else
				color="white"
				variant="ghost"
				class="text-gray-800"
				size="xl"
				icon="i-heroicons-user-circle"
			/>

    <template #account="{ item }">
      <div class="flex flex-between items-center w-full" @click="item.action">

        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </div>
    </template>

    <template #item="{ item }">
      <div @click="item.action" class="flex flex-between items-center w-full">
        <span class="truncate">{{ item.label }}</span>
        <span v-if="item.label == 'Cart'">({{itemCount}})</span>

        <UIcon :name="item.icon" 
        variant="ghost" class="float-end h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />

        </div>

    </template>
  </UDropdown>

</template>