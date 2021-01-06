<template>
	<div>
		<!-- <div class="test d-flex">
			<v-container class="box" align="center" justify="center" d-flex>
			</v-container>
		</div> -->

		<v-carousel hide-delimiters height="100vh">
			<v-carousel-item
				v-for="(item, i) in items"
				:key="i"
				:src="item.src"
			></v-carousel-item>
		</v-carousel>
		<div
			id="about"
			d-flex
			class="recipe col-12 text-center d-flex flex-column justify-center align-center"
		>
			<div
				class="col-12 col-md-8 d-flex justify-center align-center flex-column"
			>
				<span
					style="font-family:RaleWay; font-size:40px; margin-top:20px; margin-bottom:10px"
				>
					About Us
				</span>
				<v-divider width="200px"></v-divider>
				<div
					class="d-flex row text--secondary px-15 py-4 text-center justify-center headline "
					style="line-height: 30px; "
				>
					<div
						class="col-12 col-sm-6 d-flex justify-center align-center"
					>
						<img
							lazy-src="https://picsum.photos/id/11/10/6"
							src="../assets/bg.jpg"
							width="100%"
						/>
					</div>

					<div class="col-12 col-sm-6 d-flex ">
						<span
							class="d-flex justify-center align-center"
							style="font-family:Montserrat; font-size:15px; "
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Donec egestas ligula ac sodales pulvinar.
							Curabitur velit nisi, laoreet et sodales vitae,
							vestibulum et velit. Nunc semper tellus sit amet
							tempor vehicula. Maecenas porta massa et sapien
							sollicitudin, non aliquam tortor sagittis. Sed in
							interdum erat. Donec rutrum quam nec orci iaculis,
							at blandit enim pulvinar. Vestibulum dapibus libero
							quis massa volutpat suscipit mollis at metus. Morbi
							tristique sem in eros euismod maximus. Fusce
							venenatis nec tellus eget mattis. Donec eleifend
							ante a sem laoreet semper. Morbi venenatis faucibus
							leo non accumsan. Nulla velit nisi, tincidunt in
							lacinia vitae, dictum at diam. Duis ut sapien
							pellentesque, porta elit ac, suscipit nibh.
						</span>
					</div>
				</div>
			</div>
		</div>
		<recipes-list></recipes-list>
	</div>
</template>

<script>
import RecipesList from "../components/Recipes/RecipesList.vue";

export default {
	name: "Home",
	data: () => ({
		inset: false,
		includeFiles: true,
		enabled: false,
		items: [
			{
				src: require("../assets/bg7.jpg")
			},
			{
				src: require("../assets/bg8.jpg")
			},
			{
				src: require("../assets/bg9.jpg")
			},
			{
				src: require("../assets/blueberry.jpg")
			}
		]
	}),

	components: {
		RecipesList
	}
};
</script>

<style>
#about {
}
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

.test {
	background: url("../assets/bg7.jpg");
	background-size: cover;
}

.recipe {
	margin-top: 25px;
}
</style>
