<template>
    <div :id="`${props.from}_${props.issue.UUID}`" :draggable="props.draggable" class="card">
        <button @click="toggle(`issue-content-${props.issue.UUID}`)">{{ props.issue.SequenceNumber }}</button>
        <div :id="`issue-content-${props.issue.UUID}`" class="issue-content">
            <button @click="toggle(`description-${props.issue.UUID}`)">Description</button>
            <div :id="`description-${props.issue.UUID}`" class="issue-description">
                {{ props.issue.Details }}
            </div>
            <button @click="toggle(`details-${props.issue.UUID}`)">Details</button>
            <div :id="`details-${props.issue.UUID}`" class="issue-details">
                <div>
                    <strong>Project</strong>
                    {{ props.issue.Project ? props.issue.Project.Name : "N/A" }}
                </div>
                <div>
                    <strong>Priority</strong>
                    {{ props.issue.Priority }}
                </div>
                <div>
                    <strong>Status</strong>
                    {{ props.issue.Status }}
                </div>
                <div>
                    <strong>Type</strong>
                    {{ props.issue.Type }}
                </div>
                <div>
                    <strong>Complexity</strong>
                    {{ props.issue.Complexity }}
                </div>
                <div>
                    <strong>Created</strong>
                    {{ props.issue.Created }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { IssueType } from "../types/issue.type";

const toggle = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.classList.toggle('open')
}

const props = defineProps<{
    issue: IssueType;
    from: string;
    draggable: boolean;
}>();
</script>

<style lang="postcss" scoped>
.issue-content,
.issue-description,
.issue-details {
    @apply my-2 px-2 hidden transition;
}

.open {
    @apply block;
}

button {
    @apply block text-left px-2 py-1 my-1 bg-slate-200 rounded w-full;
}
</style>
