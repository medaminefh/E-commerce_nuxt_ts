export default defineNuxtRouteMiddleware((to, from) => {
	const cart = useCartStore();
	// if cart is empty and user is trying to access the checkout page, redirect to the home page
	if (cart.itemCount === 0 && to.path === "/checkout") {
		return { path: "/" };
	}
});
