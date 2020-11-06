<template>
	<div>
		<v-app-bar fixed scroll-off-screen class="app-bar">
			<v-toolbar-title>
				<div class="d-flex flex-wrap">
					<router-link to="/" tag="a" class="logo-text">
						Wiesz co Zjesz
					</router-link>
				</div>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<div v-for="item in filtredMenuItems" :key="item.name">
				<div v-if="!isSmallScreen">
					<v-btn
						v-if="item.isRouterLink"
						text
						color="white"
						router-link
						:to="item.route"
					>
						{{ item.name }}
					</v-btn>
					<v-btn
						v-else
						text
						@click="scrollTo(item.route)"
						color="white"
					>
						{{ item.name }}
					</v-btn>
				</div>
			</div>
			<login-form v-if="!isLogged"></login-form>
			<v-btn v-else color="red" @click="logout()">
				<span>SIGN OUT</span>
			</v-btn>
			<v-app-bar-nav-icon
				v-if="isSmallScreen"
				dark
				@click="isToggled = true"
			></v-app-bar-nav-icon>
		</v-app-bar>
		<v-navigation-drawer
			v-model="isToggled"
			temporary
			right
			fixed
			class="app-drawer"
		>
			<v-list nav dense>
				<v-list-item-group
					v-model="group"
					active-class="deep-purple--text text--accent-4"
				>
					<v-list-item
						v-for="item in filtredMenuItems"
						:key="item.name"
						@click="goTo(item)"
					>
						<v-list-item-icon>
							<v-icon>mdi-{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>
							{{ item.name.toUpperCase() }}
						</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mediaQuery from "../mixins/mediaQuery";
import LoginForm from "./LoginForm.vue";

export default {
	mixins: [mediaQuery],
	data() {
		return {
			isToggled: false,
			group: null,
			menuItems: [
				{
					name: "Home",
					isRouterLink: true,
					route: "/",
					icon: "home",
					auth: false
				},
				{
					name: "About Us",
					isRouterLink: false,
					route: "about-us",
					icon: "information",
					auth: false
				},
				{
					name: "Recipes",
					isRouterLink: false,
					route: "recipes",
					icon: "silverware-fork-knife",
					auth: false
				},
				{
					name: "Profile",
					isRouterLink: true,
					route: "/profile",
					icon: "account",
					auth: true
				}
			]
		};
	},
	components: {
		LoginForm
	},
	methods: {
		...mapActions(["destroySession"]),
		scrollTo(id) {
			document.getElementById(id).scrollIntoView({
				behavior: "smooth"
			});
		},
		goTo(item) {
			if (item.isRouterLink) {
				this.$router.push({ path: item.route });
				this.scrollTo("app");
			} else this.scrollTo(item.route);
		},
		logout() {
			this.destroySession();
		}
	},
	computed: {
		...mapGetters(["isLogged"]),
		filtredMenuItems() {
			return this.menuItems.filter(
				(item) => !item.auth || (item.auth && this.isLogged)
			);
		}
	}
	// async mounted() {
	// 	if (this.$route.meta.requiresAuth === true) {
	// 		let result = await axios.get("auth/pivot/get");
	// 		if (result) {
	// 			this.messages = result.data.count;
	// 		}
	// 	}
	// 	setInterval(async () => {
	// 		if (this.$route.meta.requiresAuth === true) {
	// 			let result = await axios.get("auth/pivot/get");
	// 			if (result) {
	// 				this.messages = result.data.count;
	// 			}
	// 		}
	// 	}, 5000);
	// },
	// methods: {
	// async login() {
	// 	if (this.$refs.form.validate()) {
	// 		let result = await axios
	// 			.post("auth/login", {
	// 				email: this.email,
	// 				password: this.password
	// 			})
	// 			.catch((error) => {
	// 				this.alert = {
	// 					state: true,
	// 					type: "error",
	// 					content: "Passwords must be the same!"
	// 				};
	// 			});
	// 		try {
	// 			if (result) {
	// 				if (!result.data.access_token)
	// 					this.alert = {
	// 						state: true,
	// 						type: "error",
	// 						content: "Passwords must be the same!"
	// 					};
	// 				else {
	// 					this.alert = null;
	// 					cookie.setTokenCookie(result.data.access_token);
	// 					let user = await axios.get("auth/user");
	// 					store.dispatch("setSession", user.data);
	// 					let memberInfo = await axios.get(
	// 						"/auth/member/info"
	// 					);
	// 					if (memberInfo.status === 200)
	// 						store.dispatch(
	// 							"setMember",
	// 							memberInfo.data.data[0]
	// 						);
	// 					if (
	// 						memberInfo.data.data[0].first_name !== null &&
	// 						memberInfo.data.data[0].last_name !== null
	// 					) {
	// 						if (user.data.type === "admin")
	// 							this.$router.push("admin/logs");
	// 						else this.$router.push("news");
	// 					} else {
	// 						this.$router.push({
	// 							path: "profile",
	// 							params: { fromRegister: true }
	// 						});
	// 					}
	// 				}
	// 			} else {
	// 				this.alert = {
	// 					state: true,
	// 					type: "error",
	// 					content: "Something goes wrong! Try again"
	// 				};
	// 			}
	// 		} catch {
	// 			this.alert = {
	// 				state: true,
	// 				type: "error",
	// 				content: "Something goes wrong! Try again"
	// 			};
	// 			return;
	// 		}
	// 	}
	// },
	// async logout() {
	// 	let result = await axios.get("auth/logout");
	// 	if (result) {
	// 	} else {
	// 		this.alert = {
	// 			state: true,
	// 			type: "error",
	// 			content: "Something goes wrong! Try again"
	// 		};
	// 	}
	// },
	// async resetPassword() {
	// 	let result = await axios
	// 		.post("password/create", {
	// 			email: this.email
	// 		})
	// 		.catch((error) => {
	// 			this.$toasted.error(
	// 				"Something goes wrong, try again later",
	// 				{
	// 					theme: "toasted-primary",
	// 					position: "top-right",
	// 					fullWidth: true,
	// 					fitToScreen: false,
	// 					duration: 4000
	// 				}
	// 			);
	// 		});
	// 	if (result) {
	// 		this.$toasted.success(result.data.message, {
	// 			theme: "toasted-primary",
	// 			position: "top-right",
	// 			fullWidth: true,
	// 			fitToScreen: false,
	// 			duration: 4000
	// 		});
	// 	}
	// }
	// 	}
};
</script>

<style lang="scss">
.app-drawer {
	div {
		font-weight: bold;
	}
	a {
		color: black !important;
		font-weight: bold;
		&:link {
			color: black;
		}
		text-decoration: none;
	}
}
.app-bar {
	background: rgb(2, 68, 66) !important;
	.logo-text {
		text-decoration: none;
		color: white;
		font-family: Tangerine;
		font-size: 40px;
	}
}
.headline a {
	text-decoration: none;
	color: black;
}

.v-dialog--active {
	background: white !important;
}
</style>
