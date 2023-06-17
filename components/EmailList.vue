<template>
  <div id="email-list">
    <div
      v-for="email of props.emails"
      :key="email.UUID"
      class="flex flex-wrap justify-between"
    >
      <button @click="emit('editEmail', email.UUID)">Edit</button>
      <div>{{ email.Address }}</div>
      <div>{{ email.Usage }}</div>
      <div>{{ email.Public }}</div>
      <button @click="emit('deleteEmail', email.UUID)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EmailType } from "~/types/email.type";

const props = defineProps<{ emails: EmailType[]; showButtons: boolean }>();
const emit = defineEmits(["editEmail", "deleteEmail"]);
</script>
