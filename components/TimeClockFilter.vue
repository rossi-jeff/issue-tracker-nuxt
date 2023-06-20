<template>
	<div id="time-clock-filter" class="card">
		<div class="flex flex-wrap">
			<button @click="toggle">Filter</button>
		</div>
		<div class="filter-content" id="time-clock-filter-content">
			<div class="flex flex-wrap justify-between">
				<div>
					<label for="user-id">User</label>
					<select
						name="user-id"
						v-model="filter.UserId"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option v-for="u of props.users" :key="u.UUID" :value="u.Id">
							{{ getFullName(u) }}
						</option>
					</select>
				</div>
				<div>
					<label for="project-id">Project</label>
					<select
						name="project-id"
						v-model="filter.ProjectId"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option v-for="p of props.projects" :key="p.UUID" :value="p.Id">
							{{ p.Name }}
						</option>
					</select>
				</div>
				<div>
					<label for="issue-id">Issue</label>
					<select
						name="issue-id"
						@change="filterChanged"
						v-model="filter.IssueId"
					>
						<option value="">- select -</option>
						<option v-for="i of props.issues" :key="i.UUID" :value="i.Id">
							{{ i.SequenceNumber }} | {{ i.Title }}
						</option>
					</select>
				</div>
			</div>
			<div class="flex flex-wrap justify-between">
				<div>
					<label for="start-date">Start Date</label>
					<input
						type="date"
						name="start-date"
						@change="filterChanged"
						v-model="filter.StartDate"
					/>
				</div>
				<div>
					<label for="end-date">End Date</label>
					<input
						type="date"
						name="end-date"
						@change="filterChanged"
						v-model="filter.EndDate"
					/>
				</div>
				<div>
					<label>&nbsp;</label>
					<button @click="clearFilters">Clear Filters</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { IssueType } from '../types/issue.type'
import { ProjectType } from '../types/project.type'
import { UserType } from '../types/user.type'

const props = defineProps<{
	users: UserType[]
	projects: ProjectType[]
	issues: IssueType[]
}>()
const emit = defineEmits(['filterTimeClocks'])
const filter: { [key: string]: string } = reactive({
	UserId: '',
	ProjectId: '',
	IssueId: '',
	StartDate: '',
	EndDate: '',
})

const filterChanged = () => {
	const url = new URL('/timeclock', apiUrl)
	for (const key in filter) {
		if (filter[key] != '') url.searchParams.append(key, filter[key])
	}
	emit('filterTimeClocks', url.href)
}

const clearFilters = () => {
	for (const key in filter) filter[key] = ''
	filterChanged()
}

const toggle = () => {
	const el = document.getElementById('time-clock-filter-content')
	if (el) el.classList.toggle('open')
}
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold block;
}
</style>
