<template>
	<div class="d-flex flex-column justify-center">
		<v-row class="d-flex flex-row">
			<div v-for="n in 9" :key="n" class="col-12 col-md-6 col-lg-4">
				<v-card class=" ma-2">
					<v-img
						src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
						height="200px"
					></v-img>

					<v-card-title>
						{title}
					</v-card-title>

					<v-card-subtitle>
						{calories}
					</v-card-subtitle>

					<v-card-actions>
						<v-btn color="orange lighten-2" text>
							Check
						</v-btn>

						<v-spacer></v-spacer>

						<v-btn icon @click="show = !show">
							<v-icon>{{
								show ? "mdi-chevron-up" : "mdi-chevron-down"
							}}</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-row>
		<v-btn color="orange lighten-1" text>
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
		}
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
