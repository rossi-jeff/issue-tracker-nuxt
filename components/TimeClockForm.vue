<template>
	<div :id="`${props.name}-time-clock-form`">
		<div class="flex flex-wrap justify-between">
			<div>
				<label for="user-id">User</label>
				<select name="user-id" v-model="props.timeClock.UserId">
					<option value="">- select -</option>
					<option v-for="u of props.users" :key="u.UUID" :value="u.Id">
						{{ getFullName(u) }}
					</option>
				</select>
			</div>
			<div>
				<label for="project-id">Project</label>
				<select name="project-id" v-model="props.timeClock.ProjectId">
					<option value="">- select -</option>
					<option v-for="p of props.projects" :key="p.UUID" :value="p.Id">
						{{ p.Name }}
					</option>
				</select>
			</div>
		</div>
		<div>
			<label for="issue-id">Issue</label>
			<select name="issue-id" v-model="props.timeClock.IssueId" class="w-full">
				<option value="">- select -</option>
				<option v-for="i of props.issues" :key="i.UUID" :value="i.Id">
					{{ i.SequenceNumber }} | {{ i.Title }}
				</option>
			</select>
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<label for="start-date">Start Date</label>
				<input
					type="date"
					name="start-date"
					v-model="props.timeClock.Start.Date"
				/>
			</div>
			<div>
				<label for="start-time">Start Date</label>
				<input
					type="time"
					name="start-time"
					v-model="props.timeClock.Start.Time"
				/>
			</div>
			<div>
				<label for="end-date">End Date</label>
				<input type="date" name="end-date" v-model="props.timeClock.End.Date" />
			</div>
			<div>
				<label for="end-time">End Time</label>
				<input type="time" name="end-time" v-model="props.timeClock.End.Time" />
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
	timeClock: TimeClockType
	name: string
}>()
</script>

<style lang="postcss" scoped>
input,
textarea,
select {
	@apply border border-black rounded px-2 py-1;
}
label {
	@apply font-bold block;
}
</style>
