<script setup>

const {token} = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const goBack = () => {
    // go back to the previous page
	router.back();
};
const id = route.params.id;
const { data } = await useFetch("/api/products/" + id);
const state = reactive({
    title: data.value.title,
    description: data.value.description,
    price: data.value.price,
    discount: data.value.discount,
    priceAfterDiscount: data.value.priceAfterDiscount,
    published: data.value.published,
    img: null,
    base64: data.value.image
});

// function to convert the image to base64
const onSelectFile = (event) => {
  const input = event.target
  const files = input.files
  if (files && files[0]) {
    const reader = new FileReader
    reader.onload = e => {
      state.base64 = e.target.result
    }
    reader.readAsDataURL(files[0])
  }
}

// submit the form
const onSubmit = async () => {
    const toast = useToast();
    const data = {
        title: state.title,
        description: state.description,
        price: state.price,
        discount: state.discount,
        priceAfterDiscount: state.priceAfterDiscount,
        token: token.value,
        published: state.published
    }

    // send the data to the server
    try {
        const {data:response} = await useLazyFetch(`/api/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        toast.add({
            title: "Success",
            description: "Product has been updated",
        });
        
    } catch (error) {
        toast.add({
            title: "Error",
            description: "Something went wrong! Please try again later.",
            color: "red",
        });
    }



    // if the response is successful
/*     if (response.ok) {
        // go back to the previous page
        router.back();
    } */
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
        <h1 class="text-3xl text-gray-800">Update Product</h1>
        <img class="w-40 h-40 object-scale-down" :src="state.base64"/>
        <UForm
                :state="state"
                @submit="onSubmit"
				class="space-y-4"
			>
				<UFormGroup label="Title" name="title" class="w-full">
					<UInput type="text" v-model="state.title"  />
				</UFormGroup>

				<UFormGroup label="Description" name="description" class="w-full">
					<UInput type="text" v-model="state.description" />
				</UFormGroup>

                <div class="flex gap-x-6 flex-wrap items-center">    
                    <UFormGroup label="Price" name="price">
                        <UInput type="text" v-model="state.price"/>
                    </UFormGroup>
                    
                    <UFormGroup label="Discount" name="discount">
                        <UToggle size="xl" v-model="state.discount"/>
                    </UFormGroup>

                    <UFormGroup v-if="state.discount" label="Price After Discount" name="priceAfterDiscount">
                        <UInput type="text" v-model="state.priceAfterDiscount"/>
                    </UFormGroup>
                </div>
                <UFormGroup label="Published" name="published">
                        <UToggle size="xl" v-model="state.published"/>
                    </UFormGroup>

				<UFormGroup label="Default Image" name="img" class="w-full">
					<UInput type="file" v-model="state.img" @input="onSelectFile" />
				</UFormGroup>

				<UButton type="submit" color="blue">
					Update
				</UButton>
			</UForm>
    </div>
</template>