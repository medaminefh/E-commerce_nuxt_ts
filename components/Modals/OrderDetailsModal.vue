<script setup>

defineProps({
    data: Object
})

const columns = [
    {
        key:"product",
        label: "Product",
    },
    {
        key: "quantity",
        label: "Quantity",
    },
    {
        key: "price",
        label: "Price",
    },
    {
        key: "total",
        label: "Total",
    }
]

defineEmits(['close'])

</script>

<template>
        <UModal>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
            <div class="flex items-center justify-between">
                <h1 class="text-xl"> Ref: #{{ data?.orderId }}</h1>

                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('close')"/>

            </div>
        </template>
        <div class="flex flex-col gap-y-2">

            <p>
                Client:
                <span class="text-gray-500">

                    {{ data?.client?.fullName }}
                </span>
</p>
<p>
                Address:
                <span class="text-gray-500">

                    {{ data?.client?.address }} {{ data?.client?.city }}, {{ data?.client?.country }} {{ data?.client?.zipCode }}
                </span>

</p>

                <UTable :columns="columns" :rows="data.products || []" class="max-h-80">
                    <template #product-data="{ row }">
                        <NuxtImg :src="row.productDetails?.image" :alt="row.productDetails?.title" class="object-scale-down w-10 h-10" />
                    </template>
                    <template #quantity-data="{ row }">
                        x {{ row.quantity }}
                    </template>
                    <template #price-data="{ row }">
                        {{ formatCurrency(row.productDetails?.discount? row.productDetails?.priceAfterDiscount: row.productDetails?.price) }}
                    </template>
                    <template #total-data="{ row }">
                        {{ formatCurrency((row.productDetails?.discount? row.productDetails?.priceAfterDiscount: row.productDetails?.price) * row.quantity) }}
                    </template>
                </UTable>

</div>


<template #footer>
<div class="space-y-2 text-end"> 
<p>
                Sub-Total:
                <span class="text-gray-500">

                    {{formatCurrency(data?.subTotal) }}
                </span>
</p>
<p>
                Shipping:
                <span class="text-gray-500">

                    {{ formatCurrency(data?.shipping) }}
                </span>
</p>
<p>
                Total:
                <span class="text-gray-500">

                    {{ formatCurrency(data?.total) }}
                </span>
</p>
</div>
</template>

      </UCard>
        </UModal>
</template>