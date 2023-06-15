<template>
  <div id="projects-content">
    <h1>Projects</h1>
    <ProjectCard
      v-for="project of state.Paginated"
      :key="project.Id"
      :project="project"
    />
    <PaginationControls
      :count="state.count"
      :offset="state.offset"
      :limit="state.limit"
      @limit-changed="limitChanged"
      @page-changed="pageChanged"
      v-if="show"
    />
  </div>
</template>

<script lang="ts" setup>
import { apiUrl } from "../../utils/api-url";
import { ProjectType } from "../../types/project.type";
import { reactive, onMounted } from "vue";

let Projects: ProjectType[] = reactive([]);
let Paginated: ProjectType[] = reactive([]);
const state = reactive({ Projects, Paginated, count: 0, limit: 10, offset: 0 });
const show = ref(false);

const loadData = async () => {
  const result = await fetch(`${apiUrl}/project`);
  if (result.ok) state.Projects = await result.json();
  state.count = state.Projects.length;
  setPaginated();
};

const setPaginated = () => {
  state.Paginated = state.Projects.slice(
    state.offset,
    state.offset + state.limit
  );
  show.value = true;
};

const pageChanged = (page: number) => {
  state.offset = (page - 1) * state.limit;
  show.value = false;
  setTimeout(() => {
    setPaginated();
  }, 25);
};

const limitChanged = (perPage: number) => {
  state.limit = perPage;
  state.offset = 0;
  show.value = false;
  setTimeout(() => {
    setPaginated();
  }, 25);
};

onMounted(() => loadData());
</script>
