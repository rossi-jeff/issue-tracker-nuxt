<template>
	<div id="email-list">
		<div class="list-header" v-if="props.emails.length > 0">
			<div class="w-16" v-if="props.showButtons"></div>
			<div class="w-48">Address</div>
			<div class="w-16">Usage</div>
			<div class="w-16">Public</div>
			<div class="w-16" v-if="props.showButtons"></div>
		</div>
		<div
			v-for="email of props.emails"
			:key="email.UUID"
			class="flex flex-wrap justify-between mb-2 mx-2"
		>
			<div class="w-16" v-if="props.showButtons">
				<button @click="emit('editEmail', email.UUID)">Edit</button>
			</div>
			<div class="w-48">{{ email.Address }}</div>
			<div class="w-16">{{ email.Usage }}</div>
			<div class="w-16">{{ email.Public }}</div>
			<div class="w-16 text-right" v-if="props.showButtons">
				<button @click="emit('deleteEmail', email.UUID)">Delete</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { EmailType } from '~/types/email.type'

const props = defineProps<{ emails: EmailType[]; showButtons: boolean }>()
const emit = defineEmits(['editEmail', 'deleteEmail'])
</script>
