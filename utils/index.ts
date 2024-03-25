export const formatCurrency = (value: number, currency: string = "EUR") => {
	return new Intl.NumberFormat("en-EN", {
		style: "currency",
		currency: currency,
	}).format(value);
};

// floating numbers are not precise, so we need to round them
export const round = (value: number, precision: number = 2) => {
	const multiplier = Math.pow(10, precision);
	return Math.round(value * multiplier) / multiplier;
};

export const calculatePrice = (price: number, quantity: number = 1) => {
	return round(price * quantity);
};

export const calculateDiscountPercentage = (
	defaultPrice: number,
	priceAfterDiscount: number
) => {
	return round(((defaultPrice - priceAfterDiscount) / defaultPrice) * 100);
};
