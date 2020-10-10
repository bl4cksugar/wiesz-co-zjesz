<template>
	<div
		class="d-flex justify-center align-center flex-column"
		style="margin-bottom:100px; margin-top:100px;"
	>
		<span style="font-family:Tangerine; font-size:75px; margin-top:20px; ">
			Profile</span
		>

		<div
			class="d-flex row text--secondary px-15 py-4 text-center justify-center headline text-uppercase"
			style="line-height: 30px; "
		>
			<div class="col-12 col-sm-6 d-flex justify-center align-center">
				<v-img
					src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
				></v-img>
			</div>
			<div class="col-12 col-sm-6 d-flex ">
				<div
					class="d-flex justify-center align-center"
					style="font-family:Montserrat; font-size:15px; "
				>
					<v-text style="margin-right:55px"
						><h2>John Smith</h2></v-text
					>
					<v-btn style="margin:5px"> Your Recipes</v-btn>
					<v-btn style="margin:5px"> Favorite Recipes</v-btn>
					<v-btn style="margin:5px"> Your PPM</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
