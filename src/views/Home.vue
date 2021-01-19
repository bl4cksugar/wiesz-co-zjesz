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
							Home cooking is made with healthier eating, but the
							obstacles may be the lack of time and cells
							financial, lack of inspiration and / or insufficient
							cooking knowledge. This application does the job
							combine classic cookbooks and diet guides. The
							application will give you the possibility of taking
							advantage of a wide, constantly developed by users
							of recipes but it will also provide basic assistance
							dietary knowledge needed to compose a complete diet.
							The main idea behind the app is promoting your home
							at home and this place making it more efficient,
							cheaper and less wasteful.
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
