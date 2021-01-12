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
		<search @dispatchFindRecipe="findRecipe"></search>

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
			<v-btn class="ma-2" icon>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn class="ma-2 " icon>
				<v-icon>mdi-arrow-right</v-icon>
			</v-btn>
		</div>
	</div>
</template>
<script>
import Search from "./Search.vue";
import RecipeCard from "./RecipeCard.vue";
export default {
	components: {
		Search,
		RecipeCard
	},
	data() {
		return {
			recipes: []
		};
	},

	created() {
		this.getRecipes();
	},
	methods: {
		findRecipe(searchConfig) {
			console.log(searchConfig);
		},

		async getRecipes() {
			const result = await this.$recipe.getRecipes({
				page: 1,
				pageSize: 9
			});
			if (result.success) {
				this.recipes = result.data.results;
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
