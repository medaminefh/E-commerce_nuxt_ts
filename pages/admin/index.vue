<script setup>
useHead({
	title: "Dashboard",
});

</script>
<template>
    <h1 class="text-4xl mb-10 text-gray-800">
        Dashboard
    </h1>
    <div class="flex justify-around flex-wrap gap-4" >
            <NuxtLink to="/admin/productsDash" class="text-3xl text-gray-800 hover:scale-105"> <UCard class="bg-red-300">
                <UButton icon="i-heroicons-shopping-bag" color="black" variant="ghost" />
                Products</UCard> </NuxtLink>
            
                <NuxtLink to="/admin/clientsDash" class="text-3xl text-gray-800 hover:scale-105"> <UCard class="bg-yellow-300 opacity-75">
                    <UButton icon="i-heroicons-user-group" color="black" variant="ghost"/>
                    Clients
                </UCard> </NuxtLink>
            
            <NuxtLink to="/admin/ordersDash" class="text-3xl text-gray-800 hover:scale-105"> <UCard class="bg-blue-300 opacity-75">
                <UButton icon="i-heroicons-arrow-up-on-square" color="black" variant="ghost" />
                Orders</UCard> </NuxtLink>
            
    </div>
</template>