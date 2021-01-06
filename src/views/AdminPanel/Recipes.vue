<template>
	<v-container class="box mx-0" fluid fill-height>
		<v-col
			sm="2"
			style="min-height:100vh; background:#272727 "
			class="d-flex justify-center align-center"
		>
			<side-menu></side-menu>
		</v-col>
		<v-col sm="10">
			<v-card>
				<v-data-table
					:headers="headers"
					:items="users"
					:search="search"
					:options.sync="options"
					:server-items-length="totalSurnames"
					:loading="loading"
					class="elevation-1"
				>
					<template v-slot:top>
						<v-toolbar flat color="white">
							<v-toolbar-title>Recipes</v-toolbar-title>

							<v-divider class="mx-4" inset vertical></v-divider>

							<v-spacer></v-spacer>
							<v-text-field
								v-model="search"
								append-icon="fas fa-search"
								label="Search"
								single-line
								hide-details
							></v-text-field>

							<v-dialog v-model="dialog" max-width="500px">
								<v-card>
									<v-card-title>
										<span class="headline">{{
											formTitle
										}}</span>
									</v-card-title>

									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field
														v-model="
															editedItem.user_id
														"
														label="User Id"
													></v-text-field>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>

									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="blue darken-1"
											text
											@click="close"
											>Cancel</v-btn
										>
										<v-btn
											color="blue darken-1"
											text
											@click="save"
											>Save</v-btn
										>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
						<v-alert v-if="alert" :type="alert.type">{{
							alert.content
						}}</v-alert>
					</template>

					<template v-slot:item.action="{ item }">
						<v-btn
							class="mx-2"
							small
							depressed
							fab
							dark
							color="green"
							@click="editItem(item)"
						>
							<v-icon dark small>mdi-pencil</v-icon>
						</v-btn>
						<v-btn
							class="mx-2"
							small
							depressed
							fab
							dark
							color="red"
							@click="deleteItem(item)"
						>
							<v-icon dark small>mdi-delete</v-icon>
						</v-btn>
					</template>
					<template v-slot:no-data>NO DATA</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import SideMenu from "../../components/SideMenu";
export default {
	data() {
		return {
			dialog: false,
			dialogDelete: false,
			SideMenusearch: "",

			headers: [
				{
					text: "ID",
					align: "left",
					sortable: false,
					value: "id"
				},

				{ text: "title" },
				{ text: "description" },
				{ text: "calories" },
				{ text: "time" },
				{ text: "integrient" },
				{ text: "user", value: "user_id" },
				{ text: "action", value: "action", sortable: false }
			],
			recipes: [],
			editedIndex: -1,
			editedItem: {
				name: "",
				surname: 0,
				date: 0,
				mail: 0,
				boolean: false
			},
			defaultItem: {
				name: "",
				surname: 0,
				date: 0,
				mail: 0,
				boolean: false
			},

			loading: false,
			users: [],
			item: []
		};
	},
	components: { SideMenu },
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},

	created() {
		this.initialize();
	},

	methods: {
		initialize() {
			this.desserts = [
				{
					name: "Frozen Yogurt",
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0
				},
				{
					name: "Ice cream sandwich",
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3
				},
				{
					name: "Eclair",
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0
				},
				{
					name: "Cupcake",
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3
				},
				{
					name: "Gingerbread",
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9
				},
				{
					name: "Jelly bean",
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0
				},
				{
					name: "Lollipop",
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0
				},
				{
					name: "Honeycomb",
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5
				},
				{
					name: "Donut",
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9
				},
				{
					name: "KitKat",
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7
				}
			];
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		}

		// editItem(item) {
		// 	this.editedIndex = this.recipes.indexOf(item);
		// 	this.editedItem = Object.assign({}, item);
		// 	this.dialog = true;
		// },

		// async deleteItem(item) {
		// 	const index = this.recipes.indexOf(item);
		// 	confirm("Are you sure you want to delete this item?") &&
		// 		this.families.splice(index, 1);
		// 	let result = await axios.post("/auth/recipes/delete", {
		// 		id: item.id
		// 	});
		// },

		// close() {
		// 	this.dialog = false;
		// 	setTimeout(() => {
		// 		this.editedItem = Object.assign({}, this.defaultItem);
		// 		this.editedIndex = -1;
		// 	}, 300);
		// }
	}
};
</script>

<style scoped></style>
