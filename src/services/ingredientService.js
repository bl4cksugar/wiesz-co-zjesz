import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.comment = {
		async editIngredient(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/ingredients/${+id}`
			});
			return result;
		},

		async deleteIngredient(request) {
			const result = await requestSender.send(
				{
					method: "delete",
					url: `/ingredients/{id}`
				},
				request
			);
			return result;
		},

		async getIntegrient(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/integrients`,
				params: query
			});
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$integrient: {
				get: () => Vue.integrient
			}
		});
}
