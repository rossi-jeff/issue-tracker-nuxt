<template>
	<div id="auth-dialogs">
		<!-- buttons -->
		<button v-if="!session.signedIn" @click="showSignIn">Sign In</button>
		<span v-if="session.signedIn" class="mr-4">
			<NuxtLink :to="`/users/${session.UUID}`">{{ session.UserName }}</NuxtLink>
		</span>
		<button v-if="session.signedIn" @click="signOut">Sign Out</button>

		<!-- modals -->
		<div class="modal-overlay" id="auth-overlay">
			<!--sign in-->
			<div class="modal-30p" id="sign-in-dialog">
				<h2>Sign In</h2>
				<CredentialsForm :credentials="credentials" name="sign-in" />
				<div class="flex flex-wrap justify-between">
					<button @click="hideSignIn">Cancel</button>
					<button @click="signIn">Sign In</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CredentialsType } from '../types/credentials.type'
import {
	UserSessionType,
	useUserSessionStore,
} from '../utils/user-session.store'

const session = useUserSessionStore()
const credentials: CredentialsType = reactive({
	Username: '',
	Password: '',
})
const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
}

const showOverlay = () => {
	const overlay = document.getElementById('auth-overlay')
	if (overlay) overlay.classList.add('open')
}

const hideOverlay = () => {
	const overlay = document.getElementById('auth-overlay')
	if (overlay) overlay.classList.remove('open')
}

const showSignIn = () => {
	showOverlay()
	const dialog = document.getElementById('sign-in-dialog')
	if (dialog) dialog.classList.add('open')
}

const hideSignIn = () => {
	const dialog = document.getElementById('sign-in-dialog')
	if (dialog) dialog.classList.remove('open')
	hideOverlay()
}

const signIn = async () => {
	const { Username, Password } = credentials
	if (!Username || !Password) return
	const result = await fetch(`${apiUrl}/auth/login`, {
		method: 'POST',
		body: JSON.stringify({ Username, Password }),
		headers,
	})
	if (result.ok) {
		const { Name, SessionId, Token, UUID, UserName } = await result.json()
		const newSession: UserSessionType = {
			Name,
			SessionId,
			Token,
			UUID,
			UserName,
			signedIn: true,
		}
		session.logIn(newSession)
		hideSignIn()
	} else session.logOut()
}

const signOut = () => {
	session.logOut()
}
</script>
