import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.recipe = {
		async editRecipe(id, request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/recipes/${+id}`
				},
				request
			);
			return result;
		},
		async likeRecipe(id) {
			const result = await requestSender.send({
				method: "put",
				url: `/recipes/like/${+id}`
			});
			return result;
		},
		async deleteRecipe(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/recipes/${+id}`
			});
			return result;
		},

		async getRecipe(id) {
			const result = await requestSender.send({
				method: "get",
				url: `/recipes/${id}`
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
