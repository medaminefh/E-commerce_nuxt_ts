<script setup>

defineProps({
    client: Object
})

defineEmits(['close'])

</script>

<template>
        <UModal>
            <UCard :ui="{ring: '', divide: 'divide-gray-100 dark:divide-gray-800' }">

                <template #header>
                    <div class="flex items-center justify-between">
                            <h1 class="text-xl text-ellipsis overflow-hidden">Client: {{ client?.fullName }}</h1>
                        
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('close')"/>
                    </div>
                </template>

                <div class="space-y-2">
                    <p>
                        Address:
                        <span class="text-gray-500">
                            {{ client?.address }} {{ client?.city }}, {{ client?.country }} {{ client?.zipCode }}
                        </span>
                    </p>
                    <p>
                        Phone:
                        <span class="text-gray-500">
                            {{ client?.phone }}
                        </span>
                    </p>
                    <p>
                        Email:
                        <span class="text-gray-500">
                            {{ client?.email }}
                        </span>
                    </p>
                    <p>
                        Created at:
                        <span class="text-gray-500">
                            {{ new Date(client?.createdAt).toLocaleDateString() }}
                        </span>
                    </p>
                </div>

            </UCard>
            
        </UModal>
</template>