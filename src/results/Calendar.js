import React, { Component } from "react";
import "./Calendar.scss";
import MatchDay from "./MatchDay";
import { getActiveLeague } from "../services/Services";

class Calendar extends Component {

    state = {
        matchDays   : null,
        restingTeams: null
    };

    fromCalendarGenerator = false;

    constructor(props) {

        super(props);

        let matchDays,
            restingTeams;

        if (props.league) {
            matchDays = props.league;
            restingTeams = props.restingTeams;
            this.fromCalendarGenerator = true;

        } else {
            getActiveLeague(res => {
                this.setState({
                    matchDays   : res.data.matchdays,
                    restingTeams: res.data.restingTeams
                });
            });
        }

        this.state = {
            matchDays   : matchDays,
            restingTeams: restingTeams
        };

    }

    render() {
        const { matchDays, restingTeams } = this.state;

        return (
            <div className="Calendar">
                {matchDays && matchDays.map((matchDay, i) => {
                    let restingTeam = restingTeams ? restingTeams[i] : null;
                    return (
                        <MatchDay
                            key={i}
                            fromCalendarGeneration={!this.fromCalendarGenerator}
                            matches={matchDay.matches}
                            matchDayNumber={i + 1}
                            restingTeam={restingTeam}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Calendar;
