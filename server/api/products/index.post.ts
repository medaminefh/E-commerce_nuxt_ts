import {v2 as cloudinary} from 'cloudinary';
          

export default defineEventHandler(async (event) => {
    try {
        const runtimeConfig = useRuntimeConfig(event);
        cloudinary.config({ 
          cloud_name: runtimeConfig.cloudName, 
          api_key: runtimeConfig.api_key, 
          api_secret: runtimeConfig.api_secret 
        });
        const auth = getHeader(event, "Authorization");

        
        const body = await readBody(event);
        const uploaded = await cloudinary.uploader.upload(body.image, {
            upload_preset: runtimeConfig.preset,
        });
        // update the body with the uploaded image
        body.image = uploaded.secure_url;

		const data = await $fetch(`${runtimeConfig.SERVER_URL}/products/`, {
            method: "POST",
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
			statusMessage: 'Create product failed. Please try again.'
		  })
	}
});
