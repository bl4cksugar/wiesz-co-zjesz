<template>
	<div
		d-flex
		class="recipe col-12 text-center d-flex flex-column justify-center align-center"
	>
		<span style="font-family:Tangerine; font-size:75px; ">
			Recipe
		</span>
		<search @dispatchFindRecipe="findRecipe"></search>

		<div class="col-12 col-md-8 d-flex row">
			<div
				v-for="recipe in recipes"
				:key="recipe.name"
				class=" col-12 col-sm-6 col-md-4 "
			>
				<recipe-card :recipe="recipe"></recipe-card>
			</div>
		</div>
		<div class="col-12 d-flex align-center justify-center ">
			<v-btn class="ma-2" rounded large>
				<v-icon>mdi-arrow-left</v-icon> COFNIJ
			</v-btn>

			<v-btn class="ma-2 " rounded large>
				DALEJ <v-icon>mdi-arrow-right</v-icon>
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
				{ id: 8, title: "test", img: "", calories: 0, time: 0 }
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
