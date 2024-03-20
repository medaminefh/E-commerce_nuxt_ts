import { IProduct } from "~/types/productType";

export default defineEventHandler(async (event) => {
	try {
		const data = await fetch("https://fakestoreapi.com/products");
		setResponseStatus(event, 200);
		const products = await data.json();
		products.forEeach((product: IProduct) => {
			product.price = product.price;
			product.discount = Math.random() > 0.5;
			product.discountValue = product.price * 0.1;
			product.priceAfterDiscount = product.price - product.discountValue;
		});
		return products;
	} catch (error) {}
});
