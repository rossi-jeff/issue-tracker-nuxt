<template>
    <div id="users-content">
        <h1>Users</h1>
    </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { UserType } from '../../types/user.type'
import { reactive, onMounted } from 'vue'

let Users: UserType[] = reactive([])
const state = reactive({ Users })

const loadData = async () => {
    const result = await fetch(`${apiUrl}/user`);
    if (result.ok) state.Users = await result.json()
}

onMounted(() => loadData())
</script>