<template>
  <div class="modal-overlay" id="phone-email-overlay">
    <!-- new phone -->
    <div class="modal-fit" id="new-phone-dialog">
      <h2>New Phone</h2>
      <PhoneForm name="new" :phone="props.phone" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideNewPhone">Cancel</button>
        <button @click="emit('createPhone')">Create Phone</button>
      </div>
    </div>
    <!-- edit phone -->
    <div class="modal-fit" id="edit-phone-dialog">
      <h2>Edit Phone</h2>
      <PhoneForm name="edit" :phone="props.phone" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideEditPhone">Cancel</button>
        <button @click="emit('updatePhone')">Update Phone</button>
      </div>
    </div>
    <!-- new email -->
    <div class="modal-fit" id="new-email-dialog">
      <h2>New Email</h2>
      <EmailForm name="new" :email="props.email" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideNewEmail">Cancel</button>
        <button @click="emit('createEmail')">Create Email</button>
      </div>
    </div>
    <!-- edit email -->
    <div class="modal-fit" id="edit-email-dialog">
      <h2>Edit Email</h2>
      <EmailForm name="new" :email="props.email" />
      <div class="flex flex-wrap justify-between">
        <button @click="hideEditEmail">Cancel</button>
        <button @click="emit('updateEmail')">Update Email</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EmailType } from "~/types/email.type";
import { PhoneType } from "~/types/phone.type";

const props = defineProps<{ phone: PhoneType; email: EmailType }>();
const emit = defineEmits([
  "createPhone",
  "createEmail",
  "updatePhone",
  "updateEmail",
]);

const showOverlay = () => {
  const overlay = document.getElementById("phone-email-overlay");
  if (overlay) overlay.classList.add("open");
};

const hideOverlay = () => {
  const overlay = document.getElementById("phone-email-overlay");
  if (overlay) overlay.classList.remove("open");
};

const showNewPhone = () => {
  hideAll();
  showOverlay();
  const dialog = document.getElementById("new-phone-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideNewPhone = () => {
  const dialog = document.getElementById("new-phone-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const showEditPhone = () => {
  hideAll();
  showOverlay();
  const dialog = document.getElementById("edit-phone-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideEditPhone = () => {
  const dialog = document.getElementById("edit-phone-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const showNewEmail = () => {
  hideAll();
  showOverlay();
  const dialog = document.getElementById("new-email-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideNewEmail = () => {
  const dialog = document.getElementById("new-email-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const showEditEmail = () => {
  hideAll();
  showOverlay();
  const dialog = document.getElementById("edit-email-dialog");
  if (dialog) dialog.classList.add("open");
};

const hideEditEmail = () => {
  const dialog = document.getElementById("edit-email-dialog");
  if (dialog) dialog.classList.remove("open");
  hideOverlay();
};

const hideAll = () => {
  hideEditEmail();
  hideEditPhone();
  hideNewEmail();
  hideNewPhone();
};

defineExpose({
  showNewEmail,
  showNewPhone,
  showEditEmail,
  showEditPhone,
  hideNewPhone,
  hideNewEmail,
  hideEditEmail,
  hideEditPhone,
});
</script>
