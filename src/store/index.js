import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null
	},
	getters: {
		user: (state) => state.user,
		isLogged: (state) => !!state.user
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		removeUser(state) {
			state.user = null;
		}
	},
	actions: {
		setSession({ commit }, user) {
			commit("storeUser", user);
		},
		destroySession({ commit }) {
			commit("removeUser");
		}
	}
});
