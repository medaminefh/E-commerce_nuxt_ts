export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const body = await readBody(event);

	// Access public variables
	try {
		const result = await $fetch(config.SERVER_URL + "/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "no-cors",
			},
			body,
		});
		return result;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Credentials are incorrect. Please try again.'
		  })
	}
});
