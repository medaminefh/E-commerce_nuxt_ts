export default defineEventHandler(async (event) => {
	try {
		const runtimeConfig = useRuntimeConfig(event);
		
		const auth = getHeader(event, "Authorization")
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/users`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": auth
			}
		
		});
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Clients not found.'
		  })
	}
});
