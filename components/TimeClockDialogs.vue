<template>
	<div class="modal-overlay" id="time-clock-overlay">
		<!--new time clock-->
		<div class="modal-50p" id="new-time-clock-dialog">
			<h2>Time Clock</h2>
			<TimeClockForm
				name="new"
				:time-clock="props.editor.new"
				:issues="props.issues"
				:projects="props.projects"
				:users="props.users"
			/>
			<div class="flex flex-wrap justify-between mt-2">
				<button @click="hideNew">Cancel</button>
				<button @click="emit('createTimeClock')">Create Time Clock</button>
			</div>
		</div>
		<!--edit time clock-->
		<div class="modal-50p" id="edit-time-clock-dialog">
			<h2>Time Clock</h2>
			<TimeClockForm
				name="edit"
				:time-clock="props.editor.edit"
				:issues="props.issues"
				:projects="props.projects"
				:users="props.users"
			/>
			<div class="flex flex-wrap justify-between mt-2">
				<button @click="hideEdit">Cancel</button>
				<button @click="emit('updateTimeClock')">Update Time Clock</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { IssueType } from '../types/issue.type'
import { ProjectType } from '../types/project.type'
import { TimeClockType } from '../types/time-clock.type'
import { UserType } from '../types/user.type'

const props = defineProps<{
	users: UserType[]
	projects: ProjectType[]
	issues: IssueType[]
	editor: { [key: string]: TimeClockType }
}>()
const emit = defineEmits(['createTimeClock', 'updateTimeClock'])

const showOverlay = () => {
	const overlay = document.getElementById('time-clock-overlay')
	if (overlay) overlay.classList.add('open')
}

const hideOverlay = () => {
	const overlay = document.getElementById('time-clock-overlay')
	if (overlay) overlay.classList.remove('open')
}

const showNew = () => {
	hideEdit()
	showOverlay()
	const dialog = document.getElementById('new-time-clock-dialog')
	if (dialog) dialog.classList.add('open')
}

const hideNew = () => {
	const dialog = document.getElementById('new-time-clock-dialog')
	if (dialog) dialog.classList.remove('open')
	hideOverlay()
}

const showEdit = () => {
	hideNew()
	showOverlay()
	const dialog = document.getElementById('edit-time-clock-dialog')
	if (dialog) dialog.classList.add('open')
}

const hideEdit = () => {
	const dialog = document.getElementById('edit-time-clock-dialog')
	if (dialog) dialog.classList.remove('open')
	hideOverlay()
}

defineExpose({ showNew, showEdit, hideNew, hideEdit })
</script>
