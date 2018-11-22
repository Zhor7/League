import React, { Component } from "react";
import "./CalendarCreation.scss";
import Teamslist from "./Teamslist";
import Calendar from "../results/Calendar";
import CButton from "../utils/CustomButton";
import { createLeague, setActiveLeagueId } from "../services/Services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class CalendarCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            league      : null,
            restingTeams: null,
            teams       : null,
            leagueName  : null
        };

        this.handleBack = this.handleBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleBack = () => {
        this.setState({
            league      : null,
            restingTeams: null
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const leagueToBeSent = {
            image    : null,
            name     : this.state.leagueName,
            matchdays: this.state.league
        };

        createLeague(leagueToBeSent, res => {
            toast("League " + res.data.name + " created successfully");
            setActiveLeagueId(res.data.id);
            this.props.updateLeague();
        });
    };

    handleChange = event => {
        this.setState(
            {
                leagueName: event.target.value
            }
        );
    };

    render() {
        const paintCalendar = (m, r, t) => {
            this.setState({
                league      : m,
                restingTeams: r,
                teams       : t
            });
        };

        const backButtonStyles = {
            width : "100px",
            height: "30px"
        };

        const saveButtonStyles = {
            width : "150px",
            height: "30px"
        };

        return (
            <div>
                {
                    !this.state.league && <Teamslist teams={this.state.teams} paintCalendar={paintCalendar}></Teamslist>
                }
                {
                    this.state.league && <div className="CalendarWrapper">
                        <form className="CalendarUpperDock" onSubmit={this.handleSubmit}>
                            <CButton style={backButtonStyles} onClick={this.handleBack}>Back</CButton>
                            <div>
                                <label htmlFor="LeagueName">League Name</label>
                                <input required name="LeagueName" type="text" onChange={this.handleChange}/>
                            </div>
                            <CButton style={saveButtonStyles} type="submit">Save League</CButton>
                        </form>
                        <Calendar league={this.state.league} restingTeams={this.state.restingTeams}></Calendar>
                        <ToastContainer/>
                    </div>
                }
            </div>
        );
    }
}

export default CalendarCreation;