<template>
	<div id="footer-bar" class="card m-2">
		<div class="flex flex-wrap justify-between">
			<div class="flex flex-wrap">
				<h2>Issue</h2>
				<span class="mx-2">|</span>
				<h2>Tracker</h2>
			</div>
			<div>
				Constructed by <strong>Jeff Rossi</strong> &lt;<a
					href="mailto:inquiries@jeff-rossi.com"
					>inquiries@jeff-rossi.com</a
				>&gt;
			</div>
			<div class="flex flex-wrap">
				<div class="mr-4">
					<label for="palette" class="font-bold mr-2">Palette</label>
					<select
						name="palette"
						id="palette"
						v-model="state.palette"
						@change="changePalette"
					>
						<option v-for="(p, i) of PaletteNames" :key="i" :value="p">
							{{ p }}
						</option>
					</select>
				</div>
				<div>
					<input
						type="checkbox"
						name="dark"
						id="dark"
						v-model="state.dark"
						@change="toggleDark"
					/>
					<label for="dark" class="font-bold ml-2">Dark</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PaletteNames } from '../utils/palettes'

const state = reactive({ palette: PaletteNames[0], dark: false })
const emit = defineEmits(['changePalette', 'toggleDark'])

const changePalette = () => {
	emit('changePalette', state.palette)
}

const toggleDark = () => {
	emit('toggleDark', state.dark)
}
</script>
