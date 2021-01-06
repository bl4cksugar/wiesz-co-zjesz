import Vue from "vue";
import VueRouter from "vue-router";
import RecipesPanel from "../views/AdminPanel/Recipes.vue";
import UsersPanel from "../views/AdminPanel/Users.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile
	},
	{
		path: "/admin/users",
		name: "user-panel",
		component: UsersPanel,
		meta: {
			requiresAdmin: true
		}
	},
	{
		path: "/admin/recipes",
		name: "recipes-panel",
		component: RecipesPanel,
		meta: {
			requiresAdmin: true
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,

	routes
});

export default router;
