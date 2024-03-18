// create settings store in pinia

import { defineStore } from "pinia";
import { fetchSettings, fetchOrders } from "@/utils/groqFetches";

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		minimumOrder: 0,
		shipping: 0,
		orders: [],
		fetched: false,
	}),
	actions: {
		async fetchSettings() {
			try {
				const settings = await fetchSettings();
				const orders = await fetchOrders();
				this.minimumOrder = settings.value?.minimumOrder;
				this.shipping = settings.value?.shipping;
				this.orders = orders.value;
				this.fetched = true;
			} catch (error) {
				const toast = useToast();
				toast.add({
					title: "Error",
					color: "red",
					description: "Something wrong happened, please try again later",
				});
				this.fetched = false;
			}
		},
	},
	persist: true,
});
