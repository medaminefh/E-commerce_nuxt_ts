// cart store
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
	state: () => ({
		// the items in the cart
        role: null as "admin" | "user" | null,
		token: null as string | null,
		user: null as any,
	}),
	actions: {
		// add an item to the cart
        setUser(token: string, user: "admin" | "user") {
            this.token = token;
            this.role = user;
        },
		getUserDetails() {
			fetch("http://localhost:5555/users/current", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: this.token,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					this.user = data;
				})
				.catch((err) => console.log(err));
		}
	},
	persist: true,
});
