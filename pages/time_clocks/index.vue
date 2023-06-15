<template>
  <div id="time-clocks-content">
    <h1>Time Clocks</h1>
    <TimeClockCard
      v-for="timeClock of state.TimeClocks"
      :key="timeClock.Id"
      :timeClock="timeClock"
    />
  </div>
</template>

<script lang="ts" setup>
import { apiUrl } from "../../utils/api-url";
import { IssueType } from "../../types/issue.type";
import { UserType } from "../../types/user.type";
import { ProjectType } from "../../types/project.type";
import { TimeClockType } from "../../types/time-clock.type";
import { reactive, onMounted } from "vue";

let Issues: IssueType[] = reactive([]);
let Users: UserType[] = reactive([]);
let Projects: ProjectType[] = reactive([]);
let TimeClocks: TimeClockType[] = reactive([]);
const state = reactive({ Issues, Users, Projects, TimeClocks });

const loadData = async () => {
  const issueReq = fetch(`${apiUrl}/issue`);
  const userReq = fetch(`${apiUrl}/user`);
  const projReq = fetch(`${apiUrl}/project`);
  const clockReq = fetch(`${apiUrl}/timeclock`);
  const [issuesRes, usersRes, projRes, clockRes] = await Promise.all([
    issueReq,
    userReq,
    projReq,
    clockReq,
  ]);
  let issues: IssueType[] = [],
    users: UserType[] = [],
    projects: ProjectType[] = [],
    timeClocks: TimeClockType[] = [];
  if (issuesRes.ok) issues = await issuesRes.json();
  if (usersRes.ok) users = await usersRes.json();
  if (projRes.ok) projects = await projRes.json();
  if (clockRes.ok) timeClocks = await clockRes.json();
  state.Issues = issues;
  state.Users = users;
  state.Projects = projects;
  state.TimeClocks = timeClocks;
  console.log({ state });
};

onMounted(() => loadData());
</script>
