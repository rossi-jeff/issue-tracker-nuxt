<template>
	<div class="card">
		<div>
			<h2>New User</h2>
			<UserForm :user="state.User" :show-pass="true" />
			<div class="text-right mt-2">
				<button>Save User</button>
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
</template>

<script lang="ts" setup>
import { EmailType } from '~/types/email.type'
import { PhoneType } from '~/types/phone.type'
import { UserType } from '~/types/user.type'
import { UserRoleArray } from '../../types/array.types'
import { ulid } from 'ulid'

let User: UserType = reactive({
	Name: {},
	Credentials: {},
	Roles: [],
	Phones: [],
	Emails: [],
})
let Phone: PhoneType = reactive({})
let Email: EmailType = reactive({})
const state = reactive({ User, Phone, Email })
const overlay = ref()

const newEmail = () => {
	overlay.value.showNewEmail()
}

const newPhone = () => {
	overlay.value.showNewPhone()
}

const createEmail = () => {
	const email: EmailType = clone(state.Email)
	email.UUID = ulid()
	if (!state.User.Emails) state.User.Emails = []
	state.User.Emails.push(email)
	state.Email = {}
	overlay.value.hideNewEmail()
}

const createPhone = () => {
	const phone: PhoneType = clone(state.Phone)
	phone.UUID = ulid()
	if (!state.User.Phones) state.User.Phones = []
	state.User.Phones.push(phone)
	state.Phone = {}
	overlay.value.hideNewPhone()
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

const updateEmail = () => {
	const email: EmailType = clone(state.Email)
	if (!state.User.Emails) state.User.Emails = []
	const idx = state.User.Emails.findIndex((e) => e.UUID == email.UUID)
	if (idx != -1) state.User.Emails[idx] = email
	overlay.value.hideEditEmail()
}

const updatePhone = () => {
	const phone: PhoneType = clone(state.Phone)
	if (!state.User.Phones) state.User.Phones = []
	const idx = state.User.Phones.findIndex((p) => p.UUID == phone.UUID)
	if (idx != -1) state.User.Phones[idx] = phone
	overlay.value.hideEditPhone()
}

const deleteEmail = (uuid: string) => {
	if (!state.User.Emails) state.User.Emails = []
	const idx = state.User.Emails.findIndex((e) => e.UUID == uuid)
	if (idx != -1) state.User.Emails.splice(idx, 1)
}

const deletePhone = (uuid: string) => {
	if (!state.User.Phones) state.User.Phones = []
	const idx = state.User.Phones.findIndex((p) => p.UUID == uuid)
	if (idx != -1) state.User.Phones.splice(idx, 1)
}
</script>
