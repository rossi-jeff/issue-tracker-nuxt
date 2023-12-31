<template>
	<div>
		<Head>
			<Title>Issue Tracker | Edit User</Title>
		</Head>
		<div v-if="state.User" class="flex flex-wrap">
			<h1>{{ getFullName(state.User) }}</h1>
			<div class="mx-4" v-if="state.User.Credentials">
				({{ state.User.Credentials.Username }})
			</div>
			<button
				@click="state.editing = !state.editing"
				v-if="session.signedIn"
				class="mb-2"
			>
				Edit
			</button>
		</div>

		<div v-if="state.editing" class="card">
			<h2>Edit User</h2>
			<div>
				<UserForm :user="state.User" :show-pass="false" />
				<div class="text-right mt-2">
					<button @click="updateUser">Update User</button>
				</div>
			</div>
			<h3>Roles</h3>
			<div class="flex flex-wrap justify-between mb-2">
				<div v-for="(r, i) of UserRoleArray" :key="i">
					<input
						type="checkbox"
						name="role"
						:id="`role-${r}`"
						:value="r"
						v-model="state.User.Roles"
						:checked="state.User.Roles && state.User.Roles.indexOf(r) > -1"
					/>
					<label :for="`role-${r}`" class="ml-2">{{ r }}</label>
				</div>
			</div>
			<div class="flex flex-wrap mb-2">
				<h3>Phones</h3>
				<button @click="newPhone" class="ml-4">New Phone</button>
			</div>
			<PhoneList
				:phones="state.User.Phones || []"
				:show-buttons="true"
				@edit-phone="editPhone"
				@delete-phone="deletePhone"
			/>
			<div class="flex flex-wrap mb-2">
				<h3>Emails</h3>
				<button @click="newEmail" class="ml-4">New Email</button>
			</div>
			<EmailList
				:emails="state.User.Emails || []"
				:show-buttons="true"
				@edit-email="editEmail"
				@delete-email="deleteEmail"
			/>
			<PhoneEmailDialogs
				:phone="state.Phone"
				:email="state.Email"
				ref="overlay"
				@create-email="createEmail"
				@create-phone="createPhone"
				@update-email="updateEmail"
				@update-phone="updatePhone"
			/>
		</div>

		<div v-else class="card">
			<div v-if="state.User.Credentials">
				<strong>Username</strong>
				{{ state.User.Credentials.Username }}
			</div>
			<div v-if="state.User.Name">
				<strong>Name</strong>
				{{ getFullName(state.User) }}
			</div>
			<div v-if="state.User.Roles">
				<strong>Roles</strong>
				{{ state.User.Roles.join(', ') }}
			</div>
			<h3>Phones</h3>
			<PhoneList :phones="state.User.Phones || []" :show-buttons="false" />
			<h3>Emails</h3>
			<EmailList :emails="state.User.Emails || []" :show-buttons="false" />
		</div>
		<SignInAlert v-if="!session.signedIn" />
	</div>
</template>

<script lang="ts" setup>
import { UserType } from '~/types/user.type'
import { EmailType } from '~/types/email.type'
import { PhoneType } from '~/types/phone.type'
import { UserRoleArray } from '../../types/array.types'

const route = useRoute()
let User: UserType = reactive({})
let Phone: PhoneType = reactive({})
let Email: EmailType = reactive({})
const state = reactive({ User, Phone, Email, editing: false })
const overlay = ref()
const session = useUserSessionStore()

const loadUser = async () => {
	const result = await fetch(`${apiUrl}/user/${route.params.uuid}`)
	if (result.ok) {
		state.User = await result.json()
	}
}

const newEmail = () => {
	overlay.value.showNewEmail()
}

const newPhone = () => {
	overlay.value.showNewPhone()
}

const createEmail = async () => {
	if (!state.User.Emails) state.User.Emails = []
	const { Address, Usage, Public } = state.Email
	const result = await fetch(`${apiUrl}/user/${route.params.uuid}/email`, {
		method: 'POST',
		body: JSON.stringify({ Address, Usage, Public }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const email = await result.json()
		state.User.Emails.push(email)
		state.Email = {}
		overlay.value.hideNewEmail()
	}
}

const createPhone = async () => {
	if (!state.User.Phones) state.User.Phones = []
	const { Number, Usage, Public } = state.Phone
	const result = await fetch(`${apiUrl}/user/${route.params.uuid}/phone`, {
		method: 'POST',
		body: JSON.stringify({ Number, Usage, Public }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const phone = await result.json()
		state.User.Phones.push(phone)
		state.Phone = {}
		overlay.value.hideNewPhone()
	}
}

const editEmail = (uuid: string) => {
	const email: EmailType | undefined = state.User.Emails
		? state.User.Emails.find((e) => e.UUID == uuid)
		: {}
	state.Email = email ? clone(email) : {}
	overlay.value.showEditEmail()
}

const editPhone = (uuid: string) => {
	const phone: PhoneType | undefined = state.User.Phones
		? state.User.Phones.find((p) => p.UUID == uuid)
		: {}
	state.Phone = phone ? clone(phone) : {}
	overlay.value.showEditPhone()
}

const updateEmail = async () => {
	if (!state.User.Emails) state.User.Emails = []
	const { Address, Usage, Public, UUID } = state.Email
	const result = await fetch(`${apiUrl}/email/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify({ Address, Usage, Public }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const email = await result.json()
		const idx = state.User.Emails.findIndex((e) => e.UUID == UUID)
		if (idx != -1) state.User.Emails[idx] = email
		overlay.value.hideEditEmail()
	}
}

const updatePhone = async () => {
	if (!state.User.Phones) state.User.Phones = []
	const { Number, Usage, Public, UUID } = state.Phone
	const result = await fetch(`${apiUrl}/phone/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify({ Number, Usage, Public }),
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const phone = await result.json()
		const idx = state.User.Phones.findIndex((p) => p.UUID == UUID)
		if (idx != -1) state.User.Phones[idx] = phone
		overlay.value.hideEditPhone()
	}
}

const deleteEmail = async (uuid: string) => {
	if (!state.User.Emails) state.User.Emails = []
	const result = await fetch(`${apiUrl}/email/${uuid}`, {
		method: 'DELETE',
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const idx = state.User.Emails.findIndex((e) => e.UUID == uuid)
		if (idx != -1) state.User.Emails.splice(idx, 1)
	}
}

const deletePhone = async (uuid: string) => {
	if (!state.User.Phones) state.User.Phones = []
	const result = await fetch(`${apiUrl}/phone/${uuid}`, {
		method: 'DELETE',
		headers: buildHeaders(session),
	})
	if (result.ok) {
		const idx = state.User.Phones.findIndex((p) => p.UUID == uuid)
		if (idx != -1) state.User.Phones.splice(idx, 1)
	}
}

const updateUser = async () => {
	const { Name, Credentials, Roles, UUID } = state.User
	const result = await fetch(`${apiUrl}/user/${UUID}`, {
		method: 'PATCH',
		body: JSON.stringify({ Name, Credentials, Roles }),
		headers: buildHeaders(session),
	})
	if (result.ok) loadUser()
}

onMounted(() => loadUser())
</script>
