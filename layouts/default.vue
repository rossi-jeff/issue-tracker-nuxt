<template>
	<main id="default-layout" :data-theme="state.palette">
		<div class="flex flex-col h-screen">
			<HeaderBar />
			<div class="mx-2 pr-2 flex-grow overflow-y-auto">
				<slot />
			</div>
			<FooterBar @changePalette="changePalette" @toggleDark="toggleDark" />
		</div>
	</main>
</template>

<script lang="ts" setup>
import { PaletteNames } from '../utils/palettes'

let palette = PaletteNames[0]
const state = reactive({ palette })

const changePalette = (name: string) => {
	state.palette = name
}

const toggleDark = (dark: boolean) => {
	const main = document.getElementById('default-layout')
	if (main) {
		if (dark) {
			main.classList.add('dark')
		} else {
			main.classList.remove('dark')
		}
	}
}
</script>

<style lang="postcss">
main {
	@apply bg-light text-dark;
}
main.dark {
	@apply bg-dark text-light;
}
.card {
	@apply p-2 mb-2 border bg-altLight border-altDark shadow-lg;
}
.dark .card {
	@apply bg-altDark border-altLight;
}
input,
select,
textarea,
button {
	@apply px-2 py-1 bg-light text-dark border border-dark text-sm;
}
h1 {
	@apply text-2xl font-extrabold text-altDark;
}
h2 {
	@apply text-xl font-bold;
}
h3 {
	@apply text-lg font-bold;
}
.dark h1 {
	@apply text-altLight;
}
.dark input,
.dark select,
.dark textarea,
.dark button {
	@apply bg-dark text-light border-light;
}
button:hover {
	@apply bg-altLight;
}
.dark button:hover {
	@apply bg-altDark;
}
.filter-content {
	@apply my-2 border border-dotted bg-light border-dark p-2 hidden transition;
}
.dark .filter-content {
	@apply bg-dark border-light;
}
.modal-overlay {
	@apply fixed inset-0 bg-dark bg-opacity-70 overflow-y-auto w-full h-full hidden;
}
.modal-30p {
	@apply w-[30%] border bg-altLight border-altDark p-2 mx-auto hidden relative top-24;
}
.modal-40p {
	@apply w-[40%] border bg-altLight border-altDark p-2 mx-auto hidden relative top-24;
}
.modal-50p {
	@apply w-[50%] border bg-altLight border-altDark p-2 mx-auto hidden relative top-24;
}
.modal-60p {
	@apply w-[60%] border bg-altLight border-altDark p-2 mx-auto hidden relative top-24;
}
.modal-fit {
	@apply max-w-fit border bg-altLight border-altDark p-2 mx-auto hidden relative top-24;
}
.dark .modal-30p,
.dark .modal-40p,
.dark .modal-50p,
.dark .modal-60p,
.dark .modal-fit {
	@apply bg-altDark border-altLight;
}
.filter-content.open,
.modal-overlay.open,
.modal-30p.open,
.modal-40p.open,
.modal-50p.open,
.modal-60p.open,
.modal-fit.open {
	@apply block;
}
.list-header {
	@apply flex flex-wrap justify-between bg-dark text-light mb-2 px-2;
}
.dark .list-header {
	@apply bg-light text-dark;
}
</style>
