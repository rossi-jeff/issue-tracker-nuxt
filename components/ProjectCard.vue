<template>
    <div :id="`project-${props.project.UUID}`" class="card">
        <h2>{{ props.project.Name }}</h2>
        <div>{{ props.project.Details }}</div>
    </div>
</template>

<script lang="ts" setup>
import { ProjectType } from '../types/project.type'

const props = defineProps<{ project: ProjectType }>()
</script>