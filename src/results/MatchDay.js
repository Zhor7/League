import React, { Component } from "react";
import "./MatchDay.scss";
import Match from "./Match";

class MatchDay extends Component {

    render() {

        const { matchDayNumber, matches, restingTeam, fromCalendarGeneration } = this.props;

        return (
            <div className="MatchDay">
                <div className="Title">Matchday {matchDayNumber}</div>
                <div className="Matches">
                    {
                        matches.map((match, i) => {
                                match.teamA.image = match.teamA.image && match.teamA.image.replace("$dpr", "4.0x");
                                match.teamB.image = match.teamB.image && match.teamB.image.replace("$dpr", "4.0x");

                                return <Match key={i} index={i} match={match}
                                              fromCalendarGeneration={fromCalendarGeneration}/>;
                            }
                        )
                    }
                </div>
                {restingTeam && <div className="RestTeam">{restingTeam} rests</div>}
            </div>
        );
    }
}

export default MatchDay;