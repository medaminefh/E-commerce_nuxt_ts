export default defineNuxtRouteMiddleware(async (to, from) => {
	const {token, user} = storeToRefs(useAuthStore());
    if(!token.value) {
        return { path: "/signin" }
    }
	// if USER is ADMIN and try to go to the signin page redirect him to the admin dashboard page
    if(user?.value.role == "admin" && to.path === "/signin")
        return { path: "/admin" }
    if(user?.value.role == "user" && to.path.startsWith("/admin"))
        return { path: "/" }

});
