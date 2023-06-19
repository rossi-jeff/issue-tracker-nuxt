<template>
	<div :id="`issue-${props.issue.UUID}`" class="card">
		<div class="flex flex-wrap">
			<button @click="editIssue" v-if="session.signedIn" class="mr-4">
				Edit
			</button>
			<h2>{{ props.issue.SequenceNumber }}</h2>
		</div>
		<div>{{ props.issue.Title }}</div>
		<div>
			<strong>Project</strong>
			{{ props.issue.Project ? props.issue.Project.Name : 'N/A' }}
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<strong>Priority</strong>
				{{ props.issue.Priority }}
			</div>
			<div>
				<strong>Status</strong>
				{{ props.issue.Status }}
			</div>
			<div>
				<strong>Type</strong>
				{{ props.issue.Type }}
			</div>
			<div>
				<strong>Complexity</strong>
				{{ props.issue.Complexity }}
			</div>
		</div>
		<div>{{ props.issue.Details }}</div>
		<div class="flex flex-wrap justify-between">
			<div class="w-64">
				<strong>Created</strong>
				{{ props.issue.Created }}
			</div>
			<div class="w-72">
				<strong>Author</strong>
				{{ props.issue.Author ? getFullName(props.issue.Author) : 'N/A' }}
			</div>
			<div class="w-80">
				<strong>Assigned To</strong>
				{{
					props.issue.AssignedTo ? getFullName(props.issue.AssignedTo) : 'N/A'
				}}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { IssueType } from '../types/issue.type'

const props = defineProps<{ issue: IssueType }>()
const emit = defineEmits(['editIssue'])
const session = useUserSessionStore()

const editIssue = () => {
	const { UUID } = props.issue
	emit('editIssue', UUID)
}
</script>
