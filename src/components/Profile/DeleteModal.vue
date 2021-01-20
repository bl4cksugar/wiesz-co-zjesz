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
					<v-btn color="error" text @click="deleteAcc">
						Yes
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			dialog: false
		};
	},
	computed: {
		...mapGetters(["isAdmin", "user", "getUserId"])
	},
	methods: {
		...mapActions(["destroySession"]),
		async deleteAcc() {
			const result = await this.$user.deleteUser(this.getUserId);
			console.log(result);
			if (result.success) {
				this.dialog = false;
				this.$router.push({ name: "Home" });
				if (!this.isAdmin) this.destroySession();
			}
		}
	}
};
</script>
<style scoped></style>
