export default defineEventHandler(async (event) => {
	try {
		const runtimeConfig = useRuntimeConfig(event);
        const auth = getHeader(event, "Authorization")
        
        const body = await readBody(event);
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/unpublish`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth,
            },
            body,
        });
		setResponseStatus(event, 200);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Unpublish product failed. Please try again.'
		  })
	}
});
