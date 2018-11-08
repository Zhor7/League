import React from 'react';
import './MatchDay.scss'

class MatchDay extends React.Component {

    render() {

        const {matchDayNumber, teams, matches} = this.props;

        return (
            <div className="MatchDay">
                <div className="Title">Matchday {matchDayNumber}</div>
                <div className="Matches">
                    {
                        matches.map((x, i) => {
                            let div;
                            if (i % 2 !== 0) {
                                div = <div key={i} className={((i - 1) / 2) % 2 === 0 ? "Match" : "Match Even"}>
                                    <span className="Home">{teams[matches[i - 1] - 1]}</span>
                                    <span className="Separator">-</span>
                                    <span className="Away">{teams[matches[i] - 1]}</span>
                                </div>
                            }
                            return div;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default MatchDay;