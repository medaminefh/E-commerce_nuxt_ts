<template>
	<div>
		<h2 class="mb-5 text-center text-3xl md:text-5xl font-bold text-gray-900">
			{{ $t("reviews") }}
		</h2>
		<Carousel
			v-bind="settings"
			:breakpoints="breakpoints"
			:wrap-around="true"
			:autoplay="5000"
			:mouse-drag="false"
			:touch-drag="false"
		>
			<Slide v-for="review in reviews" :key="review">
				<iframe
					:src="review"
					width="500"
					height="200"
					title="Facebook reviews"
					style="border: none; overflow: auto"
					allowfullscreen="true"
					allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
				></iframe>
			</Slide>
		</Carousel>
	</div>
</template>

<script setup>
import { Carousel, Slide } from "vue3-carousel";

const reviews = [
	"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fnesrine.fakhfakh.3%2Fposts%2Fpfbid02JdWFiCv6DY5bQuisEzfsbNiYGVfZG773SaXaZJKoKWGayMooEBLz7ihZ7NGRLT7vl&show_text=true&width=500",
	"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fcrochette.dahmen%2Fposts%2Fpfbid037tne48suNzmCfWY8RGtA33uw7bUQvaKkXm7TnQygenkf3M88kNzDHAgF58FJJYFql&show_text=true&width=500",
];

const settings = {
	itemsToShow: 1,
	snapAlign: "center",
};

const breakpoints = {
	768: {
		itemsToShow: 2,
		snapAlign: "start",
	},
	1024: {
		itemsToShow: 3,
		snapAlign: "start",
	},
};
</script>
