<template>
	<div id="user-form">
		<div class="flex flex-wrap justify-between" v-if="props.user.Credentials">
			<div>
				<label for="user-name">Username</label>
				<input
					type="text"
					name="user-name"
					v-model="props.user.Credentials.Username"
				/>
			</div>
			<div v-if="props.showPass">
				<label for="pass-word">Password</label>
				<input
					type="password"
					name="pass-word"
					v-model="props.user.Credentials.Password"
				/>
			</div>
		</div>
		<div class="flex flex-wrap justify-between" v-if="props.user.Name">
			<div>
				<label for="name-first">First</label>
				<input type="text" name="name-first" v-model="props.user.Name.First" />
			</div>
			<div>
				<label for="name-middle">Middle</label>
				<input
					type="text"
					name="name-middle"
					v-model="props.user.Name.Middle"
				/>
			</div>
			<div>
				<label for="name-last">Last</label>
				<input type="text" name="name-last" v-model="props.user.Name.Last" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { UserType } from '~/types/user.type'

const props = defineProps<{ user: UserType; showPass: boolean }>()
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold block;
}
</style>
