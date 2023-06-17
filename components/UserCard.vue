<template>
  <div :id="`user-${props.user.UUID}`" class="card">
    <NuxtLink :to="`/users/${props.user.UUID}`" v-if="session.signedIn"
      >Edit</NuxtLink
    >
    <h2>
      {{ props.user.Credentials ? props.user.Credentials.Username : "N/A" }}
    </h2>
    <div>{{ getFullName(props.user) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { UserType } from "../types/user.type";

const props = defineProps<{ user: UserType }>();
const session = useUserSessionStore();
</script>
