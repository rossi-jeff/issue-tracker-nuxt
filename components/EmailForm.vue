<template>
  <div :id="`${props.name}-email-form`">
    <div>
      <label for="address" class="block">Address</label>
      <input type="email" name="address" v-model="props.email.Address" />
    </div>
    <div>
      <label for="usage" class="block">Usage</label>
      <select name="usage" v-model="props.email.Usage">
        <option v-for="(u, i) of UsageArray" :key="i" :value="u">
          {{ u }}
        </option>
      </select>
    </div>
    <div>
      <input
        type="checkbox"
        name="public"
        :checked="props.email.Public"
        v-model="props.email.Public"
      />
      <label for="public" class="inline-block ml-2">Public</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EmailType } from "~/types/email.type";
import { UsageArray } from "../types/array.types";

const props = defineProps<{ email: EmailType; name: string }>();
</script>

<style lang="postcss" scoped>
input,
select {
  @apply border border-black rounded px-2 py-1;
}
label {
  @apply font-bold;
}
</style>
