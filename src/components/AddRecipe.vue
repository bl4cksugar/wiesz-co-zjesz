<template>
	<v-dialog v-model="dialog" max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-fab-transition>
				<v-btn
					v-bind="attrs"
					v-on="on"
					color="#3f51b5"
					dark
					fixed
					bottom
					right
					fab
				>
					<v-icon>mdi-plus</v-icon>
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
							v-model="title"
							solo
							hint="Type title of recipe"
							:rules="[rules.required]"
						>
						</v-text-field>
						<h3>Method of preparing</h3>

						<v-textarea
							v-model="description"
							:rules="[rules.required]"
							label="describe the preparation method"
							solo
							name="input-7-4"
						></v-textarea>
						<h3>Upload picture</h3>

						<v-file-input
							accept="image/png, image/jpeg"
							label="File input"
							show-size
							@change="selectFile"
							solo
							prepend-icon="mdi-camera"
							:rules="[rules.maxSize, rules.required]"
							counter
						></v-file-input>

						<br />
						<h3>Ingredients</h3>
						<v-autocomplete
							v-model="pickedIngredients"
							:items="ingredients"
							chips
							small-chips
							deletable-chips
							solo
							@click.native="openIngredients"
							:search-input.sync="searchIngredient"
							item-text="title"
							item-value="id"
							:rules="[rules.required]"
							multiple
						></v-autocomplete>
						<div
							v-for="ingredient in recipeIngredients"
							:key="ingredient.id"
							class="d-flex flex-row align-items-center justify-content-center"
						>
							<v-text-field
								:value="ingredient.title"
								disabled
								solo
								type="text"
								class="pr-5"
							></v-text-field>
							<v-text-field
								v-model="ingredient.quantity"
								prepend-inner-icon="mdi-calculator"
								:rules="[rules.number, rules.required]"
								solo
								type="number"
								min="0"
								suffix="g"
							></v-text-field>
						</div>
						<div class="col-12 d-flex justify-center flex-column">
							<small>
								Can't see the ingredient you are using in your
								recipe? Add it!
							</small>
							<add-ingredient
								@ingredientAdded="fetchIngredients"
							></add-ingredient>
						</div>
						<div class="d-flex flex-column flex-md-row">
							<div class="col-12 py-0 px-0 pl-md-2">
								<h3>Preparing time</h3>
								<v-text-field
									v-model="time"
									prepend-inner-icon="mdi-clock-time-eight"
									:rules="[rules.number, rules.required]"
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
import validation from "../mixins/validation";
import AddIngredient from "./Ingredients/AddIngredient.vue";

export default {
	components: {
		AddIngredient
	},
	data() {
		return {
			title: "",
			description: "",
			calories: "",
			time: 1,
			valid: true,
			photo: "",
			searchIngredient: "",
			ingredients: [],
			pickedIngredients: [],
			recipeIngredients: [],
			dialog: false
		};
	},
	watch: {
		pickedIngredients: {
			deep: true,
			handler(newVal) {
				this.recipeIngredients = newVal.map((item) =>
					this.ingredients.find((element) => element.id === item)
				);
			}
		}
	},
	mixins: [validation],
	methods: {
		selectFile(file) {
			this.photo = file;
		},
		...mapActions(["setNotification"]),
		remove(item) {
			const index = this.pickedIngredients.indexOf(item.name);
			if (index >= 0) this.pickedIngredients.splice(index, 1);
		},
		openIngredients() {
			if (this.ingredients.length === 0) this.fetchIngredients();
		},
		close() {
			this.dialog = false;
		},
		async fetchIngredients() {
			const result = await this.$ingredient.getIngredients({
				page: 1,
				pageSize: 99999
			});
			if (result.success) this.ingredients = result.data.results;
		},
		async save() {
			const isValid = await this.$refs.form.validate();
			if (isValid) {
				const formData = new FormData();
				formData.append("photo", this.photo, this.photo.name);
				const savedFile = await this.$recipe.uploadPhoto(formData);

				if (savedFile.success) {
					this.saveRecipe(savedFile.data);
				}
			}
		},
		async saveRecipe(fileName) {
			const result = await this.$recipe.addRecipe({
				title: this.title,
				description: this.description,
				preparingTime: +this.time,
				photo: fileName,
				ingredients: [
					...this.recipeIngredients.map((item) => ({
						ingredientId: item.id,
						quantity: +item.quantity
					}))
				]
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
