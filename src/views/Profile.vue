<template>
	<div
		class="profile-page col-12 d-flex justify-center align-center flex-column"
	>
		<span style="font-family:Merriweather; font-size:60px; ">
			Profile
		</span>

		<div
			class="d-flex col-12 mt-5  text--secondary text-center justify-center"
		>
			<div
				class="col-6 col-sm-6 d-flex justify-center align-center flex-column"
			>
				<span style="font-family:Tangerine; font-size:75px;">
					John Doe
				</span>

				<ppm></ppm>
			</div>

			<div class="d-flex col-6 flex-column justify-center align-center">
				<span style="font-family:Merriweather; font-size:30px;">
					My Recipes
				</span>
				<myrecipe></myrecipe>
				<span style="font-family:Merriweather; font-size:30px;">
					Favorite Recipes
				</span>
				<favrecipe></favrecipe>
			</div>
		</div>
	</div>
</template>

<script>
import ppm from "../components/Profile/ppm";
import myrecipe from "../components/Profile/Recipes/my_recipes";
import favrecipe from "../components/Profile/Recipes/fav_recipes.vue";

export default {
	name: "Profile",
	data: () => ({}),

	components: {
		myrecipe,
		favrecipe,
		ppm
	}
};
</script>
<style>
.profile-page {
	min-height: 85vh;
}
</style>
