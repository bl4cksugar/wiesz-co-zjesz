<template>
	<v-dialog v-model="dialog" max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" class="success mx-auto">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Add Ingredient</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						class="center"
					>
						<div class="d-flex flex-column">
							<div class="col-12 py-0 px-0">
								<h3>Recipe title</h3>
								<v-text-field
									v-model="name"
									solo
									prepend-inner-icon="mdi-calculator"
									:rules="[rules.required]"
									type="text"
									style="width:100%"
								></v-text-field>
							</div>
							<div class="col-12 py-0 px-0">
								<h3>Calories</h3>
								<v-text-field
									v-model="calories"
									prepend-inner-icon="mdi-calculator"
									:rules="[rules.number]"
									type="number"
									min="0"
									suffix="kcal"
									solo
								></v-text-field>
							</div>
						</div>
					</v-form>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">
					Close
				</v-btn>
				<v-btn color="blue darken-1" text @click="addIngredient">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import validation from "../../mixins/validation";
export default {
	data() {
		return {
			name: "",
			calories: 0,
			valid: null,
			dialog: false
		};
	},
	mixins: [validation],
	methods: {
		async addIngredient() {
			const result = await this.$ingredient.addIngredient({
				name: this.name,
				calories: +this.calories
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
};
</script>
