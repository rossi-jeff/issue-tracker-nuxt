<template>
  <main id="default-layout">
    <AuthDialogs />
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
.modal-overlay {
  @apply fixed inset-0 bg-gray-500 bg-opacity-70 overflow-y-auto w-full h-full hidden;
}
.modal-30p {
  @apply w-[30%] border border-black p-2 bg-white mx-auto hidden relative top-24;
}
.modal-40p {
  @apply w-[40%] border border-black p-2 bg-white mx-auto hidden relative top-24;
}
.filter-content.open,
.modal-overlay.open,
.modal-30p.open,
.modal-40p.open {
  @apply block;
}
</style>
