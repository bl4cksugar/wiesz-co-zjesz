<template>
	<div>
		<div class="test d-flex">
			<v-container class="box" align="center" justify="center" d-flex>
				<v-row class="d-flex justify-end align-center">
					<registration> </registration
				></v-row>
			</v-container>
		</div>
		<div class="d-flex justify-center align-center flex-column">
			<span
				style="font-family:Tangerine; font-size:75px; margin-top:20px"
			>
				About Us</span
			>

			<div
				class="d-flex row text--secondary px-15 py-4 text-center justify-center headline text-uppercase"
				style="line-height: 30px; "
			>
				<div class="col-12 col-sm-6 d-flex justify-center align-center">
					<v-img
						lazy-src="https://picsum.photos/id/11/10/6"
						src="https://image.freepik.com/darmowe-zdjecie/widok-z-gory-pyszny-deser-czekoladowy_23-2148622318.jpg"
					></v-img>
				</div>
				<div class="col-12 col-sm-6 d-flex ">
					<span
						class="d-flex justify-center align-center"
						style="font-family:Montserrat; font-size:15px; "
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec egestas ligula ac sodales pulvinar. Curabitur
						velit nisi, laoreet et sodales vitae, vestibulum et
						velit. Nunc semper tellus sit amet tempor vehicula.
						Maecenas porta massa et sapien sollicitudin, non aliquam
						tortor sagittis. Sed in interdum erat. Donec rutrum quam
						nec orci iaculis, at blandit enim pulvinar. Vestibulum
						dapibus libero quis massa volutpat suscipit mollis at
						metus. Morbi tristique sem in eros euismod maximus.
						Fusce venenatis nec tellus eget mattis. Donec eleifend
						ante a sem laoreet semper. Morbi venenatis faucibus leo
						non accumsan. Nulla velit nisi, tincidunt in lacinia
						vitae, dictum at diam. Duis ut sapien pellentesque,
						porta elit ac, suscipit nibh. Proin ut elit quis sapien
						molestie suscipit et sit amet mauris. Cras tincidunt
						feugiat urna, vel vulputate ligula posuere et. Nam vel
						faucibus mi. Aliquam tempor vehicula justo a viverra.
						Curabitur sodales pretium lacinia. Duis tempor tellus ac
						nulla vestibulum, eu mattis nibh semper. Sed eu accumsan
						nisi.
					</span>
				</div>
			</div>
		</div>
		<recipes-list></recipes-list>
	</div>
</template>

<script>
import registration from "../components/registration.vue";
import RecipesList from "../components/Recipes/RecipesList.vue";

export default {
	name: "Home",
	data: () => ({
		includeFiles: true,
		enabled: false
	}),
	components: {
		registration,
		RecipesList
	}
};
</script>

<style>
.row {
	align-content: center;
	justify-content: center;
}

.box {
	width: 100vw;
	height: 100vh;
}

.title {
	font-weight: bold;
	margin-bottom: 15px;
}

.btn {
	margin-bottom: 50px;
}

.title {
	color: white;
}
.test {
	background: url("../assets/bg.jpg");
	background-size: cover;
}

.recipe {
	background: lightgrey;
	margin-top: 25px;
}
</style>
