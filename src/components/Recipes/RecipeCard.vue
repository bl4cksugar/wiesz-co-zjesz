<template>
	<v-card @click="openRecipe">
		<v-img
			v-if="recipe.photo"
			:src="`${$imgPath}/${recipe.photo}`"
			aspect-ratio="1"
			class="grey lighten-2"
		>
			<template v-slot:placeholder>
				<v-row class="fill-height ma-0" align="center" justify="center">
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
					:value="overall"
					color="amber"
					dense
					half-increments
					readonly
					size="14"
				></v-rating>

				<div class="grey--text ml-4">
					{{
						`${overall ? overall : 0} (${
							this.recipe.grades.length
						})`
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
			<v-btn color="orange lighten-2" class="font-weight-bold" text>
				MORE
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
export default {
	props: {
		recipe: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			show: false
		};
	},
	computed: {
		overall() {
			let result = 0;
			this.recipe.grades.forEach((item) => {
				result += item.value;
			});
			return result / this.recipe.grades.length.toFixed(1);
		}
	},
	methods: {
		openRecipe() {
			this.$router.push({
				name: "Recipe",
				params: {
					id: this.recipe.id
				}
			});
		}
	}
};
</script>
