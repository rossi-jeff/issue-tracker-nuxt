<template>
  <div id="dashboard-content">
    <h1>Dashboard</h1>
    <div class="flex flex-wrap justify-between">
      <div
        class="dash-board-column"
        id="column-New"
        @dragover="dragOver"
        @dragenter="dragEnter"
        @drop="drop"
      >
        <DashBoardIssue
          v-for="issue of state.Sorted.new"
          :issue="issue"
          from="New"
          :draggable="session.signedIn"
          :key="issue.Id"
          @drag-start="dragStart"
        />
        <div class="scroll-space"></div>
      </div>
      <div
        class="dash-board-column"
        id="column-Assigned"
        @dragover="dragOver"
        @dragenter="dragEnter"
        @drop="drop"
      >
        <DashBoardIssue
          v-for="issue of state.Sorted.assigned"
          :issue="issue"
          from="Assigned"
          :draggable="session.signedIn"
          :key="issue.Id"
          @drag-start="dragStart"
        />
        <div class="scroll-space"></div>
      </div>
      <div
        class="dash-board-column"
        id="column-Accepted"
        @dragover="dragOver"
        @dragenter="dragEnter"
        @drop="drop"
      >
        <DashBoardIssue
          v-for="issue of state.Sorted.accepted"
          :issue="issue"
          from="Accepted"
          :draggable="session.signedIn"
          :key="issue.Id"
          @drag-start="dragStart"
        />
        <div class="scroll-space"></div>
      </div>
      <div
        class="dash-board-column"
        id="column-Fixed"
        @dragover="dragOver"
        @dragenter="dragEnter"
        @drop="drop"
      >
        <DashBoardIssue
          v-for="issue of state.Sorted.fixed"
          :issue="issue"
          from="Fixed"
          :draggable="session.signedIn"
          :key="issue.Id"
          @drag-start="dragStart"
        />
        <div class="scroll-space"></div>
      </div>
    </div>
    <div
      class="scroll-column mt-4"
      id="column-Other"
      @dragover="dragOver"
      @dragenter="dragEnter"
      @drop="drop"
    >
      <DashBoardIssue
        v-for="issue of state.Sorted.other"
        :issue="issue"
        from="Other"
        :draggable="session.signedIn"
        :key="issue.Id"
        @drag-start="dragStart"
      />
      <div class="scroll-space"></div>
    </div>
    <DashboardDialogs ref="overlay" @set-status="setOtherStatus" />
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
let Temp = reactive({ uuid: "", from: "", to: "", selected: "" });
const state = reactive({ Issues, Sorted, Temp });
const session = useUserSessionStore();
const overlay = ref();

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

const dragStart = (event: any) => {
  if (event.target) event.dataTransfer.setData("text", event.target.id);
  else if (event.detail)
    event.detail.dataTransfer.setData("text", event.detail.target.id);
};

const dragOver = (event: any) => {
  event.preventDefault();
};

const dragEnter = (event: any) => {
  let { target } = event;
  if (target) {
    while (
      !(
        target.classList.contains("dash-board-column") ||
        target.classList.contains("scroll-column")
      )
    ) {
      target = target.parentElement;
    }
    target.classList.add("over");
    setTimeout(() => {
      target.classList.remove("over");
    }, 500);
  }
};

const drop = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  const data = event.dataTransfer.getData("text");
  const [from, uuid] = data.split("_");
  let to = "";
  let { target } = event;
  if (target) {
    while (
      !(
        target.classList.contains("dash-board-column") ||
        target.classList.contains("scroll-column")
      )
    ) {
      target = target.parentElement;
    }
    to = target.id.split("-")[1];
  }
  if (!uuid || !from || !to) return;
  moveIssue(uuid, from, to);
  setIssueStatus(uuid, from, to);
};

const moveIssue = (uuid: string, from: string, to: string) => {
  let issue: IssueType | undefined, idx: number;
  switch (from) {
    case "New":
      idx = state.Sorted.new.findIndex((i) => i.UUID == uuid);
      if (idx != -1) {
        issue = state.Sorted.new[idx];
        state.Sorted.new.splice(idx, 1);
      }
      break;
    case "Assigned":
      idx = state.Sorted.assigned.findIndex((i) => i.UUID == uuid);
      if (idx != -1) {
        issue = state.Sorted.assigned[idx];
        state.Sorted.assigned.splice(idx, 1);
      }
      break;
    case "Accepted":
      idx = state.Sorted.accepted.findIndex((i) => i.UUID == uuid);
      if (idx != -1) {
        issue = state.Sorted.accepted[idx];
        state.Sorted.accepted.splice(idx, 1);
      }
      break;
    case "Fixed":
      idx = state.Sorted.fixed.findIndex((i) => i.UUID == uuid);
      if (idx != -1) {
        issue = state.Sorted.fixed[idx];
        state.Sorted.fixed.splice(idx, 1);
      }
      break;
    case "Other":
      idx = state.Sorted.other.findIndex((i) => i.UUID == uuid);
      if (idx != -1) {
        issue = state.Sorted.other[idx];
        state.Sorted.other.splice(idx, 1);
      }
      break;
  }
  if (issue) {
    switch (to) {
      case "New":
        state.Sorted.new.unshift(issue);
        break;
      case "Assigned":
        state.Sorted.assigned.unshift(issue);
        break;
      case "Accepted":
        state.Sorted.accepted.unshift(issue);
        break;
      case "Fixed":
        state.Sorted.fixed.unshift(issue);
        break;
      case "Other":
        state.Sorted.other.unshift(issue);
        break;
    }
  }
};

const setIssueStatus = (uuid: string, from: string, to: string) => {
  let issue = findIssue(uuid, to);
  if (!issue) issue = findIssue(uuid, from);
  if (issue) {
    if (to == "Other") {
      selectOtherType(uuid, from, to);
    } else {
      issue.Status = to;
      updateIssue(issue);
    }
  } else console.log("not found");
};

const updateIssue = async (issue: IssueType) => {
  const { UUID, Status } = issue;
  const result = await fetch(`${apiUrl}/issue/${UUID}`, {
    method: "PATCH",
    body: JSON.stringify({ Status }),
    headers: buildHeaders(session),
  });
  if (result.ok) {
    await result.json();
  } else console.log(result);
};

const selectOtherType = (uuid: string, from: string, to: string) => {
  state.Temp = { uuid, from, to, selected: "" };
  overlay.value.showOther();
};

const setOtherStatus = (status: string) => {
  let issue = findIssue(state.Temp.uuid, state.Temp.to);
  if (!issue) issue = findIssue(state.Temp.uuid, state.Temp.from);
  if (issue) {
    issue.Status = status;
    updateIssue(issue);
    state.Temp = { uuid: "", from: "", to: "", selected: "" };
    overlay.value.hideOther();
  }
};

const findIssue = (uuid: string, key: string) => {
  let issue: IssueType | undefined;
  switch (key) {
    case "New":
      issue = state.Sorted.new.find((i) => i.UUID == uuid);
      break;
    case "Assigned":
      issue = state.Sorted.assigned.find((i) => i.UUID == uuid);
      break;
    case "Accepted":
      issue = state.Sorted.accepted.find((i) => i.UUID == uuid);
      break;
    case "Fixed":
      issue = state.Sorted.fixed.find((i) => i.UUID == uuid);
      break;
    case "Other":
      issue = state.Sorted.other.find((i) => i.UUID == uuid);
      break;
  }
  return issue;
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
