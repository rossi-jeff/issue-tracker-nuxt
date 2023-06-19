<template>
	<div :id="`${props.name}-project-form`">
		<div>
			<label for="name">Name</label>
			<input
				type="text"
				name="name"
				v-model="props.project.Name"
				class="w-full"
			/>
		</div>
		<div>
			<label for="details">Details</label>
			<textarea
				name="details"
				v-model="props.project.Details"
				class="h-20 w-full"
			></textarea>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ProjectType } from '~/types/project.type'

const props = defineProps<{ project: ProjectType; name: string }>()
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold block;
}
</style>
