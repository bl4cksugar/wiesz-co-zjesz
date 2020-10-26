<template>
	<v-footer padless dark class="text-center">
		<v-card-text>
			<v-btn
				v-for="icon in icons"
				:key="icon"
				class="mx-4 white--text"
				icon
			>
				<v-icon size="24px">
					{{ icon }}
				</v-icon>
			</v-btn>
		</v-card-text>

		<v-card-text class="white--text pt-0">
			© 2020 wieszcozjesz.pl Wszystkie prawa zastrzeżone Kopiowanie i
			rozpowszechnianie bez zgody wieszcozjesz zabronione
		</v-card-text>

		<v-divider></v-divider>
		<v-card-text class="white--text">
			<strong>autor: Natalia Jarzmicka </strong>
		</v-card-text>
	</v-footer>
</template>

<script>
export default {
	name: "b-footer",

	data: () => ({
		icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
	})
};
</script>

<style scoped></style>
