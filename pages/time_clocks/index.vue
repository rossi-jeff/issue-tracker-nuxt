<template>
	<div id="time-clocks-content">
		<h1>Time Clocks</h1>
		<button @click="newTimeClock" v-if="session.signedIn">
			New Time Clock
		</button>
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
			@edit-time-clock="editTimeClock"
		/>
		<PaginationControls
			:count="state.count"
			:offset="state.offset"
			:limit="state.limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
			v-if="show"
		/>
		<TimeClockDialogs
			:editor="editor"
			:users="state.Users"
			:issues="state.Issues"
			:projects="state.Projects"
			ref="overlay"
			@create-time-clock="createTimeClock"
			@update-time-clock="updateTimeClock"
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
const overlay = ref()
const editor: { [key: string]: TimeClockType } = reactive({
	new: { Start: {}, End: {} },
	edit: { Start: {}, End: {} },
})
const session = useUserSessionStore()

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

const newTimeClock = () => {
	overlay.value.showNew()
}

const editTimeClock = (uuid: string) => {
	const timeClock = state.TimeClocks.find((t) => t.UUID == uuid)
	editor.edit = timeClock ? clone(timeClock) : { Start: {}, End: {} }
	overlay.value.showEdit()
}

const createTimeClock = async () => {
	const payload = RemoveBlanks(editor.new)
	const result = await fetch(`${apiUrl}/timeclock`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const timeClock = await result.json()
		state.TimeClocks.push(timeClock)
		state.count = state.TimeClocks.length
		show.value = false
		overlay.value.hideNew()
		setTimeout(() => {
			setPaginated()
		}, 25)
	}
}

const updateTimeClock = async () => {
	const { Start, End, UUID, ...rest } = editor.edit
	const sanitized = RemoveBlanks(rest, true)
	const payload = { ...sanitized }
	if (Start.Date && Start.Time) payload.Start = Start
	if (End.Date && End.Time) payload.End = End
	const result = await fetch(`${apiUrl}/timeclock/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify(payload),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const timeClock = await result.json()
		const idx = state.TimeClocks.findIndex((t) => t.UUID == UUID)
		if (idx != -1) {
			state.TimeClocks[idx] = timeClock
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
