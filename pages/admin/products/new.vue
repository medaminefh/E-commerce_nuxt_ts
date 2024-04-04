<script setup>

const router = useRouter();
const goBack = () => {
	router.back();
};

const state = reactive({
    title: "",
    description: "",
    price: 0,
    discount: false,
    priceAfterDiscount: 0,
    published: false,
    img: null,
    base64: null
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
                        <UInput type="number" v-model="state.price"/>
                    </UFormGroup>
                    
                    <UFormGroup label="Discount" name="discount">
                        <UToggle size="xl" v-model="state.discount"/>
                    </UFormGroup>

                    <UFormGroup v-if="state.discount" label="Price After Discount" name="priceAfterDiscount">
                        <UInput type="number" v-model="state.priceAfterDiscount"/>
                    </UFormGroup>
                </div>
                <UFormGroup label="Published" name="published">
                        <UToggle size="xl" v-model="state.published"/>
                    </UFormGroup>

				<UFormGroup label="Default Image" name="img" class="w-full">
					<UInput type="file" v-model="state.img" @input="onSelectFile" />
				</UFormGroup>
                <img class="w-40 h-40 object-scale-down" :src="state.base64" v-if="state.img"/>

				<UButton type="submit" color="blue">
					Create
				</UButton>
			</UForm>
    </div>
</template>