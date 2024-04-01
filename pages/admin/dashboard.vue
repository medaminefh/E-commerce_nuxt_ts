<script setup>
useHead({
	title: "Dashboard",
});
definePageMeta({
	layout: "admin-layout",
	//middleware: ["is-authenticated","is-admin"],
});
</script>
<template>
    <h1 class="text-4xl mb-10 text-gray-800">
        Dashboard
    </h1>
    <div class="flex justify-around" >
            <NuxtLink to="/admin/productsDash" class="text-3xl text-white hover:scale-105"> <UCard class="bg-red-300">Products</UCard> </NuxtLink>
            <NuxtLink to="/admin/ordersDash" class="text-3xl text-white hover:scale-105"> <UCard class="bg-blue-300">Orders</UCard> </NuxtLink>
            <NuxtLink to="/admin/usersDash" class="text-3xl text-white hover:scale-105"> <UCard class="bg-yellow-300">Users</UCard> </NuxtLink>
    </div>
</template>