<template>
	<div id="issues-content">
		<Head>
			<Title>Issue Tracker | Issues</Title>
		</Head>
		<div class="flex flex-wrap mb-2">
			<h1>Issues</h1>
			<button @click="newIssue" v-if="session.signedIn" class="ml-4">
				New Issue
			</button>
		</div>
		<IssueFilter :users="state.Users" @filter-issues="filterIssues" />
		<IssueCard
			v-for="issue of state.Paginated"
			:key="issue.UUID"
			:issue="issue"
			@edit-issue="editIssue"
		/>
		<PaginationControls
			:count="state.count"
			:offset="state.offset"
			:limit="state.limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
			v-if="show"
		/>
		<IssueDialogs
			:editor="editor"
			:projects="state.Projects"
			:users="state.Users"
			ref="overlay"
			@create-issue="createIssue"
			@update-issue="updateIssue"
		/>
		<SignInAlert v-if="!session.signedIn" />
	</div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { IssueType } from '../../types/issue.type'
import { UserType } from '../../types/user.type'
import { ProjectType } from '../../types/project.type'
import { reactive, onMounted } from 'vue'
import { RemoveBlanks } from '../../utils/remove-blanks'

let Issues: IssueType[] = reactive([])
let Users: UserType[] = reactive([])
let Projects: ProjectType[] = reactive([])
let Paginated: IssueType[] = reactive([])
const state = reactive({
	Issues,
	Users,
	Projects,
	Paginated,
	count: 0,
	limit: 10,
	offset: 0,
})
const show = ref(false)
const overlay = ref()
const editor: { [key: string]: IssueType } = reactive({ new: {}, edit: {} })
const session = useUserSessionStore()

const loadData = async () => {
	const issueReq = fetch(`${apiUrl}/issue`)
	const userReq = fetch(`${apiUrl}/user`)
	const projReq = fetch(`${apiUrl}/project`)
	const [issuesRes, usersRes, projRes] = await Promise.all([
		issueReq,
		userReq,
		projReq,
	])
	let issues: IssueType[] = [],
		users: UserType[] = [],
		projects: ProjectType[] = []
	if (issuesRes.ok) issues = await issuesRes.json()
	if (usersRes.ok) users = await usersRes.json()
	if (projRes.ok) projects = await projRes.json()
	state.Issues = issues
	state.Users = users
	state.Projects = projects
	state.count = issues.length
	setPaginated()
}

const setPaginated = () => {
	state.Paginated = state.Issues.slice(state.offset, state.offset + state.limit)
	show.value = true
}

const pageChanged = (page: number) => {
	state.offset = (page - 1) * state.limit
	show.value = false
	setTimeout(() => {
		setPaginated()
	}, 25)
}

const limitChanged = (perPage: number) => {
	state.limit = perPage
	state.offset = 0
	show.value = false
	setTimeout(() => {
		setPaginated()
	}, 25)
}

const filterIssues = async (ev: any) => {
	const result = await fetch(ev)
	if (result.ok) {
		state.Issues = await result.json()
		state.count = state.Issues.length
		state.offset = 0
		show.value = false
		setTimeout(() => {
			setPaginated()
		}, 25)
	}
}

const newIssue = () => {
	overlay.value.showNew()
}

const editIssue = (uuid: string) => {
	const issue = state.Issues.find((i) => i.UUID == uuid)
	editor.edit = issue ? clone(issue) : {}
	overlay.value.showEdit()
}

const createIssue = async () => {
	const payload = RemoveBlanks(editor.new, true)
	const result = await fetch(`${apiUrl}/issue`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const issue = await result.json()
		state.Issues.push(issue)
		state.count = state.Issues.length
		show.value = false
		overlay.value.hideNew()
		setTimeout(() => {
			setPaginated()
		}, 25)
	}
}

const updateIssue = async () => {
	const { UUID, ...rest } = editor.edit
	const payload = RemoveBlanks(rest, true)
	if (!UUID) return
	const result = await fetch(`${apiUrl}/issue/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const issue = await result.json()
		const idx = state.Issues.findIndex((i) => i.UUID == UUID)
		if (idx != -1) {
			state.Issues[idx] = issue
			show.value = false
			overlay.value.hideEdit()
			setTimeout(() => {
				setPaginated()
			}, 25)
		}
	}
}

onMounted(() => loadData())
</script>
