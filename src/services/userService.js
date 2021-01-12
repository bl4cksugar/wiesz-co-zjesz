import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.user = {
		async banUser(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/users/ban/${+id}`
			});
			return result;
		},

		async unbanUser(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/users/unban/${+id}`
			});
			return result;
		},

		async getUsers(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/users`,
				params: query
			});
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$user: {
				get: () => Vue.user
			}
		});
}
