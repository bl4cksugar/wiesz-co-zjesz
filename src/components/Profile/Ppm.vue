<template>
	<div class="d-flex flex-column justify-center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn text color="indigo" large v-bind="attrs" v-on="on">
					<v-icon>mdi-calculator</v-icon> CALCULATE
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">Basic Metabolism*</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
							class="text-center px-4"
						>
							<v-row>
								<v-col cols="12">
									<h2>Choose geneder</h2>
									<v-radio-group v-model="radioGroup">
										<v-radio
											v-for="gender in genders"
											:key="gender"
											:label="`${gender}`"
											:value="gender"
										></v-radio>
									</v-radio-group>
								</v-col>
								<v-col cols="12" sm="6" md="2">
									<v-text-field
										:rules="[rules.required]"
										label="Age"
										type="number"
										min="1"
										v-model="age"
										required
									></v-text-field>
								</v-col>

								<v-col cols="12" sm="6" md="6">
									<v-text-field
										:rules="[rules.required]"
										type="number"
										min="1"
										label="Height"
										v-model="height"
										required
									></v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="number"
										min="1"
										:rules="[rules.required]"
										label="Weight"
										v-model="weight"
										required
									></v-text-field>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="close">
						Close
					</v-btn>
					<v-btn color="blue darken-1" text @click="save">
						Save
					</v-btn>
				</v-card-actions>
				<v-card-text>
					<small class="text--secondary">
						*the minimal amount of energy necessary to maintain
						respiration, circulation, and other vital body functions
						while fasting and at total rest.
					</small>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import validation from "../../mixins/validation";

export default {
	data() {
		return {
			weight: "",
			height: "",
			radioGroup: "male",
			age: 1,
			valid: null,
			dialog: false,
			genders: ["male", "female"]
		};
	},
	mixins: [validation],
	methods: {
		...mapActions(["setNotification", "setPpm"]),

		close() {
			this.dialog = false;
		},
		async save() {
			const isValid = await this.$refs.form.validate();
			if (isValid) {
				const result = await this.$profile.calculatePpm({
					height: +this.height,
					weight: +this.weight,
					isMale: this.radioGroup !== 1,
					age: +this.age
				});
				if (result.success) {
					this.dialog = false;
					this.setPpm(result.data);
				} else {
					this.setNotification({
						message: result.errors.message,
						color: "red"
					});
				}
			}
		}
	}
};
</script>
<style scoped></style>
