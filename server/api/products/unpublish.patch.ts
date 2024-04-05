export default defineEventHandler(async (event) => {
	try {
        console.log("event", event)
		const runtimeConfig = useRuntimeConfig(event);
        const auth = getHeader(event, "Authorization")
        
        const body = await readBody(event);
        console.log({body})
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
		setResponseStatus(event, 500);
	}
});
