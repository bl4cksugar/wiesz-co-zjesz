<template>
	<div
		id="recipes"
		d-flex
		class="recipe col-12 text-center d-flex flex-column justify-center align-center"
	>
		<span style="font-family:Raleway; font-size:40px; margin-bottom:10px">
			Recipe
		</span>
		<v-divider width="250px"></v-divider>
		<search v-if="isLogged" @dispatchFindRecipe="findRecipe"></search>

		<div class="col-10 col-md-6 d-flex row">
			<div
				v-for="recipe in recipes"
				:key="recipe.name"
				class=" col-10 col-sm-4 col-md-4 "
			>
				<recipe-card :recipe="recipe"></recipe-card>
			</div>
		</div>
		<div class="col-10 col-md-6 d-flex align-center justify-center ">
			<v-btn
				class="ma-2"
				icon
				:disabled="pagination.currentPage === 1"
				@click="changePage(-1)"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				class="ma-2 "
				icon
				:disabled="pagination.currentPage === pagination.pageCount"
				@click="changePage(1)"
			>
				<v-icon>mdi-arrow-right</v-icon>
			</v-btn>
		</div>
	</div>
</template>
<script>
import Search from "./Search.vue";
import RecipeCard from "./RecipeCard.vue";
import { mapGetters } from "vuex";

export default {
	components: {
		Search,
		RecipeCard
	},
	data() {
		return {
			recipes: [],
			pagination: {
				perPage: 9,
				currentPage: 1,
				total: 1,
				pageCount: 1,
				maxCalories: null,
				maxPreparingTime: null,
				ingredients: "",
				searchQuery: ""
			}
		};
	},
	computed: {
		...mapGetters(["isLogged"]),
		currentPage() {
			return this.pagination.currentPage;
		}
	},
	watch: {
		currentPage() {
			this.getRecipes();
		}
	},
	created() {
		this.getRecipes();
	},
	methods: {
		findRecipe(searchConfig) {
			this.pagination.maxCalories = searchConfig.maxCalories;
			this.pagination.ingredients = searchConfig.ingredients.join();

			this.pagination.maxPreparingTime = searchConfig.maxPreparingTime;
			this.pagination.searchQuery = searchConfig.searchQuery;

			this.getRecipes();
		},
		changePage(shift) {
			this.pagination.currentPage += shift;
		},
		async getRecipes() {
			const result = await this.$recipe.getRecipes({
				page: this.pagination.currentPage,
				pageSize: 9,
				maxCalories: this.pagination.maxCalories,
				ingredients: this.pagination.ingredients,
				maxPreparingTime: this.pagination.maxPreparingTime,
				searchQuery: this.pagination.searchQuery
			});
			if (result.success) {
				this.recipes = result.data.results;
				this.pagination.total = result.data.count;
				this.pagination.pageCount = Math.ceil(
					result.data.count / this.pagination.perPage
				);
			}
		}
	}
};
</script>

<style lang="scss">
#recipes {
	background: url("../../assets/bg3.jpg");

	background-position: center;
	background-repeat: repeat-y;
}
</style>
