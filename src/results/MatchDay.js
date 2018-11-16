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
                        matches.map((x, i) => {
                            let div;
                            div = <div key={i} className={!fromCalendarGeneration && (i % 2 !== 0) ? "Match Even" : "Match"}>
                                <div className="TeamContainer Home">
                                    {x.teamA.imageUrl &&
                                    <img src={x.teamA.imageUrl} alt="" width="35" height="35"></img>}
                                    <span>{x.teamA.name}</span>
                                </div>

                                {fromCalendarGeneration &&
                                <input type="number" className={typeof(x.scoreA) === "number" ? "filled" : "void"}
                                       onChange={this.handleChange} defaultValue={x.scoreA} min="0"
                                       max="50"/>}

                                <div className="Separator">-</div>

                                {fromCalendarGeneration &&
                                <input type="number" className={typeof(x.scoreB) === "number" ? "filled" : "void"}
                                       onChange={this.handleChange} defaultValue={x.scoreB} min="0"
                                       max="50"/>}

                                <div className="TeamContainer Away">
                                    {x.teamA.imageUrl &&
                                    <img src={x.teamB.imageUrl} alt="" width="35" height="35"></img>}
                                    <span>{x.teamB.name}</span>
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