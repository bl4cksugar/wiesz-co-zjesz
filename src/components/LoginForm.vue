<template>
	<v-dialog v-model="dialog" max-width="450px">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on" outlined color="white">
				<span>SIGN IN</span>
			</v-btn>
		</template>

		<v-container
			style="background:rgba(255,255,255,0.75)"
			class="d-flex align-center justify-center py-8 "
		>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-alert v-if="alert" :type="alert.type">{{
					alert.content
				}}</v-alert>
				<div class="title">
					<div
						class=" mb-2 text-center"
						style="color:black; font-family:Tangerine !important; font-size:50px;"
					>
						Welcome
					</div>
				</div>
				<v-text-field
					background-color="white"
					solo
					v-model="email"
					label="email"
					prepend-inner-icon="fas fa-user-circle"
					:rules="[rules.required, rules.email]"
				></v-text-field>

				<v-text-field
					background-color="white"
					solo
					v-model="password"
					label="password"
					type="password"
					prepend-inner-icon="fas fa-key"
					@click:append="show1 = !show1"
					:rules="[rules.required]"
				></v-text-field>
				<v-btn class="col-12" rounded @click="checkLogin()">
					<span>SIGN IN</span>
				</v-btn>
			</v-form>
		</v-container>
	</v-dialog>
</template>

<script>
// import { mapGetters } from "vuex";
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
		...mapActions(["setSession"]),
		checkLogin() {
			this.setSession({ name: "natka" });
			this.dialog = false;
		}
	},
	components: {}
};
</script>

<style lang="scss"></style>
