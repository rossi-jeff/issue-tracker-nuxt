<template>
	<main id="default-layout">
		<div class="flex flex-wrap justify-between">
			<NuxtLink to="/">Home</NuxtLink>
			<NuxtLink to="/dashboard">Dashboard</NuxtLink>
			<NuxtLink to="/projects">Projects</NuxtLink>
			<NuxtLink to="/issues">Issues</NuxtLink>
			<NuxtLink to="/users">Users</NuxtLink>
			<NuxtLink to="/time_clocks">Time Clocks</NuxtLink>
		</div>
		<slot />
	</main>
</template>

<style lang="postcss">
.card {
	@apply p-2 mb-2 mx-2 border border-black;
}
.filter-content {
	@apply my-2 border border-dotted border-black p-2 hidden transition;
}
.filter-content.open {
	@apply block;
}
</style>
