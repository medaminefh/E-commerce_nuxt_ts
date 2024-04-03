export default defineNuxtRouteMiddleware((to, from) => {
	const auth = storeToRefs(useAuthStore());
    console.log(auth.token, auth.user?.value.role, to.path)
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
    if(auth.token && auth.user?.value.role == "admin" && to.path === "/signin")
        return { path: "/admin/dashboard" }
    if(auth.token && auth.user?.value.role == "user" && to.path === "/admin/dashboard")
        return { path: "/" }

});
