import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CalendarCreation from "./generateLeague/CalendarCreation";
import Home from "./Home";
import Calendar from "./results/Calendar";
import Standings from "./standings/Standings";
import { baseURL, getActiveLeague } from "./services/Services";
import Search from "./search/Search";

class App extends Component {

    constructor(props) {

        super(props);

        this.updateLeague = this.updateLeague.bind(this);

        this.updateLeague();

        this.state = {
            leagueIcon: null,
            leagueName: null
        };
    }

    updateLeague() {

        getActiveLeague(res => {
            this.setState({
                leagueIcon: res.data.image ? baseURL + res.data.image : null,
                leagueName: res.data.name
            });
        });
    }

    render() {

        const CustomLi = ({ label, to, activeOnlyWhenExact }) => {
            return (
                <Route
                    path={to}
                    exact={activeOnlyWhenExact}
                    children={({ match }) => (
                        <li>
                            <Link className={match ? "active" : ""} to={to}>{label}</Link>
                        </li>
                    )}
                />
            );
        };

        const { leagueIcon, leagueName } = this.state;

        return (
            <Router>
                <div className="App">
                    <header>
                        <h1>{leagueName || "Keytree PES League"}</h1>
                        <nav>
                            <ul>
                                <CustomLi activeOnlyWhenExact={true} to="/" label="Home"/>
                                <CustomLi to="/genLeague" label="Generate League"/>
                                <CustomLi to="/selLeague" label="Select League"/>
                                <CustomLi to="/standings" label="Standings"/>
                                <CustomLi to="/results" label="Results"/>
                            </ul>
                        </nav>
                        <div className="IconContainer"><img src={leagueIcon} alt="" width="100"/></div>
                    </header>
                    <main>
                        <Route path="/" exact component={Home}/>
                        <Route path="/genLeague/"
                               render={(props) => <CalendarCreation {...props} updateLeague={this.updateLeague}/>}/>
                        <Route path="/selLeague/"
                               render={(props) => <Search {...props} updateLeague={this.updateLeague}/>}/>
                        <Route path="/standings/" component={Standings}/>
                        <Route path="/results/" component={Calendar}/>
                    </main>
                    <footer></footer>
                </div>
            </Router>
        );
    }
}

export default App;
