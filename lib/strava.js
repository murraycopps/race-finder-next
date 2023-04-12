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
        .catch((err) => {
            console.log(err)
        })
    return payload
}

const getActivities = async () => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.athlete.listActivities({
        per_page: 50
    })
        .catch((err) => {
            console.log(err)
        })
    return payload
}

const getActivity = async (id) => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.activities.get({
        id
    })
        .catch((err) => {
            console.log(err)
        })
    return payload
}


const getStats = async (id) => {
    if (!strava) throw new Error('Strava token not set')
    const payload = await strava.athletes.stats({
        id
    })
        .catch((err) => {
            console.log(err)
        })
    return payload
}

const getZones = async () => {
    const payload = await strava.athlete.listZones({})
        .catch((err) => {
            console.log(err)
        })
    return payload
}

const getActivityStream = async (id, types = "altitude,distance,heartrate,cadence,temp,moving,grade_smooth,velocity_smooth") => {
    const payload = await strava.streams.activity({
        id,
        types
    })
    console.log(payload)
    console.log(id)
    // try fetch api
    // https://www.strava.com/api/v3/activities/5528652950/streams/heartrate?
    const url = `https://www.strava.com/api/v3/activities/8874022508/streams/heartrate?access_token=8bdde36b44ac314243a86f570c24811c5ab9c5e7`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    return payload
}

const getActivityComments = async (id) => {
    const payload = await strava.activities.listComments({
        id
    })
        .catch((err) => {
            console.log(err)
        })
    return payload

}


export { setToken, refreshToken, getAthlete, getActivities, getActivity, getStats, getZones, getActivityStream, getActivityComments }

