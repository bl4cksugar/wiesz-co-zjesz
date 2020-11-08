<template>
	<v-col
		sm="12"
		md="6"
		lg="4"
		class="d-flex align-content-center justify-center"
	>
		<v-card
			flat
			class="col-12 py-8"
			style="background: rgba(255,255,255,0.8)"
		>
			<div class="title text-center pt-4">
				<div style="font-family:Merriweather; color: #2c3e50">
					<h2>REGISTRATION</h2>
				</div>
				<v-alert v-if="alert" :type="alert.type">{{
					alert.content
				}}</v-alert>
			</div>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-card-text class="col-12 text-center">
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

					<v-text-field
						background-color="rgba(255, 255, 255, 0.9)"
						color="grey"
						outlined
						v-model="repeatPassword"
						:rules="[rules.required, rules.min]"
						:type="showPassword ? 'text' : 'password'"
						label="Repeat password"
						prepend-inner-icon="fas fa-key"
						@keyup.enter="submit"
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
		</v-card>
	</v-col>
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
