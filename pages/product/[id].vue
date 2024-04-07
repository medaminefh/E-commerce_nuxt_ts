<script setup>
const route = useRoute();
const id = route.params.id;
const { data } = await useFetch("/api/products/" + id);

const mainImg = ref(data?.value?.image);

const handleChangedImage = (image) => {
	mainImg.value = image;
};

const toast = useToast();

const cartStore = useCartStore();

const addProductToCart = () => {
	cartStore.addItem(data?.value);
	toast.add({
		title: "Success",
		description: "product-added",
		timeout: 600,
	});
};
</script>
<template>
	<section class="py-12 md:py-16">
		<div class="container mx-auto px-4">
			<UButton
				to="/"
				color="white"
				variant="ghost"
				class="text-lg text-gray-900 underline"
				>back</UButton
			>

			<div
				class="mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16"
			>
				<div class="lg:col-span-3 lg:row-end-1">
					<div class="lg:flex lg:items-start">
						<div class="lg:order-2 lg:ml-5">
							<div class="max-w-sm rounded-lg">
								<NuxtImg
									:src="mainImg"
									:alt="data?.title"
									class="object-scale-down h-56 w-56 md:h-auto"
								/>
							</div>
						</div>

						<template v-if="data.images">
							<div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
								<div
									class="flex flex-row w-full overflow-x-auto no-scrollbar items-start gap-x-2 lg:flex-col"
								>
									<div
										@click="handleChangedImage(data.defaultImage)"
										class="cursor-pointer mb-3 flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg text-center"
										:class="
											mainImg === data.image
												? 'border-2 border-gray-900'
												: 'border-2 border-transparent'
										"
									>
										<NuxtImg :src="data.image" :alt="data?.title" />
									</div>
									<div
										v-for="image in data.images"
										:key="data._id"
										@click="handleChangedImage(image)"
										class="cursor-pointer mb-3 flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg text-center"
										:class="
											mainImg === image
												? 'border-2 border-gray-900'
												: 'border-2 border-transparent'
										"
									>
										<NuxtImg :src="image" :alt="data?.title" />
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>

				<div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
					<h1 class="md: text-2xl font-bold text-gray-900 md:text-3xl">
						{{ data?.title }}
					</h1>
					<p class="mt-4 text-2xl font-bold text-gray-900">
						{{
							formatCurrency(
								data.discount ? data.priceAfterDiscount : data.price
							)
						}}
					</p>
					<span
						v-if="data.discount"
						class="text-sm line-through text-gray-700 ml-1"
						>{{ formatCurrency(data?.price) }}</span
					>
					<p class="mt-4 text-gray-600">
						{{ data?.description }}
					</p>
				</div>
				<UButton
					size="lg"
					@click="addProductToCart"
					icon="i-heroicons-shopping-cart"
					class="md:w-40 justify-center h-10"
					color="blue"
				>
					Buy
				</UButton>
			</div>
		</div>
	</section>
</template>
