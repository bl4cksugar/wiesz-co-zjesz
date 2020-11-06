<template>
	<v-app>
		<nav-bar></nav-bar>
		<v-container fluid class="pa-0">
			<div class="row">
				<div class="col-12 px-0 py-0">
					<router-view></router-view>
				</div>
			</div>
		</v-container>
		<b-footer></b-footer>
	</v-app>
</template>
<script>
import NavBar from "./components/NavBar";
import BFooter from "./components/footer";

export default {
	name: "App",
	data() {
		return {
			hasSidebar: true
		};
	},
	components: {
		NavBar,
		BFooter
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
