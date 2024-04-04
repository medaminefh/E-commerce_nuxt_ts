<script setup>
useHead({
	title: "Orders Dashboard",
});

const {data} = await useLazyFetch('/api/orders');
console.log({data})

</script>
<template>Orders page</template>
