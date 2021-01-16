<template>
	<v-dialog v-model="dialog" max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-fab-transition>
				<v-btn
					class="ml-2"
					v-bind="attrs"
					v-on="on"
					text
					icon
					color="warning"
				>
					<v-icon>fas fa-edit</v-icon>
				</v-btn>
			</v-fab-transition>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Add Recipe</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<h3>Title of recipe</h3>
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						class="center"
					>
						<v-text-field
							v-model="editedRecipe.title"
							solo
							hint="Type title of recipe"
						></v-text-field>
						<h3>Method of preparing</h3>

						<v-textarea
							v-model="editedRecipe.description"
							:rules="[rules.required]"
							label="describe the preparation method"
							solo
							name="input-7-4"
						></v-textarea>
						<div class="d-flex flex-column flex-md-row">
							<div class="col-12 py-0 px-0 pl-md-2">
								<h3>Preparing time</h3>
								<v-text-field
									v-model="editedRecipe.time"
									prepend-inner-icon="mdi-clock-time-eight"
									:rules="[rules.number]"
									solo
									type="number"
									min="0"
									suffix="minutes"
									label="Preparing Time"
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
				<v-btn color="blue darken-1" text @click="save">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapActions } from "vuex";
import validation from "../../mixins/validation";

export default {
	props: {
		recipe: {
			required: true,
			type: Object
		}
	},
	watch: {
		recipe(newVal) {
			this.editedRecipe = { ...newVal };
		}
	},
	data() {
		return {
			editedRecipe: {
				title: "",
				description: "",
				time: ""
			},
			valid: true,
			dialog: false
		};
	},
	mixins: [validation],
	methods: {
		...mapActions(["setNotification"]),
		close() {
			this.dialog = false;
		},
		async save() {
			const result = await this.$recipe.editRecipe(this.recipe.id, {
				title: this.editedRecipe.title,
				description: this.editedRecipe.description,
				preparingTime: +this.editedRecipe.time
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
