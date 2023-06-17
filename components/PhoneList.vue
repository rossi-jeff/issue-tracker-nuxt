<template>
  <div id="phone-list">
    <div
      v-for="phone of props.phones"
      :key="phone.UUID"
      class="flex flex-wrap justify-between"
    >
      <button v-if="props.showButtons" @click="emit('editPhone', phone.UUID)">
        Edit
      </button>
      <div>{{ phone.Number }}</div>
      <div>{{ phone.Type }}</div>
      <div>{{ phone.Usage }}</div>
      <div>{{ phone.Public }}</div>
      <button v-if="props.showButtons" @click="emit('deletePhone', phone.UUID)">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhoneType } from "~/types/phone.type";

const props = defineProps<{ phones: PhoneType[]; showButtons: boolean }>();
const emit = defineEmits(["editPhone", "deletePhone"]);
</script>
