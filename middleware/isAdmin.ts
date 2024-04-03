export default defineNuxtRouteMiddleware((to, from) => {
	const auth = storeToRefs(useAuthStore());
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
    if(!auth.token)
        return { path: "/signin" }

	if (auth.token && auth.user?.value.role == "user" && to.path === "/admin") {
		return { path: "/" };
	}
    if (auth.token && auth.user?.value.role == "admin" && to.path === "/signin") {
        return { path: "/admin" };
    }
});
