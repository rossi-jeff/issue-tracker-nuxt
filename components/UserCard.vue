<template>
    <div :id="`user-${props.user.UUID}`" class="card">
        <h2>{{ props.user.Credentials ? props.user.Credentials.Username : 'N/A' }}</h2>
        <div>{{ getFullName(props.user) }}</div>
    </div>
</template>

<script lang="ts" setup>
import { UserType } from '../types/user.type'

const props = defineProps<{ user: UserType }>()
</script>