import cookie from "vue-cookies";

const SESSION_COOKIE_NAME = "common_token";
const APP_DOMAIN =
	process.env.VUE_APP_NODE_ENV === "prod" ? "wiesz-co-zjesz.github.io" : "";

const defaultParams = {
	expires: "2h"
};

export default {
	deleteSessionCookie() {
		cookie.remove(SESSION_COOKIE_NAME, "/web", APP_DOMAIN);
	},
	hasSessionCookie() {
		return !!cookie.get(SESSION_COOKIE_NAME);
	},
	setSessionCookie(token) {
		cookie.set(
			SESSION_COOKIE_NAME,
			token,
			defaultParams.expires,
			"/web",
			APP_DOMAIN
		);
	},
	getSessionCookie() {
		return cookie.get(SESSION_COOKIE_NAME);
	}
};
