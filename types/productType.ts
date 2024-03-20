// product interface
export interface IProduct {
	id: string;
	title: string;
	image: string;
	images: string[];
	category: string;
	description: string;
	price: number;
	discount: boolean;
	discountValue: number;
	priceAfterDiscount: number;
	details?: string;
	quantity?: number;
	slug: string;
}
