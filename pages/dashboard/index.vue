<template>
    <div id="dashboard-content">
        <h1>Dashboard</h1>
        <div class="flex flex-wrap justify-between">
            <div class="dash-board-column">
                <DashBoardIssue v-for="issue of state.Sorted.new" :issue="issue" from="New" :draggable="false"
                    :key="issue.Id" />
                <div class="scroll-space"></div>
            </div>
            <div class="dash-board-column">
                <DashBoardIssue v-for="issue of state.Sorted.assigned" :issue="issue" from="Assigned" :draggable="false"
                    :key="issue.Id" />
                <div class="scroll-space"></div>
            </div>
            <div class="dash-board-column">
                <DashBoardIssue v-for="issue of state.Sorted.accepted" :issue="issue" from="Accepted" :draggable="false"
                    :key="issue.Id" />
                <div class="scroll-space"></div>
            </div>
            <div class="dash-board-column">
                <DashBoardIssue v-for="issue of state.Sorted.fixed" :issue="issue" from="Fixed" :draggable="false"
                    :key="issue.Id" />
                <div class="scroll-space"></div>
            </div>
        </div>
        <div class="scroll-column mt-4">
            <DashBoardIssue v-for="issue of state.Sorted.other" :issue="issue" from="Other" :draggable="false"
                :key="issue.Id" />
            <div class="scroll-space"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { apiUrl } from "../../utils/api-url";
import { IssueType } from "../../types/issue.type";
import { reactive, onMounted } from "vue";

let Issues: IssueType[] = reactive([]);
let Sorted: { [key: string]: IssueType[] } = reactive({
    new: [],
    assigned: [],
    accepted: [],
    fixed: [],
    other: [],
});
const state = reactive({ Issues, Sorted });

const loadData = async () => {
    const result = await fetch(`${apiUrl}/issue`);
    if (result.ok) state.Issues = await result.json();
    sortIssues();
};

const sortIssues = () => {
    for (const key in state.Sorted) state.Sorted[key] = [];
    for (const issue of state.Issues) {
        switch (issue.Status) {
            case "New":
                state.Sorted.new.push(issue);
                break;
            case "Assigned":
                state.Sorted.assigned.push(issue);
                break;
            case "Accepted":
                state.Sorted.accepted.push(issue);
                break;
            case "Fixed":
                state.Sorted.fixed.push(issue);
                break;
            default:
                state.Sorted.other.push(issue);
                break;
        }
    }
};

onMounted(() => loadData());
</script>

<style lang="postcss" scoped>
.scroll-column {
    @apply max-h-96 overflow-y-auto;
}

.dash-board-column {
    @apply w-[23%] scroll-column;
}

.scroll-space {
    @apply h-10;
}
</style>
