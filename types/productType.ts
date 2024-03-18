// product interface
export interface IProduct {
	id: string;
	name: string;
	defaultImage: string;
	images: string[];
	productCategory: string;
	description: string;
	defaultPrice: number;
	discount: boolean;
	discountValue: number;
	priceAfterDiscount: number;
	details?: string;
	quantity?: number;
	slug: string;
}
