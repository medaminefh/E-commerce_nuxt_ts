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

const isOpen = ref(false);
const handleClick = () => {
  isOpen.value = !isOpen.value;
}

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
  <div>
    <UButton 
        v-if="!token && !humburger"
        @click="handleClick"
				color="white"
				variant="ghost"
				class="text-gray-800"
				size="xl"
				icon="i-heroicons-user-circle"
			/>
    <UButton
    v-else-if="humburger"
    @click="handleClick"
        color="white"
        class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none self-start focus:ring-inset md:hidden"
                icon="i-heroicons-bars-3-20-solid"
      />
      <UAvatar v-else src="https://avatars.githubusercontent.com/u/739984?v=4" size="sm" 
      @click="handleClick" class="cursor-pointer" />
      <USlideover v-model="isOpen" class="max-w-xs md:w-auto" side="left">
        <UCard class="flex flex-col flex-1" :ui="{body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
<span/>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

          <div class="flex flex-col gap-2">
              <UButton
                v-if="token"
                color="gray"
                variant="ghost"
                class="text-gray-800"
                size="xl"
                icon="i-heroicons-user-circle"
                @click="navigateTo('/admin')"
              >
                {{ user?.email }}
              </UButton>
              <UButton
                v-else
                color="gray"
                variant="ghost"
                class="text-gray-800"
                size="xl"
                icon="i-heroicons-arrow-right-start-on-rectangle"
                @click="navigateTo('/signin')"
              >
                Sign In
              </UButton>
              <UButton
              :disabled="itemCount == 0"
                color="gray"
                variant="ghost"
                class="text-gray-800"
                size="xl"
                icon="i-heroicons-shopping-bag"
                @click="navigateTo('/checkout')"
              >
                Cart ({{itemCount}})
              </UButton>

              <UButton
                v-if="token"
                color="gray"
                variant="ghost"
                class="text-gray-800"
                size="xl"
                icon="i-heroicons-arrow-left-start-on-rectangle"
                @click="signedOut"
              >
                Sign Out
              </UButton>
          </div>
        </UCard>
      </USlideover>
  </div>

</template>