<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import type { IProduct } from "~/types/productType";

const toast = useToast();

const router = useRouter();
definePageMeta({
	middleware: ["redirect"],
});

const goBack = () => {
	router.back();
};
const cartStore = useCartStore();
const {token, user} = storeToRefs(useAuthStore());
const userState = reactive({
	fullName: "",
	email: "",
	address: "",
	city: "",
	zipCode: "",
	phone: "",
	country: "Tunisia",
});

onMounted(async() => {
	if(token.value && user.value._id) {
		userState.fullName = user?.value.fullName;
		userState.email = user?.value.email;
		userState.phone = user?.value.phone;
		userState.address = user?.value.address;
		userState.city = user?.value.city;
		userState.zipCode = user?.value.zipCode;
	}
});

const items = computed(() => cartStore.items);


const loading = ref(false);
const submit = async (e: FormSubmitEvent<any>) => {
	loading.value = true;

	// validate the form
	// send the order to the server
	// refactored products
	const products = items.value.map((item) => {
		return {
			id: item._id,
			quantity: item.quantity,
			details: item.details,
		};
	});
	try {
		const { data } = useLazyFetch("/api/checkout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": token.value,
		},
		body: JSON.stringify({
			client: user?.value._id,
			products,
			subTotal: subTotal.value,
			total: subTotal.value + 8,
			token: token.value,
		})})

		if(data) {
			loading.value = false;
			toast.add({
				title: "Success",
				description: "Order has been placed",
			});
			setTimeout(() => {
				cartStore.reset();
			}, 3000);
		}
	} catch (error) {
		loading.value = false;
		console.log(error);
		toast.add({
			title: "Error",
			description: "Something went wrong! Please try again later.",
			color: "red",
		});
		
	}
};

const subTotal = computed(() => {
	return items.value.reduce((acc, item) => {
		if (item.discount) {
			return round(acc + item.priceAfterDiscount * item.quantity);
		}
		return round(acc + item.price * item.quantity);
	}, 0);
});

useHead({
	title: "Checkout",
});

const increment = (item: IProduct) => {
	item.quantity++;
};

const decrement = (item: IProduct) => {
	if (item.quantity > 1) {
		item.quantity--;
	}
};

watch(
	() => cartStore.itemCount,
	(val) => {
		if (val === 0) {
			router.push("/");
		}
	}
);
</script>
<template>
	<!-- checkout form with tailwindcss -->

	<section class="py-12 md:py-16">
		<UButton
			@click="goBack"
			color="white"
			variant="ghost"
			class="text-lg flex-start text-gray-900 underline"
			>Back</UButton
		>
		<div class="md:w-2/3" v-if="items.length">
			<div
				v-for="item in items"
				class="grid grid-cols-1 md:grid-cols-2 mb-6 rounded-lg bg-white p-6 shadow-md"
			>
				<div
					class="flex flex-col flex-wrap gap-x-3 gap-y-3 items-center md:items-start"
				>
				<div class="max-w-28 h-28 overflow-hidden">
					<img
					:src="item.image"
					:alt="item.title"
					className="object-scale-down rounded-lg"
					/>
				</div>
					<div>
						<h2 class="text-lg font-bold text-gray-900">{{ item?.title }}</h2>
						<span class="text-xs block text-gray-900 font-bold">
							{{ formatCurrency(item.discount ? item.priceAfterDiscount : item.price) }}
						</span>
						<span
							v-if="item?.discount"
							class="text-xs text-gray-700 line-through"
							>{{ formatCurrency(item?.price) }}</span
						>
					</div>
				</div>

				<div class="mt-4 flex flex-col flex-wrap gap-y-4">
					<div
						class="flex items-center border-gray-100 gap-x-2 justify-center"
						dir="ltr"
					>
						<span
							class="cursor-pointer font-bold rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
							@click="decrement(item)"
						>
							-
						</span>
						<UInput
							class="border bg-white text-center text-xs outline-none w-20"
							type="number"
							v-model="item.quantity"
							min="1"
						/>
						<span
							class="cursor-pointer font-bold rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
							@click="increment(item)"
						>
							+
						</span>
					</div>
					<UTextarea
						class="max-w-sm"
						placeholder="Additional information"
						v-model="item.details"
					/>
					<span>{{
						calculatePrice(
							item.discount ? item.priceAfterDiscount : item.price,
							item.quantity
						)
					}}</span>

					<div class="flex items-center justify-between">
						<UButton
							icon="i-heroicons-x-mark-solid"
							color="red"
							@click="cartStore.removeItem(item._id)"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="mx-auto px-4">
			<UDivider class="my-6" />
			<h3 class="text-center font-bold text-lg text-gray-900">
				Sub-Total: {{ formatCurrency(subTotal) }}
			</h3>
			<p class="text-md text-gray-700 text-center">Delivery: {{formatCurrency(8)}}</p>
			<h1 class="text-xl font-bold text-center text-gray-900 my-5">
				Total: {{ formatCurrency(subTotal + 8) }}
			</h1>
			<UForm
				@submit="submit"
				v-if="token"
				class="flex flex-col items-center w-full gap-y-3"
			>
				<UFormGroup
					label="Full Name"
					name="fullName"
					class="w-full md:w-96 max-w-md"
				>
					<UInput disabled size="xl" type="text" v-model="userState.fullName" />
				</UFormGroup>

				<UFormGroup label="Email" name="email" class="w-full md:w-96 max-w-md">
					<UInput disabled size="xl" type="email" v-model="userState.email" />
				</UFormGroup>

				<UFormGroup
					label="Address"
					name="address"
					class="w-full md:w-96 max-w-md"
				>
					<UInput size="xl" type="text" v-model="userState.address" />
				</UFormGroup>

				<UFormGroup label="City" name="city" class="w-full md:w-96 max-w-md">
					<UInput disabled size="xl" type="text" v-model="userState.city" />
				</UFormGroup>

				<UFormGroup
					label="Country"
					name="country"
					class="w-full md:w-96 max-w-md"
				>
					<UInput size="xl" type="text" v-model="userState.country" disabled />
				</UFormGroup>

				<UFormGroup
					label="Zip Code"
					name="zipCode"
					class="w-full md:w-96 max-w-md"
				>
					<UInput disabled size="xl" type="number" v-model="userState.zipCode" />
				</UFormGroup>

				<UFormGroup
					label="Phone Number"
					name="phoneNumber"
					class="w-full md:w-96 max-w-md"
				>
					<UInput disabled size="xl" type="number" v-model="userState.phone" />
				</UFormGroup>
				<UButton size="xl" color="blue" type="submit" :loading="loading">
					{{ loading ? "loading" + " ..." : "order" }}
				</UButton>
			</UForm>
			<div v-else>
				<p class="text-center text-gray-900">
					Please login to place an order
					<NuxtLink to="/signin" class="text-blue-500 underline">
						Login
					</NuxtLink>
				</p>

			</div>
		</div>
	</section>
</template>
