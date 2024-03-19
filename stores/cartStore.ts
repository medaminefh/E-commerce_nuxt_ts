// cart store
import { defineStore } from "pinia";
import type { IProduct } from "../types/productType";

export const useCartStore = defineStore("cartStore", {
	state: () => ({
		// the items in the cart
		items: [] as IProduct[],
	}),
	actions: {
		// add an item to the cart
		addItem(item: IProduct) {
			if (this.items.find((i) => i.id === item.id)) {
				// if the item is already in the cart, increase the quantity
				this.items = this.items.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity! + 1 } : i
				);
				return;
			}
			item.quantity = 1;
			this.items.push(item);
		},
		// remove an item from the cart
		removeItem(id: string) {
			this.items = this.items.filter((i) => i.id !== id);
		},
		// reset the state of the cart
		reset() {
			this.items = [];
		},
	},
	getters: {
		// get the number of items in the cart
		itemCount(state) {
			return state.items.length;
		},
	},
	persist: true,
});
