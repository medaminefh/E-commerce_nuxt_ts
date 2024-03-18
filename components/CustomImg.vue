<script setup>
defineProps({
	asset_id: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: true,
	},
	className: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<SanityImage
		:asset-id="asset_id"
		auto="format"
		:w="400"
		:h="400"
		fit="crop"
		crop="center"
	>
		<template #default="{ src }">
			<img
				:class="'w-full object-cover ' + className"
				:src="src"
				:alt="alt"
				loading="lazy"
			/>
		</template>
	</SanityImage>
</template>
