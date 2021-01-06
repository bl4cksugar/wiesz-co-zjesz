<template>
	<div class="d-flex flex-column" style="width:100%">
		<v-row class="title text-center btn-row mx-0">ADMIN PANEL</v-row>
		<v-row class="my-2 mx-0">
			<v-btn to="Users" block rounded>USERS</v-btn>
		</v-row>
		<v-row class="my-2 mx-0">
			<v-btn to="Recipes" block rounded>RECIPES</v-btn>
		</v-row>
	</div>
</template>

<script>
import store from "../store";
import axios from "axios";

export default {
	data() {
		return {};
	},
	computed: {
		isLogged() {
			return this.entity ? true : false;
		}
	},
	methods: {
		async signout() {
			let result = await axios.get("auth/logout");
			if (result) {
				store.dispatch("deleteSession");
				this.$router.push("/");
			}
		}
	}
};
</script>

<style scoped>
.title {
	color: white;
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
