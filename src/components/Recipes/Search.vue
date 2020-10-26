<template>
	<div class="col-12 d-flex justify-center align-center flex-column">
		<span
			class="text--secondary text-uppercase"
			style="font-family:Montserrat; font-size:15px; "
		>
			Find your favorite
		</span>
		<div class="col-12 col-md-6">
			<v-text-field
				v-model="searchQuery"
				class="mb-5"
				prepend-inner-icon="mdi-magnify"
				flat
				hide-details
				label="Search"
				outlined
			></v-text-field>
			<div class="d-flex flex-column flex-md-row">
				<div class="col-12 col-md-6 py-0 px-0 pr-md-2">
					<v-text-field
						v-model="calories"
						class="mb-5"
						prepend-inner-icon="mdi-calculator"
						flat
						type="number"
						hide-details
						min="0"
						suffix="kcal"
						label="Max calories"
						outlined
					></v-text-field>
				</div>
				<div class="col-12 col-md-6 py-0 px-0 pl-md-2">
					<v-text-field
						v-model="time"
						class="mb-5"
						prepend-inner-icon="mdi-clock-time-eight"
						flat
						type="number"
						hide-details
						min="0"
						suffix="minutes"
						label="Preparing Time"
						outlined
					></v-text-field>
				</div>
			</div>
			<v-autocomplete
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
			</v-autocomplete>
			<v-btn
				@click="findRecipe"
				rounded
				width="200px"
				:disabled="!isFormFilled"
				>Search</v-btn
			>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			searchQuery: "",
			calories: "",
			time: "",
			ingridients: [
				{ name: "egg", imgUrl: "https://picsum.photos/200" },
				{ name: "milk", imgUrl: "https://picsum.photos/200" },
				{ name: "chicken", imgUrl: "https://picsum.photos/200" },
				{ name: "pork", imgUrl: "https://picsum.photos/200" },
				{ name: "bread", imgUrl: "https://picsum.photos/200" },
				{ name: "salat", imgUrl: "https://picsum.photos/200" }
			],
			pickedIngridients: []
		};
	},
	methods: {
		remove(item) {
			console.log("test", item);
			const index = this.pickedIngridients.indexOf(item.name);
			console.log(index);
			if (index >= 0) this.pickedIngridients.splice(index, 1);
		},
		findRecipe() {
			this.$emit("dispatchFindRecipe", {
				searchQuery: this.searchQuery,
				calories: this.calories,
				time: this.time,
				pickedIngridients: this.pickedIngridients
			});
		}
	},
	computed: {
		isFormFilled() {
			return (
				this.searchQuery.length > 0 ||
				this.calories > 0 ||
				this.time > 0 ||
				this.pickedIngridients.length > 0
			);
		}
	}
};
</script>
