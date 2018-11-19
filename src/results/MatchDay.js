import React, { Component } from "react";
import "./MatchDay.scss";
import axios from "axios";

class MatchDay extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.value) {
            axios.post("http://172.16.1.232:8080/api/v1/leagues/17", "sdasd")
                .then(res => {

                });
        }
    }

    render() {

        const { matchDayNumber, matches, restingTeam, fromCalendarGeneration } = this.props;

        return (
            <div className="MatchDay">
                <div className="Title">Matchday {matchDayNumber}</div>
                <div className="Matches">
                    {
                        matches.map((match, i) =>
                            <div key={i}
                                 className={!fromCalendarGeneration && (i % 2 !== 0) ? "Match Even" : "Match"}>
                                <div className="TeamContainer Home">
                                    {match.teamA.imageUrl &&
                                    <img src={match.teamA.imageUrl} alt="" width="26" height="26"></img>}
                                    <span
                                        className={match.scoreA > match.scoreB ? "Winner" : "Loser"}>{match.teamA.name}</span>
                                </div>


                                <div className="Score">
                                    {fromCalendarGeneration &&
                                    <input type="number"
                                           className={typeof(match.scoreA) === "number" ? "Filled" : "Void"}
                                           onChange={this.handleChange} defaultValue={match.scoreA} min="0"
                                           max="50"/>}

                                    <span>-</span>


                                    {fromCalendarGeneration &&
                                    <input type="number"
                                           className={typeof(match.scoreB) === "number" ? "Filled" : "Void"}
                                           onChange={this.handleChange} defaultValue={match.scoreB} min="0"
                                           max="50"/>}
                                </div>

                                <div className="TeamContainer Away">
                                    {match.teamA.imageUrl &&
                                    <img src={match.teamB.imageUrl} alt="" width="26" height="26"></img>}
                                    <span
                                        className={match.scoreB > match.scoreA ? "Winner" : "Loser"}>{match.teamB.name}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                {restingTeam && <div className="RestTeam">{restingTeam} rests</div>}
            </div>
        );
    }
}

export default MatchDay;