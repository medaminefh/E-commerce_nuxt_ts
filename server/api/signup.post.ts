export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const body = await readBody(event);

	// Access public variables
	try {
		console.log("config.SERVER_URL", config.SERVER_URL);
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
		return new Response("error", { status: 500 });
	}
});
