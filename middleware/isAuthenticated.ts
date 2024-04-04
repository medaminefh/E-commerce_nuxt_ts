export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = storeToRefs(useAuthStore());
    if(!auth.token) {
        return { path: "/signin" }
    }
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
    if(auth.token && auth.user?.value.role == "admin" && to.path === "/signin")
        return { path: "/admin" }
    if(auth.token && auth.user?.value.role == "user" && to.path === "/admin/dashboard")
        return { path: "/" }

});
