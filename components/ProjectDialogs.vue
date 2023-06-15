<template>
  <div class="modal-overlay" id="project-overlay">
    <!-- new project -->
    <div class="modal-40p" id="new-project-dialog">
      <h2>New Project</h2>
      <ProjectForm name="new" :project="editor.new" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideNew">Cancel</button>
        <button @click="emit('createProject')">Create Project</button>
      </div>
    </div>
    <!-- edit project-->
    <div class="modal-40p" id="edit-project-dialog">
      <h2>Edit Project</h2>
      <ProjectForm name="edit" :project="editor.edit" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideEdit">Cancel</button>
        <button @click="emit('updateProject')">Update Project</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProjectType } from "../types/project.type";

const props = defineProps<{ editor: { [key: string]: ProjectType } }>();
const emit = defineEmits(["createProject", "updateProject"]);

const showOverlay = () => {
  const overlay = document.getElementById("project-overlay");
  if (overlay) overlay.classList.add("open");
};

const hideOverlay = () => {
  const overlay = document.getElementById("project-overlay");
  if (overlay) overlay.classList.remove("open");
};

const showNew = () => {
  hideEdit();
  showOverlay();
  const dialog = document.getElementById("new-project-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideNew = () => {
  const dialog = document.getElementById("new-project-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const showEdit = () => {
  hideNew();
  showOverlay();
  const dialog = document.getElementById("edit-project-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideEdit = () => {
  const dialog = document.getElementById("edit-project-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

defineExpose({ showNew, showEdit, hideNew, hideEdit });
</script>
