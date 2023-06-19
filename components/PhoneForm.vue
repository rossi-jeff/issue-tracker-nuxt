<template>
	<div :id="`${props.name}-phone-form`">
		<div>
			<label for="number" class="block">Number</label>
			<input type="tel" name="number" v-model="props.phone.Number" />
		</div>
		<div>
			<label for="type" class="block">Type</label>
			<select name="type" v-model="props.phone.Type">
				<option v-for="(t, i) of PhoneTypeArray" :key="i" :value="t">
					{{ t }}
				</option>
			</select>
		</div>
		<div>
			<label for="usage" class="block">Usage</label>
			<select name="usage" v-model="props.phone.Usage">
				<option v-for="(u, i) of UsageArray" :key="i" :value="u">
					{{ u }}
				</option>
			</select>
		</div>
		<div>
			<input
				type="checkbox"
				name="public"
				:checked="props.phone.Public"
				v-model="props.phone.Public"
			/>
			<label for="public" class="inline-block ml-2">Public</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PhoneType } from '~/types/phone.type'
import { UsageArray, PhoneTypeArray } from '../types/array.types'

const props = defineProps<{ phone: PhoneType; name: string }>()
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold;
}
</style>
