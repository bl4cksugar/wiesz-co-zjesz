import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import cookieHelper from "./helpers/cookieHelper";
import vuetify from "./plugins/vuetify";
import router from "./router";
import authorizationService from "./services/authorizationService";
import commentService from "./services/commentService";
import gradeService from "./services/gradeService";
import ingredientService from "./services/ingredientService";
import profileService from "./services/profileService";
import recipeService from "./services/recipeService";
import userService from "./services/userService";
import store from "./store";

Vue.use(VueAxios, Axios);
Vue.use(VueCookies);
Vue.use(authorizationService);
Vue.use(commentService);
Vue.use(gradeService);
Vue.use(ingredientService);
Vue.use(recipeService);
Vue.use(profileService);
Vue.use(userService);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
Vue.axios.interceptors.request.use(
	(config) => {
		const token = cookieHelper.getSessionCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

Vue.axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		let errorResponse = error.response;
		if (!errorResponse) {
			router.push({
				name: "Home"
			});
			errorResponse = {
				data: {
					success: false,
					message: "Connection error"
				}
			};
		} else if (error.response.status === 500) {
			this.$notify.error({
				title: "Error",
				message: error.response.data.message
			});
		} else if (
			error.response.status === 401 ||
			error.response.status === 403 // TODO: Consider this
		) {
			store.dispatch("destroySession");
		}
		return Promise.reject(errorResponse);
	}
);

Vue.prototype.$imgPath = process.env.VUE_APP_API_IMAGES_URL;
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app");
