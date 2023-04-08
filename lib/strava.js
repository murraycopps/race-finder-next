const stravaApi = require('strava-v3')

let strava = null;

const clientId = process.env.STRAVA_CLIENT_ID
const clientSecret = process.env.STRAVA_CLIENT_SECRET

const setToken = (token) => {
    strava = new stravaApi.client(token)
}

const refreshToken = async (refreshToken) => {
    if (!refreshToken || !clientId || !clientSecret) throw new Error('Missing refresh token or client id/secret')
    const strava = require('strava-v3')
    strava.config({
        "client_id": clientId,
        "client_secret": clientSecret,
    })

    const token = await strava.oauth.refreshToken(refreshToken)
    return token
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

const getZones = async () => {
    const payload = await strava.athlete.listZones({})

    return payload
}

const getActivityStream = async (id) =>{
    const payload = await strava.streams.activity({
        id,
        types: "heartrate"
    })
    return payload
}

const getActivityComments = async (id) => {
    const payload = await strava.activities.listComments({
        id
    })  
    return payload

}


export { setToken, refreshToken, getAthlete, getActivities, getActivity, getStats, getZones, getActivityStream, getActivityComments }

