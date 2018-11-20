import axios from "axios";

const baseURL = "https://leagues0016837499trial.hanatrial.ondemand.com/api/v1";

const leagueId = 1;

export const updateMatchResult = (match, callback) => {
    axios.put(baseURL + "/matchs", match).then(res => callback(res));
};

export const getLeagueResults = (callback) => {
    axios.get(baseURL + "/leagues/" + leagueId).then(res => callback(res));
};

export const getLeagueStandings = (callback) => {
    axios.get(baseURL + "/standings/" + leagueId).then(res => callback(res));
};