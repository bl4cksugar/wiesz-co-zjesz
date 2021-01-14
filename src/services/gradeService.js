import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.grade = {
		async addGrade(request) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/grades`
				},
				request
			);
			return result;
		},

		async deleteGrade(id) {
			const result = await requestSender.send({
				method: "delete",
				url: `/grades/${id}`
			});
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$grade: {
				get: () => Vue.grade
			}
		});
}
