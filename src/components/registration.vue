<template>
	<v-dialog v-model="dialog" max-width="800px" height="600px">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on" outlined color="white">
				<span> SIGN UP</span>
			</v-btn>
		</template>
		<v-container
			class="d-flex flex-wrap align-stretch justify-center px-0 py-0"
		>
			<div
				class="col-6 d-none d-sm-flex"
				style="background: url(https://image.freepik.com/darmowe-zdjecie/swieze-jagody-na-bialym-tle-widok-z-gory_254005-19.jpg) "
			></div>
			<div class="col-12 col-sm-6 my-15">
				<v-form
					ref="form"
					v-model="valid"
					lazy-validation
					class="text-center px-4"
				>
					<v-alert v-if="alert" :type="alert.type">{{
						alert.content
					}}</v-alert>
					<div class="title">
						<div
							class=" mb-2 text-center"
							style="color:black; font-family:Merriweather !important; font-size:50px;"
						>
							Registration
						</div>
						<v-alert v-if="alert" :type="alert.type">{{
							alert.content
						}}</v-alert>
					</div>

					<v-card-text class="col-12 text-center">
						<v-text-field
							background-color="rgba(255, 255, 255, 0.9)"
							color="grey"
							outlined
							v-model="nickname"
							label="Nickname"
						></v-text-field>
						<v-text-field
							background-color="rgba(255, 255, 255, 0.9)"
							color="grey"
							outlined
							v-model="email"
							label="E-mail"
							:rules="[rules.required, rules.email]"
						></v-text-field>

						<v-text-field
							background-color="rgba(255, 255, 255, 0.9)"
							color="grey"
							outlined
							v-model="password"
							:append-icon="
								showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
							"
							:rules="[rules.required, rules.min]"
							:type="showPassword ? 'text' : 'password'"
							label="Password"
							prepend-inner-icon="fas fa-key"
							@click:append="showPassword = !showPassword"
						></v-text-field>

						<v-btn
							color="indigo"
							class="col-6"
							dark
							@click="signUp"
							rounded
							>SIGN UP</v-btn
						>
					</v-card-text>
				</v-form>
			</div>
		</v-container>
	</v-dialog>
</template>
<script>
import axios from "axios";
import validation from "../mixins/validation";
export default {
	mixins: [validation],
	data() {
		return {
			showPassword: false,
			password: "",
			repeatPassword: "",
			surname: "",
			email: "",
			valid: null,
			alert: null
		};
	},
	methods: {
		async signUp() {
			this.alert = null;
			if (this.$refs.form.validate()) {
				try {
					let result = await axios.post("auth/signup", {
						email: this.email,
						password: this.password,
						password_confirmation: this.repeatPassword,
						name: this.surname
					});
					if (result) {
						if (!result.data)
							this.alert = {
								state: true,
								type: "error",
								content: "Passwords must be the same!"
							};
						else
							this.alert = {
								state: true,
								type: "success",
								content: result.data.message
							};
					} else {
						this.alert = {
							state: true,
							type: "error",
							content: "Something goes wrong! Try again"
						};
					}
				} catch {
					this.alert = {
						state: true,
						type: "error",
						content: "Something goes wrong! Try again"
					};
					return;
				}
			}
		},

		save(date) {
			this.$refs.menu.save(date);
		}
	}
};
</script>

<style scoped></style>
