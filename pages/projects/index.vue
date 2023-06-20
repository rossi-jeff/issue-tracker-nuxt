<template>
	<div id="projects-content">
		<Head>
			<Title>Issue Tracker | Projects</Title>
		</Head>
		<div class="flex flex-wrap mb-2">
			<h1>Projects</h1>
			<button @click="newProject" v-if="session.signedIn" class="ml-4">
				New Project
			</button>
		</div>
		<ProjectCard
			v-for="project of state.Paginated"
			:key="project.Id"
			:project="project"
			@edit-project="editProject"
		/>
		<PaginationControls
			:count="state.count"
			:offset="state.offset"
			:limit="state.limit"
			@limit-changed="limitChanged"
			@page-changed="pageChanged"
			v-if="show"
		/>
		<ProjectDialogs
			:editor="editor"
			ref="overlay"
			@create-project="createProject"
			@update-project="updateProject"
		/>
		<SignInAlert v-if="!session.signedIn" />
	</div>
</template>

<script lang="ts" setup>
import { apiUrl } from '../../utils/api-url'
import { ProjectType } from '../../types/project.type'
import { reactive, onMounted } from 'vue'
import { buildHeaders } from '../../utils/build-headers'

let Projects: ProjectType[] = reactive([])
let Paginated: ProjectType[] = reactive([])
const state = reactive({ Projects, Paginated, count: 0, limit: 10, offset: 0 })
const show = ref(false)
const overlay = ref()
const editor: { [key: string]: ProjectType } = reactive({ new: {}, edit: {} })
const session = useUserSessionStore()

const loadData = async () => {
	const result = await fetch(`${apiUrl}/project`)
	if (result.ok) state.Projects = await result.json()
	state.count = state.Projects.length
	setPaginated()
}

const setPaginated = () => {
	state.Paginated = state.Projects.slice(
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

const newProject = () => {
	overlay.value.showNew()
}

const editProject = (uuid: string) => {
	const project = state.Projects.find((p) => p.UUID == uuid)
	editor.edit = project ? clone(project) : {}
	overlay.value.showEdit()
}

const createProject = async () => {
	const { Name, Details } = editor.new
	const result = await fetch(`${apiUrl}/project`, {
		method: 'POST',
		body: JSON.stringify({ Name, Details }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const project: ProjectType = await result.json()
		state.Projects.push(project)
		state.count = state.Projects.length
		show.value = false
		overlay.value.hideNew()
		editor.new = {}
		setTimeout(() => {
			setPaginated()
		}, 25)
	}
}

const updateProject = async () => {
	const { Name, Details, UUID } = editor.edit
	const result = await fetch(`${apiUrl}/project/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify({ Name, Details }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const project: ProjectType = await result.json()
		const idx = state.Projects.findIndex((p) => p.UUID == UUID)
		if (idx != -1) {
			state.Projects[idx] = project
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
