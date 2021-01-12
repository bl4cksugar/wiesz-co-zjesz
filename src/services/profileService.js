import requestSender from "../helpers/requestSender";

export default function(Vue) {
	(Vue.profile = {
		async editProfile(request) {
			const result = await requestSender.send(
				{
					method: "put",
					url: `/profiles`
				},
				request
			);
			return result;
		}
	}),
		Object.defineProperties(Vue.prototype, {
			$profile: {
				get: () => Vue.profile
			}
		});
}
