<template>
	<v-dialog v-model="dialog" max-width="800px" height="600px">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on" outlined color="white">
				<span>SIGN IN</span>
			</v-btn>
		</template>

		<v-container
			class="d-flex flex-wrap align-stretch justify-center px-0 py-0"
		>
			<div
				class="col-7 d-none d-sm-flex"
				style="background: url('https://image.freepik.com/darmowe-zdjecie/widok-z-gory-na-ksztalt-choinki-z-piernikow-i-przyborow-kuchennych-z-miejscem-na-kopie_23-2148705388.jpg')"
			></div>
			<div class="col-12 col-sm-5 my-15">
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
							style="color:black; font-family:Tangerine !important; font-size:50px;"
						>
							Wiesz co Zjesz
						</div>
					</div>
					<v-text-field
						background-color="white"
						v-model="email"
						label="email"
						prepend-inner-icon="fas fa-user-circle"
						:rules="[rules.required, rules.email]"
					></v-text-field>

					<v-text-field
						background-color="white"
						v-model="password"
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
				</v-form>
			</div>
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
