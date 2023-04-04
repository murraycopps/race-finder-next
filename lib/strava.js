const stravaApi = require('strava-v3')

let strava = null;

const setToken = (token) => {
    strava = new stravaApi.client(token)
}

const getAthlete = async () => {
    if(!strava) throw new Error('Strava token not set')
    const payload = await strava.athlete.get({})
    return payload
}

const getActivities = async () => {
    if(!strava) throw new Error('Strava token not set')
    const payload = await strava.athlete.listActivities({
        per_page: 50
    })
    return payload
}

const getActivity = async (id) => {
    if(!strava) throw new Error('Strava token not set')
    const payload = await strava.activities.get({
        id
    })
    return payload
}

const getStats = async (id) => {
    if(!strava) throw new Error('Strava token not set')
    const payload = await strava.athletes.stats({
        id
    })
    return payload
}


export {setToken, getAthlete, getActivities, getActivity, getStats }

