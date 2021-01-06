<template
	><v-dialog v-model="dialog" max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				v-bind="attrs"
				v-on="on"
				color="indigo"
				fab
				bottom
				dark
				fixed
				right
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Add Recipe</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<h3>Title of recipe</h3>
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
						class="center"
					>
						<v-text-field
							v-model="title"
							:rules="[rules.max]"
							counter="25"
							hint="Type title of recipe"
						></v-text-field>
						<h3>Method of preparing</h3>

						<v-textarea
							v-model="description"
							:rules="[rules.required]"
							label="describe the preparation method"
							solo
							required
							name="input-7-4"
						></v-textarea>
						<h3>Upload picture</h3>

						<label>
							File
							<input type="file" @change="onFileChanged" />
						</label>

						<v-btn @click="onUpload" :disable="!valid" small
							>send</v-btn
						>

						<br />
						<h3>List of ingredients</h3>

						<!-- <v-autocomplete
							flat
							chips
							v-model="pickedIngridients"
							multiple
							outlined
							label="Find ingridients"
							item-text="name"
							item-value="name"
							:items="ingridients"
						>
							<template v-slot:selection="data">
								<v-chip
									v-bind="data.attrs"
									:input-value="data.selected"
									close
									@click="data.select"
									@click:close="remove(data.item)"
								>
									<v-avatar left>
										<v-img :src="data.item.imgUrl"></v-img>
									</v-avatar>
									{{ data.item.name }}
								</v-chip>
							</template>
							<template v-slot:item="data">
								<template v-if="typeof data.item !== 'object'">
									<v-list-item-content
										v-text="data.item"
									></v-list-item-content>
								</template>
								<template v-else>
									<v-list-item-avatar>
										<img :src="data.item.imgUrl" />
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											v-html="data.item.name"
										></v-list-item-title>
									</v-list-item-content>
								</template>
							</template>
						</v-autocomplete> -->
						<div class="d-flex flex-column flex-md-row">
							<div class="col-12 col-md-6 py-0 px-0 pr-md-2">
								<h3>Calories</h3>
								<v-text-field
									v-model="calories"
									flat
									prepend-inner-icon="mdi-calculator"
									:rules="[rules.number]"
									type="number"
									min="0"
									suffix="kcal"
									outlined
								></v-text-field>
							</div>
							<div class="col-12 col-md-6 py-0 px-0 pl-md-2">
								<h3>Preparing time</h3>
								<v-text-field
									v-model="time"
									prepend-inner-icon="mdi-clock-time-eight"
									flat
									:rules="[rules.number]"
									type="number"
									min="0"
									suffix="minutes"
									label="Preparing Time"
									outlined
								></v-text-field>
							</div>
						</div>
					</v-form>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">
					Close
				</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import validation from "../mixins/validation";
export default {
	data() {
		return {
			title: "",
			description: "",
			calories: "",
			time: "",
			valid: null,
			ingridients: [
				{ name: "egg", imgUrl: "https://picsum.photos/200" },
				{ name: "milk", imgUrl: "https://picsum.photos/200" },
				{ name: "chicken", imgUrl: "https://picsum.photos/200" },
				{ name: "pork", imgUrl: "https://picsum.photos/200" },
				{ name: "bread", imgUrl: "https://picsum.photos/200" },
				{ name: "salat", imgUrl: "https://picsum.photos/200" }
			],
			pickedIngridients: [],
			dialog: false
		};
	},
	mixins: [validation],
	methods: {
		remove(item) {
			console.log("test", item);
			const index = this.pickedIngridients.indexOf(item.name);
			console.log(index);
			if (index >= 0) this.pickedIngridients.splice(index, 1);
		},
		onFileChanged(e) {
			console.log(e);
		},
		onUpload(e) {
			console.log(e);
		}
	}
};
</script>
