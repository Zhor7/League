import React, { Component } from "react";
import "./Match.scss";
import { updateMatchResult } from "../services/Services";

class Match extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            match: props.match
        };

    }

    handleChange(team) {

        const me = this;

        return (event) => {
            let score,
                match = me.state.match;

            if (event.target.value) {
                score = Number(event.target.value);
            } else {
                score = null;
            }

            if (team === "A") {
                match.scoreA = score;
            } else if (team === "B") {
                match.scoreB = score;
            }

            updateMatchResult(match, () => {
                me.setState(
                    {
                        match: match
                    }
                );
            });
        };
    }

    render() {

        const { fromCalendarGeneration, index } = this.props;
        const { match } = this.state;

        return (
            match && <div className={!fromCalendarGeneration && (index % 2 !== 0) ? "Match Even" : "Match"}>
                <div className="TeamContainer Home">
                    {match.teamA.image &&
                    <img src={match.teamA.image} alt="" width="26" height="26"></img>}
                    <span
                        className={match.scoreA > match.scoreB ? "Winner" : "Loser"}>{match.teamA.name}</span>
                </div>


                <div className="Score">
                    {fromCalendarGeneration &&
                    <input type="number"
                           className={typeof (match.scoreA) === "number" ? "Filled" : "Void"}
                           onChange={this.handleChange("A")} defaultValue={match.scoreA} min="0"
                           max="50"/>}

                    <span>-</span>


                    {fromCalendarGeneration &&
                    <input type="number"
                           className={typeof (match.scoreB) === "number" ? "Filled" : "Void"}
                           onChange={this.handleChange("B")} defaultValue={match.scoreB} min="0"
                           max="50"/>}
                </div>

                <div className="TeamContainer Away">
                    {match.teamA.image &&
                    <img src={match.teamB.image} alt="" width="26" height="26"></img>}
                    <span
                        className={match.scoreB > match.scoreA ? "Winner" : "Loser"}>{match.teamB.name}</span>
                </div>
            </div>
        );
    }
}

export default Match;