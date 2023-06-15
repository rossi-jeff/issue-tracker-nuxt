<template>
  <div :id="`${props.name}-project-form`">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" v-model="props.project.Name" />
    </div>
    <div>
      <label for="details">Details</label>
      <textarea
        name="details"
        v-model="props.project.Details"
        class="h-20"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProjectType } from "~/types/project.type";

const props = defineProps<{ project: ProjectType; name: string }>();
</script>

<style lang="postcss" scoped>
input,
textarea {
  @apply border border-black rounded px-2 py-1 w-full;
}
</style>
