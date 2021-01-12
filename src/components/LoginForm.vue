<template>
	<v-dialog v-model="dialog" max-width="800px" height="600px">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on" outlined color="white" class="mr-2">
				<span>SIGN IN</span>
			</v-btn>
		</template>

		<v-container
			class="d-flex flex-wrap px-0 py-0 align-stretch justify-center "
		>
			<div
				class="col-6 d-none d-sm-flex px-0 py-0"
				style="background: url(https://image.freepik.com/darmowe-zdjecie/czarna-jagoda-z-kroplami-wody_295303-445.jpg)"
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
							Log in
						</div>
					</div>
					<v-card-text class="col-12 text-center">
						<v-text-field
							background-color="white"
							v-model="email"
							outlined
							label="email"
							prepend-inner-icon="fas fa-user-circle"
							:rules="[rules.required, rules.email]"
						></v-text-field>

						<v-text-field
							background-color="white"
							v-model="password"
							outlined
							label="password"
							type="password"
							prepend-inner-icon="fas fa-key"
							@click:append="show1 = !show1"
							:rules="[rules.required]"
						></v-text-field>
						<v-btn
							color="indigo"
							dark
							class="col-6"
							rounded
							@click="checkLogin()"
						>
							<span>SIGN IN</span>
						</v-btn>
					</v-card-text>
				</v-form>
			</div>
		</v-container>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import validation from "../mixins/validation";

export default {
	data() {
		return {
			email: null,
			password: null,
			alert: null,
			valid: null,
			dialog: false
		};
	},
	mixins: [validation],
	methods: {
		...mapActions(["setNotification"]),
		async checkLogin() {
			const isValid = await this.$refs.form.validate();
			if (isValid) {
				const result = await this.$auth.logIn({
					email: this.email,
					password: this.password
				});
				if (result.success) {
					this.dialog = false;
				} else {
					this.setNotification({
						message: result.errors.message,
						color: "red"
					});
				}
			}
		}
	},
	components: {}
};
</script>

<style lang="scss"></style>
