<template>
	<div id="header-bar" class="card m-2">
		<div class="flex flex-wrap justify-between">
			<div class="flex flex-wrap">
				<h1>Issue</h1>
				<span class="mx-2 mt-2">|</span>
				<h1>Tracker</h1>
			</div>
			<AuthDialogs />
		</div>
		<div class="flex flex-wrap justify-between">
			<NuxtLink to="/">Home</NuxtLink>
			<NuxtLink to="/dashboard">Dashboard</NuxtLink>
			<NuxtLink to="/projects">Projects</NuxtLink>
			<NuxtLink to="/issues">Issues</NuxtLink>
			<NuxtLink to="/users">Users</NuxtLink>
			<NuxtLink to="/time_clocks">Time Clocks</NuxtLink>
		</div>
	</div>
</template>
