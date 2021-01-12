import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.comment = {
		async addComment(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/comments`
				},
				request
			);
			return result;
		},

		async deleteComment(request) {
			const result = await requestSender.send(
				{
					method: "delete",
					url: `/comments/{id}`
				},
				request
			);
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$comment: {
				get: () => Vue.comment
			}
		});
}
