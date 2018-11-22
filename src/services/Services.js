import axios from "axios";

export const baseURL = "https://leagues0016837499trial.hanatrial.ondemand.com";
// export const baseURL = "http://172.16.1.232:8080";
const apiBaseURL = baseURL + "/api/v1";


let activeLeagueId = 1;

export const updateMatchResult = (match, callback) =>
    axios.put(apiBaseURL + "/matchs", match).then(res => callback(res));

export const getAllLeagues = callback =>
    axios.get(apiBaseURL + "/leagues").then(res => callback(res));

export const getActiveLeague = callback =>
    axios.get(apiBaseURL + "/leagues/" + activeLeagueId).then(res => callback(res));

export const setActiveLeagueId = newLeagueId => activeLeagueId = newLeagueId;

export const getActiveLeagueId = () => activeLeagueId;

export const getLeagueById = (leagueId, callback) =>
    axios.get(apiBaseURL + "/leagues/" + leagueId).then(res => callback(res));

export const getLeagueStandings = callback =>
    axios.get(apiBaseURL + "/standings/" + activeLeagueId).then(res => callback(res));

export const createLeague = (league, callback) =>
    axios.post(apiBaseURL + "/leagues", league).then(res => callback(res));
