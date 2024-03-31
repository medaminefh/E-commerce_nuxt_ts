// cart store
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		// the items in the cart
        role: null as "admin" | "user" | null,
		token: null as string | null,
	}),
	actions: {
		// add an item to the cart
        setUser(token: string, user: "admin" | "user") {
            this.token = token;
            this.role = user;
        },
	},
	persist: true,
});
