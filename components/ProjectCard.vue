<template>
  <div :id="`project-${props.project.UUID}`" class="card">
    <button @click="editProject" v-if="session.signedIn">Edit</button>
    <h2>{{ props.project.Name }}</h2>
    <div>{{ props.project.Details }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ProjectType } from "../types/project.type";

const props = defineProps<{ project: ProjectType }>();
const emit = defineEmits(["editProject"]);
const session = useUserSessionStore();

const editProject = () => {
  emit("editProject", props.project.UUID);
};
</script>
