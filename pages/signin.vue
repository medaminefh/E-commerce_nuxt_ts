<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
	middleware: ["is-authenticated"],
});
const isSignUpForm = ref(true);

const authStore = useAuthStore()

const loading = ref(false);

const signUpState = reactive({
	fullName: "",
	email: "",
	address: "",
	city: "",
	zipCode: "",
	phone: "",
	country: "Tunisia",
	password: "",
	confirmPass: "",
});

const validateSignUp = (state: typeof signUpState): FormError[] => {
	const errors = [];
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const phonePattern = /^[0-9]{8}$/;
	const zipCodePattern = /^[0-9]{4,5}$/;
	if (!state.fullName) errors.push({ path: "fullName", message: "Required" });
	if (!state.email) errors.push({ path: "email", message: "Required" });
	if (!emailPattern.test(state.email))
		errors.push({ path: "email", message: "Invalid email" });
	if (!state.address) errors.push({ path: "address", message: "Required" });
	if (!state.city) errors.push({ path: "city", message: "Required" });
	if (!state.zipCode) errors.push({ path: "zipCode", message: "Required" });
	if (!zipCodePattern.test(state.zipCode))
		errors.push({ path: "zipCode", message: "Invalid zip code" });
	if (!state.phone) errors.push({ path: "phoneNumber", message: "Required" });
	if (!phonePattern.test(state.phone))
		errors.push({ path: "phoneNumber", message: "Invalid phone number" });
	if (!state.country) errors.push({ path: "country", message: "Required" });
	if (!state.password) errors.push({ path: "password", message: "Required" });
	if (!state.confirmPass)
		errors.push({ path: "confirmPass", message: "Required" });
	if (state.password !== state.confirmPass)
		errors.push({ path: "confirmPass", message: "Password not matched!" });
	return errors;
};

const signInState = reactive({
	email: "",
	password: "",
});

const validateSignIn = (state: typeof signInState): FormError[] => {
	const errors = [];
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	if (!state.email) errors.push({ path: "email", message: "Required" });
	if (!emailPattern.test(state.email))
		errors.push({ path: "email", message: "Invalid email" });
	if (!state.password) errors.push({ path: "password", message: "Required" });
	return errors;
};

const submit = async (e: FormSubmitEvent<any>) => {
	const router = useRouter();
	const toast = useToast();
	try {
		if (isSignUpForm.value) {
			const data = await $fetch("/api/register", {
				method: "POST",
				body: JSON.stringify(signUpState),
			});
			isSignUpForm.value = false;
			signInState.email = data.email;
			toast.add({
				title: "Success",
				description: "Your account has been created successfully",
				timeout: 1200,
			});
		} else {
			const data = await $fetch("/api/login", {
				method: "POST",
				body: JSON.stringify(signInState),
			});
			authStore.setUser(data.token,data.role )
			// push the user to the dashboard
			router.push("/admin/productsDash");
			toast.add({
				title: "Success",
				description: "You signed in successfully",
				timeout: 1200,
			});
		}
	} catch (error) {
		toast.add({
			title: "Error",
			color: "red",
			description: "Error with the server, please try again later.",
			timeout: 1200,
		});
		console.log(error);
	}
};
</script>
<template>
	<!-- sign in form with tailwindcss -->
	<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5">
		<div class="min-h-[300px] p-5 rounded-md">
			<h1 class="text-center text-gray-900 text-5xl font-medium">
				{{ isSignUpForm ? "Sign up" : "Login" }}
			</h1>
			<img
				class="max-h-[600px] mx-auto"
				src="/login.svg"
				alt="Sign in picture"
			/>
		</div>
		<div>
			<div class="flex gap-x-2 mb-4">
				<UButton
					:color="!isSignUpForm ? 'black' : 'white'"
					@click="isSignUpForm = false"
				>
					Sign In
				</UButton>
				<UButton
					:color="isSignUpForm ? 'black' : 'white'"
					@click="isSignUpForm = true"
				>
					Sign Up
				</UButton>
			</div>
			<UForm
				v-if="!isSignUpForm"
				class="space-y-4"
				:state="signInState"
				:validate="validateSignIn"
				@submit="submit"
			>
				<UFormGroup label="Email" name="email">
					<UInput v-model="signInState.email" />
				</UFormGroup>

				<UFormGroup label="Password" name="password">
					<UInput v-model="signInState.password" type="password" />
				</UFormGroup>

				<UButton type="submit" color="blue"> Submit </UButton>
			</UForm>

			<UForm
				v-else
				class="space-y-4"
				:state="signUpState"
				:validate="validateSignUp"
				@submit="submit"
			>
				<UFormGroup label="Full Name" name="fullName" class="w-full">
					<UInput type="text" v-model="signUpState.fullName" />
				</UFormGroup>

				<UFormGroup label="Email" name="email" class="w-full">
					<UInput type="email" v-model="signUpState.email" />
				</UFormGroup>

				<UFormGroup label="Address" name="address" class="w-full">
					<UInput type="text" v-model="signUpState.address" />
				</UFormGroup>

				<UFormGroup label="City" name="city" class="w-full">
					<UInput type="text" v-model="signUpState.city" />
				</UFormGroup>

				<UFormGroup label="Country" name="country" class="w-full">
					<UInput type="text" v-model="signUpState.country" disabled />
				</UFormGroup>

				<UFormGroup label="Zip Code" name="zipCode" class="w-full">
					<UInput type="number" v-model="signUpState.zipCode" />
				</UFormGroup>

				<UFormGroup label="Phone Number" name="phoneNumber" class="w-full">
					<UInput type="number" v-model="signUpState.phone" />
				</UFormGroup>

				<UFormGroup label="Password" name="password" class="w-full">
					<UInput type="password" v-model="signUpState.password" />
				</UFormGroup>

				<UFormGroup label="Confirm Password" name="confirmPass" class="w-full">
					<UInput type="password" v-model="signUpState.confirmPass" />
				</UFormGroup>
				<UButton type="submit" color="blue" :loading="loading">
					{{ loading ? "loading" + " ..." : "Sign In" }}
				</UButton>
			</UForm>
		</div>
	</div>
</template>
