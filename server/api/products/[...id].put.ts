export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");
		const runtimeConfig = useRuntimeConfig(event);
        const body = await readBody(event);
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/` + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": body.token,
            },
            body,
        });
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Product not found.'
		  })
	}
});
