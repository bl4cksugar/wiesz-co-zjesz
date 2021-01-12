import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import IngredientsPanel from "../views/AdminPanel/Ingredients.vue";
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
		name: "UsersPanel",
		component: UsersPanel,
		meta: {
			requiresAdmin: true
		}
	},
	{
		path: "/admin/recipes",
		name: "RecipesPanel",
		component: RecipesPanel,
		meta: {
			requiresAdmin: true
		}
	},
	{
		path: "/admin/ingredients",
		name: "IngredientsPanel",
		component: IngredientsPanel,
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

router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");
	const { isAdmin } = store.getters;
	if (to.matched.some((route) => route.meta.requiresAdmin)) {
		!isAdmin ? next({ name: "Home" }) : next();
	} else {
		next();
	}
});

export default router;
