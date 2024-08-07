<script setup lang="ts">
import type { FormError } from "#ui/types";

const router = useRouter();
const goBack = () => {
	router.back();
};

const { token } = storeToRefs(useAuthStore());
const loading = ref(false);
const state = reactive({
	title: "",
	description: "",
	price: 0,
	discount: false,
	priceAfterDiscount: 0,
	published: false,
	img: null,
	base64: "",
});

const validateForm = (Istate: typeof state): FormError[] => {
	const errors = [];
	if (!Istate.title) errors.push({ path: "title", message: "Required" });
	if (!Istate.description)
		errors.push({ path: "description", message: "Required" });

	if (!Istate.price) errors.push({ path: "price", message: "Required" });
	if (Istate.discount && !Istate.priceAfterDiscount)
		errors.push({ path: "priceAfterDiscount", message: "Required" });
	return errors;
};

const onSubmit = async () => {
	loading.value = true;
	const toast = useToast();
	const data = {
		title: state.title,
		description: state.description,
		price: state.price,
		discount: state.discount,
		priceAfterDiscount: state.priceAfterDiscount,
		image: state.base64,
		published: state.published,
	};

	// send the data to the server
	try {
		await $fetch(`/api/products/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token.value,
			},
			body: JSON.stringify(data),
		});

		loading.value = false;

		toast.add({
			title: "Success",
			description: "Product has been created!",
		});
		goBack();
	} catch (error) {
		loading.value = false;
		toast.add({
			title: "Error",
			description: "Something went wrong! Please try again later.",
			color: "red",
		});
	}
};

// function to convert the image to base64
const onSelectFile = (event: Event) => {
	const input = event.target;
	const files = input?.files;
	if (files && files[0]) {
		// verify the file is an image and less than 5MB
		if (!files[0].type.match("image") || files[0].size > 5000000) {
			const toast = useToast();
			toast.add({
				title: "Error",
				description: "Please upload an image less than 5MB",
				color: "red",
				timeout: 5000,
			});
			return;
		}
		state.img = files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			state.base64 = e.target.result;
		};
		reader.readAsDataURL(files[0]);
	}
}

</script>

<template>
	<UButton
		@click="goBack"
		color="white"
		variant="ghost"
		class="text-lg text-gray-900 underline"
		>back</UButton
	>
	<!-- form to create a new product -->
	<div class="flex flex-col gap-y-4 max-w-screen-sm">
		<h1 class="text-3xl text-gray-800">Create New Product</h1>
		<UForm
			:state="state"
			@submit="onSubmit"
			:validate="validateForm"
			class="space-y-4"
		>
			<UFormGroup label="Title*" name="title" class="w-full">
				<UInput type="text" v-model="state.title" />
			</UFormGroup>

			<UFormGroup label="Description*" name="description" class="w-full">
				<UTextarea v-model="state.description" />
			</UFormGroup>

			<div class="flex gap-x-6 flex-wrap items-center">
				<UFormGroup label="Price*" name="price">
					<UInput type="text" v-model="state.price" />
				</UFormGroup>

				<UFormGroup label="Discount" name="discount">
					<UToggle size="xl" v-model="state.discount" />
				</UFormGroup>

				<UFormGroup
					v-if="state.discount"
					label="Price After Discount*"
					name="priceAfterDiscount"
				>
					<UInput type="text" v-model="state.priceAfterDiscount" />
				</UFormGroup>
			</div>
			<UFormGroup label="Published" name="published">
				<UToggle size="xl" v-model="state.published" />
			</UFormGroup>

			<UFormGroup label="Default Image*" name="img" class="w-full">
				<UInput type="file" @input="onSelectFile" />
			</UFormGroup>
			<img
				class="w-40 h-40 object-scale-down"
				:src="state.base64"
				v-if="state.img"
			/>

			<UButton :loading="loading" type="submit" color="blue"> Create </UButton>
		</UForm>
	</div>
</template>
