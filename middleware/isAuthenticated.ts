export default defineNuxtRouteMiddleware(async (to, from) => {
	const {token, user} = storeToRefs(useAuthStore());
    console.log({token:token.value, to, from})
    if(!token.value) {
        return { path: "/signin" }
    }
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
    if(token.value && user?.value.role == "admin" && to.path === "/signin")
        return { path: "/admin" }
    if(token.value && user?.value.role == "user" && to.path.startsWith("/admin"))
        return { path: "/" }

});
