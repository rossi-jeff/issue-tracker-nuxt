<template>
    <div id="projects-content">
        <h1>Projects</h1>
    </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { ProjectType } from '../../types/project.type'
import { reactive, onMounted } from 'vue'

let Projects: ProjectType[] = reactive([])
const state = reactive({ Projects })

const loadData = async () => {
    const result = await fetch(`${apiUrl}/project`)
    if (result.ok) state.Projects = await result.json()
}

onMounted(() => loadData())
</script>