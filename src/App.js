import React, {Component} from 'react';
import './App.scss';
import Teamslist from "./Teamslist";
import Calendar from "./Calendar";
import CButton from "./CustomButton"

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: null,
            matches: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState({
            teams: null,
            matches: null
        })
    };

    render() {

        const paintCalendar = (m, t) => {
            this.setState({
                teams: t,
                matches: m
            })
        }

        const buttonStyles = {
            width: '100px',
            height: '30px'
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1>League Calendar</h1>
                </header>
                <main>
                    {
                        !this.state.matches && !this.state.teams &&
                            <Teamslist paintCalendar={paintCalendar}></Teamslist>
                    }
                    {
                        this.state.matches && this.state.teams &&
                            <div className="CalendarWrapper">
                                <CButton style={buttonStyles} onClick={this.handleClick}>Back</CButton>
                                <Calendar matches={this.state.matches} teams={this.state.teams}></Calendar>
                            </div>
                    }
                </main>
                <footer></footer>
            </div>
        );
    }
}

export default App;
