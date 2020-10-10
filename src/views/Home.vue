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

		<div d-flex class="recipe">
			<span style="font-family:Tangerine; font-size:75px; ">
				Recipe
			</span>
			<br />
			<span
				class="text--secondary text-uppercase"
				style="font-family:Montserrat; font-size:15px; "
			>
				Find your favorite
			</span>

			<v-text-field
				d-flex
				v-model="recipe"
				prepend-inner-icon="mdi-magnify"
				flat
				hide-details
				label="Search"
				outlined
			></v-text-field>

			<div class=" d-flex justify-center col-12 ">
				<v-col class="d-flex justify-center align-center"
					><v-btn outlined large fab color="indigo">
						<v-icon>mdi-arrow-left</v-icon>
					</v-btn>
				</v-col>
				<v-col sm="6">
					<v-row>
						<v-col
							v-for="n in 9"
							:key="n"
							class="d-flex child-flex"
							cols="4"
						>
							<v-img
								:src="
									`https://picsum.photos/500/300?image=${n *
										5 +
										10}`
								"
								:lazy-src="
									`https://picsum.photos/10/6?image=${n * 5 +
										10}`
								"
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
						</v-col>
					</v-row>
				</v-col>
				<v-col class="d-flex justify-center align-center">
					<v-btn class="ma-2" outlined large fab color="indigo">
						<v-icon>mdi-arrow-right</v-icon>
					</v-btn>
				</v-col>
			</div>
		</div>
	</div>
</template>

<script>
import registration from "../components/registration";

export default {
	name: "Home",
	data() {
		return {};
	},
	components: {
		registration
	}
};
</script>

<style>
.v-input__slot {
	width: 30%;
	min-width: 300px;
	align-self: center;
	margin-top: 20px;
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
