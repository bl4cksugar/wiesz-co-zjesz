<template>
	<div class="col-12 md-8 d-flex justify-center align-center flex-column">
		<span
			class="text--secondary text-uppercase"
			style="font-family:Montserrat; font-size:15px; "
		>
			Find your favorite
		</span>
		<div class="col-12 col-md-6">
			<v-text-field
				v-model="searchQuery"
				prepend-inner-icon="mdi-magnify"
				flat
				label="Search"
				outlined
			></v-text-field>
			<div class="d-flex flex-column flex-md-row">
				<div class="col-12 col-md-6 py-0 px-0 pr-md-2">
					<v-text-field
						v-model="calories"
						prepend-inner-icon="mdi-calculator"
						flat
						:rules="[rules.number]"
						type="number"
						min="0"
						suffix="kcal"
						label="Max calories"
						outlined
					></v-text-field>
				</div>
				<div class="col-12 col-md-6 py-0 px-0 pl-md-2">
					<v-text-field
						v-model="time"
						prepend-inner-icon="mdi-clock-time-eight"
						flat
						:rules="[rules.number]"
						type="number"
						min="0"
						suffix="minutes"
						label="Preparing Time"
						outlined
					></v-text-field>
				</div>
			</div>
			<v-autocomplete
				v-model="pickedIngredients"
				:items="ingredients"
				chips
				@click.native="openIngredients"
				small-chips
				deletable-chips
				outlined
				:search-input.sync="searchIngredient"
				placeholder="Ingredients"
				label="Find ingridients"
				item-text="title"
				item-value="id"
				multiple
			></v-autocomplete>
			<v-btn @click="clear" text color="red" rounded v-if="isFormFilled"
				>Clear</v-btn
			>
			<v-btn
				@click="findRecipe"
				rounded
				width="200px"
				:disabled="!isFormFilled"
				>Search</v-btn
			>
		</div>
	</div>
</template>
<script>
import validation from "../../mixins/validation";
export default {
	data() {
		return {
			searchQuery: "",
			calories: "",
			time: "",
			ingredients: [],
			pickedIngredients: [],
			searchIngredient: ""
		};
	},
	mixins: [validation],
	methods: {
		remove(item) {
			const index = this.pickedIngredients.indexOf(item.name);
			if (index >= 0) this.pickedIngredients.splice(index, 1);
		},
		findRecipe() {
			this.$emit("dispatchFindRecipe", {
				searchQuery:
					this.searchQuery.length > 0 ? this.searchQuery : null,
				maxCalories: +this.calories,
				maxPreparingTime: +this.time,
				ingredients:
					this.pickedIngredients.length > 0
						? this.pickedIngredients
						: []
			});
		},
		clear() {
			(this.searchQuery = ""),
				(this.calories = ""),
				(this.time = ""),
				(this.pickedIngredients = []);
			this.$emit("dispatchFindRecipe", {
				searchQuery: null,
				maxCalories: 0,
				maxPreparingTime: 0,
				ingredients: []
			});
		},
		openIngredients() {
			if (this.ingredients.length === 0) this.fetchIngredients();
		},
		async fetchIngredients() {
			const result = await this.$ingredient.getIngredients({
				page: 1,
				pageSize: 99999,
				searchQuery: this.searchQuery
			});
			if (result.success) this.ingredients = result.data.results;
		}
	},
	computed: {
		isFormFilled() {
			return (
				this.searchQuery.length > 0 ||
				this.calories > 0 ||
				this.time > 0 ||
				this.pickedIngredients.length > 0
			);
		}
	}
};
</script>
