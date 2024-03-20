export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");
		const data = await fetch("https://fakestoreapi.com/products/" + id);
		setResponseStatus(event, 200);
		const product = await data.json();
		product.price = product.price * 100;
		product.discount = Math.random() > 0.5;
		product.discountValue = product.price * 0.1;
		product.priceAfterDiscount = product.price - product.discountValue;
		product.images = [product.image, product.image];
		return product;
	} catch (error) {
		setResponseStatus(event, 500);
	}
});
