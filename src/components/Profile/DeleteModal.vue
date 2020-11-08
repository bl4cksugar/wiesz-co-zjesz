<template>
	<div class="d-flex flex-column justify-center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn text color="error" large v-bind="attrs" v-on="on">
					<v-icon>mdi-close</v-icon> DELETE ACCOUNT
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">Are you sure?</span>
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						No
					</v-btn>
					<v-btn color="error" text @click="dialog = false">
						Yes
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

//
<script>
export default {
	data() {
		return {
			dialog: false
		};
	},
	methods: {}
};
</script>
<style scoped></style>
