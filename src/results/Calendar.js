import React, { Component } from "react";
import "./Calendar.scss";
import axios from "axios/index";
import MatchDay from "./MatchDay";

class Calendar extends Component {

    state = {
        matchDays   : null,
        restingTeams: null
    };

    fromCalendarGenerator = false;

    constructor(props) {

        super(props);

        let matchDays;

        if (props.league) {
            matchDays = props.league;
            this.fromCalendarGenerator = true;

        } else {
            // axios.get("http://172.16.1.232:8080/api/v1/leagues/17")
            axios.get("../matchdays.json")
                .then(res => {
                    this.setState({
                        matchDays: res.data.matchdays
                    });
                });
        }

        this.state = {
            matchDays   : matchDays,
            restingTeams: props.restingTeams
        };

    }

    render() {
        const { matchDays, restingTeams } = this.state;

        return (
            <div className="Calendar">
                {matchDays && matchDays.map((x, i) => {
                    let restingTeam = restingTeams ? restingTeams[i] : null;
                    return (
                        <MatchDay
                            key={i}
                            fromCalendarGeneration={!this.fromCalendarGenerator}
                            matches={x.matches}
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
