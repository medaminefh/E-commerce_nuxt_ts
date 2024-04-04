import { useRequestHeaders } from "nuxt/app";

export default defineEventHandler(async (event) => {
	try {
		const runtimeConfig = useRuntimeConfig(event);
		
		const auth = getHeaders(event)["authorization"]
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/admin`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": auth
			}
		
		});
		setResponseStatus(event, 200);
		const products = data
		return products;
	} catch (error) {
		console.log({ error });
		return error;
	}
});
