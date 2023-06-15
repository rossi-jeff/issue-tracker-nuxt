import { defineStore } from 'pinia'

export type UserSessionType = {
	UUID: string | null
	Name: string | null
	Token: string | null
	UserName: string | null
	SessionId: string | null
	signedIn: boolean
}

export const blankUserSession: UserSessionType = {
	UUID: null,
	Name: null,
	Token: null,
	UserName: null,
	SessionId: null,
	signedIn: false,
}

export const useUserSessionStore = defineStore('userSession', {
	state: (): UserSessionType => blankUserSession,
	actions: {
		logIn(newSession: UserSessionType) {
			this.UserName = newSession.UserName
			this.Name = newSession.Name
			this.Token = newSession.Token
			this.UUID = newSession.UUID
			this.SessionId = newSession.SessionId
			this.signedIn = newSession.signedIn
		},
		logOut() {
			this.Name = null
			this.UserName = null
			this.Token = null
			this.UUID = null
			this.SessionId = null
			this.signedIn = false
		},
	},
})
