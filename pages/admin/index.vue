<script setup>
useHead({
	title: "Dashboard",
});

</script>
<template>
    <h1 class="text-4xl mb-10 text-gray-800">
        Dashboard
    </h1>
    <div class="flex justify-around flex-wrap" >
            <NuxtLink to="/admin/productsDash" class="text-3xl text-white hover:scale-105"> <UCard class="bg-red-300">
                <UButton icon="i-heroicons-shopping-bag" color="black" variant="ghost" />
                Products</UCard> </NuxtLink>
            
            
            <div class="text-3xl text-white cursor-not-allowed" title="In progress"> <UCard class="bg-blue-300 opacity-75">
                <UButton disabled icon="i-heroicons-arrow-up-on-square" color="black" variant="ghost" />
                Orders</UCard> </div>
            
            <div class="text-3xl text-white cursor-not-allowed" title="In progress"> <UCard class="bg-yellow-300 opacity-75">
                <UButton disabled icon="i-heroicons-user-group" color="black" variant="ghost"/>
                Clients
            </UCard> </div>
    </div>
</template>