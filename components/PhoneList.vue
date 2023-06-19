<template>
	<div id="phone-list">
		<div class="list-header" v-if="props.phones.length > 0">
			<div class="w-16" v-if="props.showButtons"></div>
			<div class="w-48">Number</div>
			<div class="w-16">Type</div>
			<div class="w-16">Usage</div>
			<div class="w-16">Public</div>
			<div class="w-16" v-if="props.showButtons"></div>
		</div>
		<div
			v-for="phone of props.phones"
			:key="phone.UUID"
			class="flex flex-wrap justify-between mb-2 mx-2"
		>
			<div class="w-16" v-if="props.showButtons">
				<button @click="emit('editPhone', phone.UUID)">Edit</button>
			</div>
			<div class="w-48">{{ phone.Number }}</div>
			<div class="w-16">{{ phone.Type }}</div>
			<div class="w-16">{{ phone.Usage }}</div>
			<div class="w-16">{{ phone.Public }}</div>
			<div class="w-16 text-right" v-if="props.showButtons">
				<button @click="emit('deletePhone', phone.UUID)">Delete</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PhoneType } from '~/types/phone.type'

const props = defineProps<{ phones: PhoneType[]; showButtons: boolean }>()
const emit = defineEmits(['editPhone', 'deletePhone'])
</script>

<style lang="postcss"></style>
