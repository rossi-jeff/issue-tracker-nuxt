<template>
	<div id="issue-filter" class="card">
		<div class="flex flex-wrap">
			<button @click="toggle">Filter</button>
		</div>
		<div class="filter-content" id="issue-filter-content">
			<div class="flex flex-wrap justify-between">
				<div>
					<label for="priority">Priority</label>
					<select
						name="priority"
						v-model="filter.Priority"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option v-for="(p, i) of PriorityArray" :key="i" :value="p">
							{{ p }}
						</option>
					</select>
				</div>
				<div>
					<label for="status">Status</label>
					<select name="status" v-model="filter.Status" @change="filterChanged">
						<option value="">- select -</option>
						<option v-for="(s, i) of StatusArray" :key="i" :value="s">
							{{ s }}
						</option>
					</select>
				</div>
				<div>
					<label for="type">Type</label>
					<select name="type" v-model="filter.Type" @change="filterChanged">
						<option value="">- select -</option>
						<option v-for="(t, i) of IssueTypeArray" :key="i" :value="t">
							{{ t }}
						</option>
					</select>
				</div>
				<div>
					<label for="complexity">Complexity</label>
					<select
						name="complexity"
						v-model="filter.Complexity"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option v-for="(c, i) of ComplexityArray" :key="i" :value="c">
							{{ c }}
						</option>
					</select>
				</div>
				<div>
					<label for="author">Author</label>
					<select
						name="author"
						v-model="filter.AuthorId"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option
							v-for="u of props.users"
							:key="`author-${u.Id}`"
							:value="u.Id"
						>
							{{ getFullName(u) }}
						</option>
					</select>
				</div>
				<div>
					<label for="assigned-to">Assigned To</label>
					<select
						name="assigned-to"
						v-model="filter.AssignedToId"
						@change="filterChanged"
					>
						<option value="">- select -</option>
						<option
							v-for="u of props.users"
							:key="`assigned-${u.Id}`"
							:value="u.Id"
						>
							{{ getFullName(u) }}
						</option>
					</select>
				</div>
				<button @click="clearFilters">Clear Filters</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { UserType } from '../types/user.type'
import {
	ComplexityArray,
	IssueTypeArray,
	PriorityArray,
	StatusArray,
} from '../types/array.types'

const props = defineProps<{ users: UserType[] }>()
const filter: { [key: string]: string } = reactive({
	Priority: '',
	Status: '',
	Type: '',
	Complexity: '',
	AuthorId: '',
	AssignedToId: '',
})
const emit = defineEmits(['filterIssues'])

const filterChanged = () => {
	const url = new URL('/issue', apiUrl)
	for (const key in filter) {
		if (filter[key] != '') url.searchParams.append(key, filter[key])
	}
	emit('filterIssues', url.href)
}

const clearFilters = () => {
	for (const key in filter) filter[key] = ''
	filterChanged()
}

const toggle = () => {
	const el = document.getElementById('issue-filter-content')
	if (el) el.classList.toggle('open')
}
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold block;
}
</style>
