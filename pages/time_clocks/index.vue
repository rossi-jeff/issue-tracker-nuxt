<template>
	<div id="time-clocks-content">
		<h1>Time Clocks</h1>
		<TimeClockFilter
			:users="state.Users"
			:projects="state.Projects"
			:issues="state.Issues"
			@filter-time-clocks="filterTimeClocks"
		/>
		<TimeClockCard
			v-for="timeClock of state.Paginated"
			:key="timeClock.Id"
			:timeClock="timeClock"
		/>
		<PaginationControls
			:count="state.count"
			:offset="state.offset"
			:limit="state.limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
			v-if="show"
		/>
	</div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { IssueType } from '../../types/issue.type'
import { UserType } from '../../types/user.type'
import { ProjectType } from '../../types/project.type'
import { TimeClockType } from '../../types/time-clock.type'
import { reactive, onMounted } from 'vue'

let Issues: IssueType[] = reactive([])
let Users: UserType[] = reactive([])
let Projects: ProjectType[] = reactive([])
let TimeClocks: TimeClockType[] = reactive([])
let Paginated: TimeClockType[] = reactive([])
const state = reactive({
	Issues,
	Users,
	Projects,
	TimeClocks,
	Paginated,
	count: 0,
	limit: 10,
	offset: 0,
})
const show = ref(false)

const loadData = async () => {
	const issueReq = fetch(`${apiUrl}/issue`)
	const userReq = fetch(`${apiUrl}/user`)
	const projReq = fetch(`${apiUrl}/project`)
	const clockReq = fetch(`${apiUrl}/timeclock`)
	const [issuesRes, usersRes, projRes, clockRes] = await Promise.all([
		issueReq,
		userReq,
		projReq,
		clockReq,
	])
	let issues: IssueType[] = [],
		users: UserType[] = [],
		projects: ProjectType[] = [],
		timeClocks: TimeClockType[] = []
	if (issuesRes.ok) issues = await issuesRes.json()
	if (usersRes.ok) users = await usersRes.json()
	if (projRes.ok) projects = await projRes.json()
	if (clockRes.ok) timeClocks = await clockRes.json()
	state.Issues = issues
	state.Users = users
	state.Projects = projects
	state.TimeClocks = timeClocks
	state.count = timeClocks.length
	setPaginated()
}

const setPaginated = () => {
	state.Paginated = state.TimeClocks.slice(
		state.offset,
		state.offset + state.limit
	)
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

const filterTimeClocks = async (url: string) => {
	const result = await fetch(url)
	if (result.ok) {
		state.TimeClocks = await result.json()
		state.count = state.TimeClocks.length
		state.offset = 0
		show.value = false
		setTimeout(() => {
			setPaginated()
		}, 25)
	}
}

onMounted(() => loadData())
</script>
