import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		notification: null
	},
	getters: {
		user: (state) => state.user,
		notification: (state) => state.notification,
		isLogged: (state) => !!state.user
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
		setSession({ commit }, user) {
			commit("storeUser", user);
		},
		setNotification({ commit }, notification) {
			commit("setNotification", notification);
		},
		restoreSession({ dispatch }) {
			if (cookieHelper.hasSessionCookie()) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("removeUser");
		}
	}
});
