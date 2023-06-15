<template>
	<div class="my-2" :id="`${props.name}-form`">
		<div>
			<label for="user-name">Username</label>
			<input
				type="text"
				name="user-name"
				v-model="props.credentials.Username"
			/>
		</div>
		<div>
			<label for="pass-word">Password</label>
			<input
				type="password"
				name="pass-word"
				v-model="props.credentials.Password"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CredentialsType } from '../types/credentials.type'

const props = defineProps<{ credentials: CredentialsType; name: string }>()
</script>

<style lang="postcss" scoped>
input {
	@apply border border-black rounded px-2 py-1 w-full;
}
</style>
