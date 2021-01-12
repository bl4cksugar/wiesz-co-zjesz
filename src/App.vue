<template>
	<v-app>
		<nav-bar></nav-bar>
		<v-container fluid class="pa-0">
			<div class="row">
				<div class="col-12 px-0 py-0">
					<router-view> </router-view>
				</div>
			</div>
			<add-recipe></add-recipe>
		</v-container>
		<b-footer></b-footer>

		<v-snackbar
			v-model="snackbar"
			:color="appNotification.color"
			:timeout="2000"
		>
			{{ appNotification.message }}
			<template v-slot:action="{ attrs }">
				<v-btn
					color="white"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>
<script>
import NavBar from "./components/NavBar";
import BFooter from "./components/Footer";
import AddRecipe from "./components/AddRecipe";
import { mapGetters } from "vuex";

export default {
	name: "App",
	data() {
		return {
			hasSidebar: true,
			appNotification: {
				message: "",
				color: "red"
			},
			snackbar: false
		};
	},
	computed: {
		...mapGetters(["notification"])
	},
	components: {
		NavBar,
		BFooter,
		AddRecipe
	},
	watch: {
		notification(newVal) {
			if (newVal !== null) {
				this.snackbar = true;
				this.appNotification = { ...newVal };
			}
		}
	}
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
