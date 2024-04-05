export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");
		const runtimeConfig = useRuntimeConfig(event);
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/` + id);
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		setResponseStatus(event, 500);
	}
});
