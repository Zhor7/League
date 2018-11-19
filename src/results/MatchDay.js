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
                        matches.map((match, i) => {
                            let div;
                            div = <div key={match.id}
                                       className={!fromCalendarGeneration && (i % 2 !== 0) ? "Match Even" : "Match"}>
                                <div className="TeamContainer Home">
                                    {match.teamA.imageUrl &&
                                    <img src={match.teamA.imageUrl} alt="" width="35" height="35"></img>}
                                    <span>{match.teamA.name}</span>
                                </div>

                                {fromCalendarGeneration &&
                                <input type="number" className={typeof(match.scoreA) === "number" ? "filled" : "void"}
                                       onChange={this.handleChange} defaultValue={match.scoreA} min="0"
                                       max="50"/>}

                                <div className="Separator">-</div>

                                {fromCalendarGeneration &&
                                <input type="number" className={typeof(match.scoreB) === "number" ? "filled" : "void"}
                                       onChange={this.handleChange} defaultValue={match.scoreB} min="0"
                                       max="50"/>}

                                <div className="TeamContainer Away">
                                    {match.teamA.imageUrl &&
                                    <img src={match.teamB.imageUrl} alt="" width="35" height="35"></img>}
                                    <span>{match.teamB.name}</span>
                                </div>
                            </div>;

                            return div;
                        })
                    }
                </div>
                {restingTeam && <div className="RestTeam">{restingTeam} rests</div>}
            </div>
        );
    }
}

export default MatchDay;