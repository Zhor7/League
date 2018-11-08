import React, { Component } from 'react';
import MatchDay from "./MatchDay";
import './Calendar.scss'

class Calendar extends Component {

    render() {

        const {teams, matches} = this.props;

        return (
            <div className="Calendar">
                {
                    matches.map((x, i) =>
                        <MatchDay key={i} matches={x}
                                  matchDayNumber={i+1} teams={teams}/>)
                }

            </div>
        );
    }
}

export default Calendar;