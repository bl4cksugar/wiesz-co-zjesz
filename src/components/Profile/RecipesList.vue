<template>
	<div class="d-flex flex-column justify-center">
		<v-row class="d-flex flex-row" v-if="recipes.length > 0">
			<div
				v-for="recipe in recipes"
				:key="recipe.id"
				class="col-12 col-md-6 col-lg-4"
			>
				<v-card @click="openRecipe(recipe.id)">
					<v-img
						v-if="recipe.photo"
						:src="recipe.photo"
						aspect-ratio="1"
						class="grey lighten-2"
					>
						<template v-slot:placeholder>
							<v-row
								class="fill-height ma-0"
								align="center"
								justify="center"
							>
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
					<v-card-title>
						{{ recipe.title }}
					</v-card-title>
					<v-card-text>
						<v-row align="center" class="mx-0 d-flex flex-column">
							<v-rating
								:value="overall(recipe)"
								color="amber"
								dense
								half-increments
								readonly
								size="14"
							></v-rating>

							<div class="grey--text ml-4">
								{{
									`${
										overall(recipe) ? overall(recipe) : 0
									} (${recipe.grades.length})`
								}}
							</div>
						</v-row>
					</v-card-text>
					<div class="d-flex flex-column">
						<v-card-subtitle class="text-left py-1">
							calories: {{ recipe.calories }} kcal
						</v-card-subtitle>
						<v-card-subtitle class="text-left pt-0">
							time: {{ recipe.preparingTime }} min
						</v-card-subtitle>
					</div>
					<v-card-actions>
						<v-btn
							color="orange lighten-2"
							class="font-weight-bold"
							text
						>
							MORE
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-row>
		<div class="col-12 d-flex justify-center" v-else>
			NO DATA
		</div>
		<v-btn
			v-if="
				pagination.currentPage !== pagination.pageCount &&
					recipes.length > 0
			"
			color="orange lighten-1"
			text
			@click="loadMore"
		>
			SHOW MORE
		</v-btn>
	</div>
</template>

<script>
export default {
	props: {
		config: {
			type: Object,
			required: true
		},
		refresh: {
			type: Boolean,
			required: true
		}
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
	mounted() {
		this.getRecipes();
	},
	watch: {
		refresh() {
			this.recipes.length = 0;
			this.pagination.perPage = 9;
			this.pagination.currentPage = 1;
			this.pagination.total = 1;
			this.pagination.pageCount = 1;
			this.getRecipes();
		}
	},
	methods: {
		openRecipe(recipeId) {
			this.$router.push({
				name: "Recipe",
				params: {
					id: recipeId
				}
			});
		},
		loadMore() {
			console.log("ssd");
			this.pagination.currentPage++;
			this.getRecipes();
		},
		overall(recipe) {
			let result = 0;
			recipe.grades.forEach((item) => {
				result += item.value;
			});
			return result / recipe.grades.length.toFixed(1);
		},
		async getRecipes() {
			const result = await this.$recipe.getRecipes({
				page: this.pagination.currentPage,
				pageSize: 9,
				isMine: this.config.isMine,
				isFavorite: this.config.isFavorite
			});
			console.log(result);
			if (result.success) {
				this.recipes.push(...result.data.results);
				this.pagination.pageCount = Math.ceil(
					result.data.count / this.pagination.perPage
				);
			}
		}
	}
};
</script>
