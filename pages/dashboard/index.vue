<template>
    <div id="dashboard-content">
        <h1>Dashboard</h1>
    </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { IssueType } from '../../types/issue.type'
import { reactive, onMounted } from 'vue'

let Issues: IssueType[] = reactive([])
const state = reactive({ Issues })

const loadData = async () => {
    const result = await fetch(`${apiUrl}/issue`);
    if (result.ok) state.Issues = await result.json()
}

onMounted(() => loadData())
</script>