<template>
  <div class="modal-overlay" id="dashboard-overlay">
    <div class="modal-fit" id="other-status-dialog">
      <h3>Select Status</h3>
      <div v-for="(s, i) of OtherStatusArray" :key="i">
        <input
          type="radio"
          name="status"
          :id="`status-${s}`"
          :value="s"
          v-model="state.selected"
        />
        <label :for="`status-${s}`">{{ s }}</label>
      </div>
      <button @click="setStatus">Set Status</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OtherStatusArray } from "../types/array.types";

const emit = defineEmits(["setStatus"]);
const state = reactive({ selected: "" });

const setStatus = () => {
  if (!state.selected) return;
  emit("setStatus", state.selected);
};

const showOverlay = () => {
  const overlay = document.getElementById("dashboard-overlay");
  if (overlay) overlay.classList.add("open");
};

const hideOverlay = () => {
  const overlay = document.getElementById("dashboard-overlay");
  if (overlay) overlay.classList.remove("open");
};

const showOther = () => {
  showOverlay();
  const dialog = document.getElementById("other-status-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideOther = () => {
  const dialog = document.getElementById("other-status-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

defineExpose({ showOther, hideOther });
</script>
