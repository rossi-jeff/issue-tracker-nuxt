<template>
	<div :id="`user-${props.user.UUID}`" class="card">
		<div class="flex flex-wrap">
			<NuxtLink
				:to="`/users/${props.user.UUID}`"
				v-if="session.signedIn"
				class="mr-4"
				>Edit</NuxtLink
			>
			<h2>
				{{ props.user.Credentials ? props.user.Credentials.Username : 'N/A' }}
			</h2>
		</div>
		<div>{{ getFullName(props.user) }}</div>
	</div>
</template>

<script lang="ts" setup>
import { UserType } from '../types/user.type'

const props = defineProps<{ user: UserType }>()
const session = useUserSessionStore()
</script>
