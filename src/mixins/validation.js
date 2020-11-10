export default {
	data() {
		return {
			rules: {
				required: (value) => !!value || "Required.",
				min: (v) => v.length >= 8 || "Min 8 characters",
				max: (v) => v.length <= 25 || "Max 25 characters",
				emailMatch: () =>
					"The email and password you entered don't match",
				email: (value) => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return pattern.test(value) || "Invalid e-mail.";
				},
				number: (value) => {
					const pattern = /^(0|[1-9][0-9]*)$/;
					return pattern.test(value) || "Only numbers!";
				}
			}
		};
	}
};
