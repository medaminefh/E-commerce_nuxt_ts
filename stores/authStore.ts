// cart store
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		// the items in the cart
        user: null as any | null,
		token: null as string | null,
	}),
	actions: {
		// add an item to the cart
        setUser(token: string, user: any) {
            this.token = token;
            this.user = user;
        },
	},
	persist: true,
});
