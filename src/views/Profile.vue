<template>
	<v-container
		class="profile-page d-flex justify-center align-center flex-column"
	>
		<div class="d-flex col-10 col-md-6 flex-column flex-md-row">
			<div class="col-12 col-md-4 d-flex align-center justify-center">
				<v-avatar color="indigo" class="profileAvatar"
					><v-icon dark>
						mdi-account-circle
					</v-icon></v-avatar
				>
			</div>
			<div
				class="col-12 col-md-8 d-flex align-center justify-space-between flex-row flex-wrap"
			>
				<div>
					<h2 style="font-family:Merriweather;">
						John Doe
					</h2>
					<small
						class="text--secondary text-uppercase"
						style="font-family:Montserrat; "
					>
						<strong>my basic metabolism:</strong>
						{{ `${ppm} kcal` }}
					</small>
				</div>
				<div class="d-flex flex-column flex-md-row">
					<ppm class="mx-2"></ppm>
					<delete-modal class="mx-2"></delete-modal>
				</div>
			</div>
		</div>
		<div class="d-flex col-12 flex-column justify-center align-center">
			<v-tabs
				v-model="tab"
				color="indigo accent-4"
				class="d-flex justify-center"
				icons-and-text
			>
				<v-tab href="#tab-1">
					My Recipes
					<v-icon>mdi-silverware-fork-knife</v-icon>
				</v-tab>

				<v-tab href="#tab-2">
					Favorites
					<v-icon>mdi-heart</v-icon>
				</v-tab>
			</v-tabs>
			<div class="col-12 d-flex row">
				<v-tabs-items v-model="tab">
					<v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
						<span style="font-family:Merriweather; font-size:30px;">
						</span>
						<recipes-list></recipes-list>
					</v-tab-item>
				</v-tabs-items>
			</div>
		</div>
	</v-container>
</template>

<script>
import Ppm from "../components/Profile/Ppm";
import RecipesList from "../components/Profile/RecipesList";
import DeleteModal from "../components/Profile/DeleteModal.vue";
import AddRecipe from "../components/AddRecipe";

export default {
	name: "Profile",
	data() {
		return {
			ppm: 1630,
			tab: null,
			titles: ["My Recipes", "Favorite Recipes"]
		};
	},
	components: {
		RecipesList,
		Ppm,
		DeleteModal,
		AddRecipe
	}
};
</script>
<style>
.profile-page {
	padding-top: 90px;
	min-height: 85vh;
}
.profileAvatar {
	min-width: 150px !important;
	min-height: 150px !important;
}
</style>
