<template>
	<div :id="`${props.name}-issue-form`">
		<div>
			<label for="project-id">Project</label>
			<select name="project-id" v-model="props.issue.ProjectId" class="w-full">
				<option value="">- select -</option>
				<option v-for="p of props.projects" :key="p.UUID" :value="p.Id">
					{{ p.Name }}
				</option>
			</select>
		</div>
		<div>
			<label for="title">Title</label>
			<input
				type="text"
				name="title"
				v-model="props.issue.Title"
				class="w-full"
			/>
		</div>
		<div>
			<label for="details">Details</label>
			<textarea
				name="details"
				v-model="props.issue.Details"
				class="h-20 w-full"
			></textarea>
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<label for="priority">Priority</label>
				<select name="priority" v-model="props.issue.Priority">
					<option value="">- select -</option>
					<option v-for="(p, i) of PriorityArray" :key="i" :value="p">
						{{ p }}
					</option>
				</select>
			</div>
			<div>
				<label for="status">Status</label>
				<select name="status" v-model="props.issue.Status">
					<option value="">- select -</option>
					<option v-for="(s, i) of StatusArray" :key="i" :value="s">
						{{ s }}
					</option>
				</select>
			</div>
			<div>
				<label for="type">Type</label>
				<select name="type" v-model="props.issue.Type">
					<option value="">- select -</option>
					<option v-for="(t, i) of IssueTypeArray" :key="i" :value="t">
						{{ t }}
					</option>
				</select>
			</div>
			<div>
				<label for="complexity">Complexity</label>
				<select name="complexity" v-model="props.issue.Complexity">
					<option value="">- select -</option>
					<option v-for="(c, i) of ComplexityArray" :key="i" :value="c">
						{{ c }}
					</option>
				</select>
			</div>
		</div>
		<div>
			<label for="assigned-to">Assigned</label>
			<select
				name="assigned-to"
				v-model="props.issue.AssignedToId"
				class="w-full"
			>
				<option value="">- select -</option>
				<option v-for="u of props.users" :key="u.UUID" :value="u.Id">
					{{ getFullName(u) }}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ProjectType } from '../types/project.type'
import { UserType } from '../types/user.type'
import {
	ComplexityArray,
	IssueTypeArray,
	PriorityArray,
	StatusArray,
} from '../types/array.types'
import { IssueType } from '~/types/issue.type'

const props = defineProps<{
	projects: ProjectType[]
	users: UserType[]
	issue: IssueType
	name: string
}>()
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold block;
}
</style>
