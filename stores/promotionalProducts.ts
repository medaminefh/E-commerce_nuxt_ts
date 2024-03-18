// create settings store in pinia

import { defineStore } from "pinia";
import { fetchPromotionalProducts } from "@/utils/groqFetches";
import type { IProduct } from "@/types/productType";

export const usePromotionalProductsStore = defineStore("promotionalProducts", {
	state: () => ({
		products: [] as IProduct[],
		startDate: "",
		endDate: "",
		discount: 0,
	}),
	actions: {
		async fetchPromotional() {
			const data = await fetchPromotionalProducts();
			console.log({ data });
			this.products = data.value?.products;
			this.startDate = data.value?.startDate;
			this.endDate = data.value?.endDate;
			this.discount = data.value?.discount;
		},
	},
	getters: {
		data: (state) => ({
			products: state.products,
			startDate: state.startDate,
			endDate: state.endDate,
			discount: state.discount,
		}),
	},
	persist: true,
});
