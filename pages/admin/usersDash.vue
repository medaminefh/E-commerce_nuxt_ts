<script setup>
useHead({
	title: "Users Dashboard",
});
definePageMeta({
	layout: "admin-layout",
	middleware: ["is-admin"],
});
</script>
<template>Users page</template>
