// create settings store in pinia

import { defineStore } from "pinia";
import { fetchAllCategories } from "@/utils/groqFetches";

export const useCategoriesStore = defineStore("categories", {
	state: () => ({
		categories: [{ id: 1, name: "All categories" }],
		selectedCategory: { id: 1, name: "All categories" },
		fetched: false,
	}),
	actions: {
		async fetchCategories() {
			try {
				const categories = await fetchAllCategories();
				console.log({ categories });
				this.categories = [...this.categories, ...categories.value];
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
