export default defineEventHandler(async (event) => {
	try {
		const runtimeConfig = useRuntimeConfig(event);
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products`);
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Products not found.'
		  })
	}
});
