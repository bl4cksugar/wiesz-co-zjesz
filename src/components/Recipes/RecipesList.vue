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
			recipes: [
				{ id: 1, title: "test", img: "", calories: 0, time: 0 },
				{ id: 2, title: "test", img: "", calories: 0, time: 0 },
				{ id: 3, title: "test", img: "", calories: 0, time: 0 },
				{ id: 4, title: "test", img: "", calories: 0, time: 0 },
				{ id: 5, title: "test", img: "", calories: 0, time: 0 },
				{ id: 6, title: "test", img: "", calories: 0, time: 0 },
				{ id: 7, title: "test", img: "", calories: 0, time: 0 },
				{ id: 8, title: "test", img: "", calories: 0, time: 0 },
				{ id: 9, title: "test", img: "", calories: 0, time: 0 }
			]
		};
	},
	methods: {
		findRecipe(searchConfig) {
			console.log(searchConfig);
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
