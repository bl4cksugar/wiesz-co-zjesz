import axios from "axios";

export default {
	async send(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params
			});
			return this.__responseWrapper(result);
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	async sendClear(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params,
				responseType: "blob"
			});
			return result;
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	__responseWrapper(result, status = true) {
		const wrappedResponse = {
			status: result.status
		};
		if (status) {
			wrappedResponse.data = result.data;
			Object.assign(
				wrappedResponse,
				result.data.count ? { count: result.data.count } : null,
				result.data.page ? { page: result.data.page } : null
			);
			wrappedResponse.success = true;
		} else {
			wrappedResponse.errors = {
				statusCode: result.status,
				message: result.data
			};
			wrappedResponse.success = false;
		}
		return wrappedResponse;
	}
};
