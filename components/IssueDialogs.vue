<template>
  <div class="modal-overlay" id="issue-overlay">
    <!--new issue-->
    <div class="modal-60p" id="new-issue-dialog">
      <h2>New Issue</h2>
      <IssueForm
        name="new"
        :issue="editor.new"
        :projects="props.projects"
        :users="props.users"
      />
      <div class="flex flex-wrap justify-between">
        <button @click="hideNew">Cancel</button>
        <button @click="emit('createIssue')">Create Issue</button>
      </div>
    </div>
    <!--edit issue-->
    <div class="modal-60p" id="edit-issue-dialog">
      <h2>Edit Issue</h2>
      <IssueForm
        name="edit"
        :issue="editor.edit"
        :projects="props.projects"
        :users="props.users"
      />
      <div class="flex flex-wrap justify-between">
        <button @click="hideEdit">Cancel</button>
        <button @click="emit('updateIssue')">Update Issue</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProjectType } from "../types/project.type";
import { IssueType } from "../types/issue.type";
import { UserType } from "../types/user.type";

const props = defineProps<{
  editor: { [key: string]: IssueType };
  projects: ProjectType[];
  users: UserType[];
}>();
const emit = defineEmits(["createIssue", "updateIssue"]);

const showOverlay = () => {
  const overlay = document.getElementById("issue-overlay");
  if (overlay) overlay.classList.add("open");
};

const hideOverlay = () => {
  const overlay = document.getElementById("issue-overlay");
  if (overlay) overlay.classList.remove("open");
};

const showNew = () => {
  hideEdit();
  showOverlay();
  const dialog = document.getElementById("new-issue-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideNew = () => {
  const dialog = document.getElementById("new-issue-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const showEdit = () => {
  hideNew();
  showOverlay();
  const dialog = document.getElementById("edit-issue-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideEdit = () => {
  const dialog = document.getElementById("edit-issue-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

defineExpose({ showNew, showEdit, hideNew, hideEdit });
</script>
