<template>
	<div :id="`time-clock-${props.timeClock.UUID}`" class="card">
		<div class="flex flex-wrap">
			<button @click="editTimeClock" v-if="session.signedIn" class="mr-4">
				Edit
			</button>
			<div class="flex-grow">
				<div class="flex flex-wrap justify-between">
					<div>
						<strong>User</strong>
						{{
							props.timeClock.User ? getFullName(props.timeClock.User) : 'N/A'
						}}
					</div>
					<div>
						<strong>Project</strong>
						{{ props.timeClock.Project ? props.timeClock.Project.Name : 'N/A' }}
					</div>
					<div>
						<strong>Issue</strong>
						{{
							props.timeClock.Issue
								? props.timeClock.Issue.SequenceNumber
								: 'N/A'
						}}
					</div>
				</div>
				<div class="flex flex-wrap justify-between">
					<div>
						<strong>From</strong>
						{{
							props.timeClock.Start ? formatClock(props.timeClock.Start) : 'N/A'
						}}
					</div>
					<div>
						<strong>To</strong>
						{{ props.timeClock.End ? formatClock(props.timeClock.End) : 'N/A' }}
					</div>
					<div>
						<strong>Hours</strong>
						{{ getTimeClockHours(props.timeClock) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { TimeClockType } from '../types/time-clock.type'

const props = defineProps<{ timeClock: TimeClockType }>()
const emit = defineEmits(['editTimeClock'])
const session = useUserSessionStore()

const editTimeClock = () => {
	const { UUID } = props.timeClock
	emit('editTimeClock', UUID)
}
</script>
