export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const body = await readBody(event);

	// Access public variables
	try {
		const result = await $fetch(config.SERVER_URL + "/auth/register", {
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
			statusMessage: 'Registration failed. Please try again.'
		  })	}
});
