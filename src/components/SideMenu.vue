<template>
	<div class="sidemenu">
		<div v-if="isAdmin">
			<v-row class="title text-center">ADMINISTRATION PANEL</v-row>
			<v-row>
				<v-btn to="Users" rounded>USERS</v-btn>
			</v-row>
			<v-row>
				<v-btn to="Recipes" rounded>RECIPES</v-btn>
			</v-row>
		</div>

		<v-row>
			<v-btn
				@click="signout"
				rounded
				min-width="100px !important"
				max-width="200px !important"
				color="red"
				>SIGN OUT</v-btn
			>
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
		isAdmin() {
			return true;
			// return this.entity.type === "admin" ? true : true;
		},
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

.sidemenu {
	margin-top: 50px;

	min-height: 90vh;
	height: 100%;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}

@media screen and (max-width: 600px) {
	.sidemenu {
		min-height: 100%;
	}
}

.row {
	margin: 20px 0 0 0;
	justify-content: center;
}

.v-btn {
	width: 20vw;
	min-width: 150px !important;
	max-width: 200px !important;
}
</style>
