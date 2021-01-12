import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.ingredient = {
		async editIngredient(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/ingredients/${+id}`
			});
			return result;
		},
		async addIngredient(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/ingredients`
				},
				request
			);
			return result;
		},
		async deleteIngredient(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/ingredients/${+id}`
			});
			return result;
		},

		async getIngredients(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/ingredients`,
				params: query
			});
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$ingredient: {
				get: () => Vue.ingredient
			}
		});
}
