<template>
    <div id="issues-content">
        <h1>Issues</h1>
    </div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { IssueType } from '../../types/issue.type'
import { UserType } from '../../types/user.type'
import { ProjectType } from '../../types/project.type'
import { reactive, onMounted } from 'vue'

let Issues: IssueType[] = reactive([])
let Users: UserType[] = reactive([])
let Projects: ProjectType[] = reactive([])
const state = reactive({ Issues, Users, Projects })

const loadData = async () => {
    const issueReq = fetch(`${apiUrl}/issue`);
    const userReq = fetch(`${apiUrl}/user`);
    const projReq = fetch(`${apiUrl}/project`)
    const [issuesRes, usersRes, projRes] = await Promise.all([issueReq, userReq, projReq]);
    let issues: IssueType[] = [],
        users: UserType[] = [],
        projects: ProjectType[] = [];
    if (issuesRes.ok) issues = await issuesRes.json();
    if (usersRes.ok) users = await usersRes.json();
    if (projRes.ok) projects = await projRes.json()
    state.Issues = issues
    state.Users = users
    state.Projects = projects
    console.log({ state })
}

onMounted(() => loadData())
</script>