<script setup lang="ts">
import { getActivePinia } from "pinia"

const props = defineProps({
    user: {
        type:Object,
        required:true
    }
})

const signedOut = async() => {
    getActivePinia()!._s.forEach(store => store.$reset());

    await navigateTo('/')
    console.log('Signed out')
}

const items = [
  [{
    label: props.user.email,
    slot: 'account',
    disabled: props.user.role == 'user' ? true : false
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }]
]
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #account="{ item }">
      <div class="text-left" v-if="item.disabled">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
      <NuxtLink to="/admin" v-else class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
        </NuxtLink>
    </template>

    <template #item="{ item }">
        <div @click="signedOut" class="flex flex-between items-center w-full">
            <span class="truncate">{{ item.label }}</span>
            
            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </div>
    </template>
  </UDropdown>
</template>