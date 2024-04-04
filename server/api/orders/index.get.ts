export default defineEventHandler(async (event) => {
	try {
        console.log("orders")
		const runtimeConfig = useRuntimeConfig(event);
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/orders`);
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		console.log({ error });
		return error;
	}
});
