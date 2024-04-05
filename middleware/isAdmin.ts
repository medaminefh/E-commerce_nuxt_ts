export default defineNuxtRouteMiddleware((to, from) => {
	const {token, user} = storeToRefs(useAuthStore());
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
    if(!token.value)
        return { path: "/signin" }

	if (token.value && user?.value.role == "user" && to.path.startsWith("/admin")) {
		return { path: "/" };
	}
    if (token.value && user?.value.role == "admin" && to.path === "/signin") {
        return { path: "/admin" };
    }
});
