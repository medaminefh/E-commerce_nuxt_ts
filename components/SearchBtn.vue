<script setup lang="ts">
const loading = ref(false)


const {data:products} = await useLazyFetch<any[]>('/api/products')
const selected = ref()


function search (q: string) {
    loading.value = true
    const data = products.value?.filter((product) => product.title.toLowerCase().includes(q.toLowerCase()))
    loading.value = false
    return data
}

</script>

<template>
  <UInputMenu placeholder="Search for products..." :debounce="200" :search="search" v-model="selected" :loading="loading" option-attribute="title" by="_id" size="xl" trailing-icon="i-heroicons-magnifying-glass">
    <template #empty>
      No Products found
    </template>
    <template #option="{option:product}">
        <NuxtLink :to="'/product/'+product._id" class="flex items-center">
            <img :src="product.image" :alt="product.title" class="w-10 h-10" />
            <div class="ms-3">
            <p class="font-medium text-gray-900 dark:text-white">{{ product.title }}</p>
            <!-- if the product has discount -->
            <div v-if="product.discount" class="flex gap-x-1">
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatCurrency(product.priceAfterDiscount) }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 line-through">({{ formatCurrency(product.price) }})</p>

            </div>
            <p v-else class="text-sm text-gray-500 dark:text-gray-400">{{ formatCurrency(product.price) }}</p>
            </div>
        </NuxtLink>
    </template>
  </UInputMenu>
</template>