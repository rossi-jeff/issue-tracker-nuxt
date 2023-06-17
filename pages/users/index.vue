<template>
  <div id="users-content">
    <h1>Users</h1>
    <NuxtLink to="/users/new" v-if="session.signedIn">New User</NuxtLink>
    <UserCard v-for="user of state.Paginated" :key="user.Id" :user="user" />
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
import { UserType } from "../../types/user.type";
import { reactive, onMounted } from "vue";

let Users: UserType[] = reactive([]);
let Paginated: UserType[] = reactive([]);
const state = reactive({ Users, Paginated, count: 0, limit: 10, offset: 0 });
const show = ref(false);
const session = useUserSessionStore();

const loadData = async () => {
  const result = await fetch(`${apiUrl}/user`);
  if (result.ok) state.Users = await result.json();
  state.count = state.Users.length;
  setPaginated();
};

const setPaginated = () => {
  state.Paginated = state.Users.slice(state.offset, state.offset + state.limit);
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
