import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		notification: null
	},
	getters: {
		user: (state) => state.user,
		notification: (state) => state.notification,
		isLogged: (state) => !!state.user,
		isAdmin: (state) => state.user?.role === "Admin"
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		setNotification(state, notification) {
			state.notification = notification;
		},
		removeUser(state) {
			state.user = null;
		}
	},
	actions: {
		setSession({ commit }, token) {
			commit("storeUser", parseJwt(token));
			cookieHelper.setSessionCookie(token);
		},
		setNotification({ commit }, notification) {
			commit("setNotification", notification);
		},
		restoreSession({ dispatch, getters }) {
			if (cookieHelper.hasSessionCookie() && !getters.isLogged) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("removeUser");
			cookieHelper.deleteSessionCookie();
		}
	}
});
