const stravaApi = require('strava-v3')
const dotEnv = require('dotenv')
dotEnv.config()

let strava = null;

const clientId = process.env.STRAVA_CLIENT_ID
const clientSecret = process.env.STRAVA_CLIENT_SECRET

const setToken = (token) => {
    strava = new stravaApi.client(token)
}

const refreshToken = async (refresh_token) => {
    if (!refresh_token || !clientId || !clientSecret) throw new Error('Missing refresh token or client id/secret')
    const payload = await stravaApi.oauth.refreshToken({
        refresh_token,
        client_id: clientId,
        client_secret: clientSecret
    })
    return payload
}


const getAthlete = async () => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.athlete.get({})
    return payload
}

const getActivities = async () => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.athlete.listActivities({
        per_page: 50
    })
    return payload
}

const getActivity = async (id) => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.activities.get({
        id
    })
    return payload
}

const getStats = async (id) => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.athletes.stats({
        id
    })
    return payload
}


export { setToken, refreshToken, getAthlete, getActivities, getActivity, getStats }

