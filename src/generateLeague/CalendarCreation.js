import React, { Component } from "react";
import "./CalendarCreation.scss";
import Teamslist from "./Teamslist";
import Calendar from "../results/Calendar";
import CButton from "../utils/CustomButton";

class CalendarCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            league      : null,
            restingTeams: null,
            teams       : null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState({
            league      : null,
            restingTeams: null
        });
    };

    render() {
        const paintCalendar = (m, r, t) => {
            this.setState({
                league      : m,
                restingTeams: r,
                teams       : t
            });
        };

        const buttonStyles = {
            width : "100px",
            height: "30px"
        };

        return (
            <div>
                {
                    !this.state.league && <Teamslist teams={this.state.teams} paintCalendar={paintCalendar}></Teamslist>
                }
                {
                    this.state.league && <div className="CalendarWrapper">
                        <CButton style={buttonStyles} onClick={this.handleClick}>Back</CButton>
                        <Calendar league={this.state.league} restingTeams={this.state.restingTeams}></Calendar>
                    </div>
                }
            </div>
        );
    }
}

export default CalendarCreation;