import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.recipe = {
		async editRecipe(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/recipes/${+id}`
			});
			return result;
		},

		async deleteRecipe(request) {
			const result = await requestSender.send(
				{
					method: "delete",
					url: `/recipes/{id}`
				},
				request
			);
			return result;
		},

		async getRecipe(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/recipes/{id}`,
				params: query
			});
			return result;
		},
		async getRecipes(query) {
			const result = await requestSender.send({
				method: "get",
				url: `/recipes`,
				params: query
			});
			return result;
		},
		async addRecipe(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/recipes`
				},
				request
			);
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$recipe: {
				get: () => Vue.recipe
			}
		});
}
