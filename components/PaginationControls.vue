<template>
	<div id="pagination-controls" class="card">
		<div class="flex flex-wrap justify-between">
			<button @click="firstPage">First</button>
			<button @click="previousPage">Previous</button>
			<div>
				<label for="per-page">Per Page</label>
				<select name="per-page" v-model="state.perPage" @change="limitChanged">
					<option v-for="p of perPageOpts" :value="p" :key="p">{{ p }}</option>
				</select>
			</div>
			<div>
				<strong>{{ state.first }}</strong> to
				<strong>{{ state.last }}</strong> of <strong>{{ props.count }}</strong>
			</div>
			<div>
				<label for="page">Page</label>
				<select name="page" v-model="state.current" @change="pageChanged">
					<option v-for="p of state.pages" :value="p" :key="p">{{ p }}</option>
				</select>
			</div>
			<button @click="nextPage">Next</button>
			<button @click="lastPage">Last</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ count: number; limit: number; offset: number }>()
const emit = defineEmits(['pageChanged', 'limitChanged'])
let pages: number[] = reactive([])
const state = reactive({ pages, perPage: 10, current: 1, first: 0, last: 0 })
const perPageOpts = [5, 10, 25]

const buildPages = () => {
	let page = 1
	let counter = 0
	let pages = []
	while (counter < props.count) {
		pages.push(page)
		page++
		counter += props.limit
	}
	state.pages = pages
}

const setCurrent = () => {
	const page = Math.floor(props.offset / props.limit) + 1
	state.perPage = props.limit
	state.current = page
	state.first = (page - 1) * props.limit + 1
	state.last = Math.min((page - 1) * props.limit + props.limit, props.count)
}

const firstPage = () => emit('pageChanged', 1)

const previousPage = () => {
	const { current } = state
	if (current <= 1) return
	emit('pageChanged', current - 1)
}

const nextPage = () => {
	const { current, pages } = state
	const last = pages.length ? pages[pages.length - 1] : 1
	if (current + 1 > last) return
	emit('pageChanged', current + 1)
}

const lastPage = () => {
	const { pages } = state
	const last = pages.length ? pages[pages.length - 1] : 1
	emit('pageChanged', last)
}

const limitChanged = () => {
	const { perPage } = state
	emit('limitChanged', perPage)
}

const pageChanged = () => {
	const { current } = state
	emit('pageChanged', current)
}

onMounted(() => {
	buildPages()
	setCurrent()
})
</script>

<style lang="postcss" scoped>
label {
	@apply font-bold mr-2;
}
</style>
