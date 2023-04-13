import axios from "axios";
import { Goal } from "./types";
import { setToken, refreshToken } from "@/lib/strava";

export default class LoginData {
    static loggedIn = false
    static accessToken = ''
    static expiresAt = 0
    static username = ''
    static goals: Goal[] = []
    static _id: string = ''
    static refreshToken = ''

    static Login(accessToken: string, username: string, goals: Goal[], id: string, expiresAt: number, refresh_token: string) {
        this.loggedIn = true
        this.accessToken = accessToken
        this.username = username
        this.goals = goals
        this._id = id
        this.expiresAt = expiresAt
        this.refreshToken = refresh_token

        setToken(accessToken)

        sessionStorage.setItem("accessToken", this.accessToken)
        sessionStorage.setItem("username", this.username)
        sessionStorage.setItem("goals", JSON.stringify(this.goals))
        sessionStorage.setItem("id", this._id)
        sessionStorage.setItem("expiresAt", this.expiresAt.toString())
        sessionStorage.setItem("refreshToken", this.refreshToken)
    }

    static Logout() {
        this.loggedIn = false
        this.accessToken = ''
        this.username = ''
        this.goals = []

        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("goals")
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("expiresAt")
    }

    static isLoggedIn() {
        return this.loggedIn
    }

    static getAccessToken() {
        return this.accessToken
    }

    static getRefreshToken() {
        return this.refreshToken
    }

    static setAccessToken(token: string) {
        this.accessToken = token
        sessionStorage.setItem("accessToken", LoginData.accessToken);
        setToken(token)
    } 
    
    static setRefreshToken(token: string) {
        this.refreshToken = token
        sessionStorage.setItem("refreshToken", LoginData.refreshToken);
    }

    static getUsername() {
        return this.username
    }

    static getGoals() {
        return this.goals
    }

    static addGoal(goal: Goal) {
        this.goals.push(goal)
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals));
    }

    static async updateGoals(url: string) {
        const { data } = await axios.get(`${url}/api/users`)
        const user = data.data.find((user: any) => user.username === this.username)
        this.goals = user.goals
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
    }

    static completeGoal(id: number, url: string) {
        this.goals = this.goals.map((goal) => {
            if (goal.id === id) {
                goal.completed = true
            }
            return goal
        })
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static deleteGoal(id: number, url: string) {
        this.goals = this.goals.filter((goal) => goal.id !== id)
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static updateGoal(goal: Goal, url: string) {
        this.goals = this.goals.map((g) => {
            if (g.id === goal.id) {
                return goal
            }
            return g
        })
        sessionStorage.setItem("goals", JSON.stringify(LoginData.goals))
        axios.put(`${url}/api/users`, {
            _id: this._id,
            goals: this.goals
        })
    }

    static getUserID() {
        return this._id
    }

    static async getStorage() {
        if (this.loggedIn) return

        this.accessToken = sessionStorage.getItem("accessToken") || ''
        this.username = sessionStorage.getItem("username") || ''
        this.goals = JSON.parse(sessionStorage.getItem("goals") || '{}')
        this._id = sessionStorage.getItem("id") || ''
        this.expiresAt = Number(sessionStorage.getItem("expiresAt") || 0)
        this.refreshToken = sessionStorage.getItem("refreshToken") || ''

        if(!this.expiresAt || !this.refreshToken) return

        if (this.expiresAt * 1000 < Date.now()) {
            const res = await refreshToken(this.refreshToken)
            this.accessToken = res.access_token
            this.expiresAt = res.expires_at
            this.refreshToken = res.refresh_token
            sessionStorage.setItem("accessToken", this.accessToken)
            sessionStorage.setItem("expiresAt", this.expiresAt.toString())
            sessionStorage.setItem("refreshToken", this.refreshToken)
        }


        setToken(this.accessToken)

        if (this.accessToken && this._id || this.username) {
            this.loggedIn = true
        }
    }
}