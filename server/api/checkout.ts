export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const body = await readBody(event);

	// Access public variables
	try {
		const result = await $fetch(config.SERVER_URL + "/checkout", {
			method: "POST",
			headers: {
				"Authorization": body.token,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "no-cors",
			},
			body,
		});
		return result;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Place order failed. Please try again.'
		  })
	}
});
