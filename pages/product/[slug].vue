<script setup>
import { fetchProduct } from "~/utils/groqFetches";

const route = useRoute();
const slug = route.params.slug;

const data = await fetchProduct(slug);

const mainImg = ref(data?.value?.defaultImage);

const handleChangedImage = (image) => {
	mainImg.value = image;
};

const toast = useToast();
const { t } = useI18n();

const cartStore = useCartStore();

const addProductToCart = () => {
	cartStore.addItem(data?.value);
	toast.add({
		title: "Success",
		description: t("product-added"),
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
				>{{ $t("back") }}</UButton
			>

			<div
				class="mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16"
			>
				<div class="lg:col-span-3 lg:row-end-1">
					<div class="lg:flex lg:items-start">
						<div class="lg:order-2 lg:ml-5">
							<div class="max-w-xl rounded-lg">
								<CustomImg
									:asset_id="mainImg"
									:alt="data?.name"
									className="rounded-lg object-cover h-56 w-56 md:h-auto md:w-auto"
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
											mainImg === data.defaultImage
												? 'border-2 border-gray-900'
												: 'border-2 border-transparent'
										"
									>
										<CustomImg
											:asset_id="data.defaultImage"
											:alt="data?.name"
											className="w-full h-full"
										/>
									</div>
									<div
										v-for="image in data.images"
										:key="data.id"
										@click="handleChangedImage(image)"
										class="cursor-pointer mb-3 flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg text-center"
										:class="
											mainImg === image
												? 'border-2 border-gray-900'
												: 'border-2 border-transparent'
										"
									>
										<CustomImg
											:asset_id="image"
											:alt="data?.name"
											className="h-full w-full"
										/>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>

				<div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
					<h1 class="md: text-2xl font-bold text-gray-900 md:text-3xl">
						{{ data?.name }}
					</h1>
					<p class="mt-4 text-2xl font-bold text-gray-900">
						{{
							formatCurrency(
								data.discount ? data.priceAfterDiscount : data.defaultPrice
							)
						}}
					</p>
					<span
						v-if="data.discount"
						class="text-sm line-through text-gray-700 ml-1"
						>{{ formatCurrency(data?.defaultPrice) }}</span
					>
					<p class="mt-4 text-gray-600">
						{{ data?.description }}
					</p>
				</div>
				<UButton
					size="lg"
					@click="addProductToCart"
					icon="i-heroicons-shopping-cart"
					class="max-w-xs"
					color="blue"
				>
					{{ $t("i-buy") }}
				</UButton>
			</div>
		</div>
	</section>
</template>
