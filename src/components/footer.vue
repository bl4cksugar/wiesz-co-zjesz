<template>
	<v-footer padless>
		<v-col
			class="text-center"
			cols="12"
			style="height:300px; background:#1e1e20; color:#ffffff;"
		>
			{{ new Date().getFullYear() }} —
			<strong>Natalia Jarzmicka </strong>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	name: "b-footer"
};
</script>

<style scoped></style>
