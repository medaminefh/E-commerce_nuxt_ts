export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");
		const runtimeConfig = useRuntimeConfig(event);
        const body = await readBody(event);
        console.log({body})
		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/` + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": body.token,
            },
            body,
        });
		setResponseStatus(event, 200);
		const product = await data
		return product;
	} catch (error) {
		setResponseStatus(event, 500);
	}
});
