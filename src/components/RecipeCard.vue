<template
	><v-dialog v-model="dialog" max-width="600px">
		<v-card>
			<v-card-title>
				<span class="headline">{title}}</span>
			</v-card-title>
		</v-card>
	</v-dialog>
</template>
<script>
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
	}
};
</script>
