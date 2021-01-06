<template>
	<v-card @click="openRecipe">
		<v-img
			:src="`https://picsum.photos/500/300?image=${recipe.id * 19 + 16}`"
			:lazy-src="
				`https://picsum.photos/10/6?image=${recipe.id * 19 + 16}`
			"
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
		<div class="d-flex ">
			<v-card-subtitle class="d-flex justify-left">
				Calories:{{ recipe.calories }} kcal
			</v-card-subtitle>
			<v-card-subtitle class="d-flex justify-left">
				time:{{ recipe.time }} min
			</v-card-subtitle>
		</div>
		<v-card-actions>
			<v-btn color="orange lighten-2" class="font-weight-bold" text>
				CHECK
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
	methods: {
		openRecipe() {
			console.log(this.recipe.id);
		}
	}
};
</script>
