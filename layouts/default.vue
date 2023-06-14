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