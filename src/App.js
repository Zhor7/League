import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CalendarCreation from "./generateLeague/CalendarCreation";
import Home from "./Home";
import Calendar from "./results/Calendar";
import Standings from "./standings/Standings";

class App extends Component {

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

        return (
            <Router>
                <div className="App">
                    <header>
                        <h1>Keytree PES League</h1>
                        <nav>
                            <ul>
                                <CustomLi activeOnlyWhenExact={true} to="/" label="Home"/>
                                <CustomLi to="/genLeague" label="Generate League"/>
                                <CustomLi to="/standings" label="Standings"/>
                                <CustomLi to="/results" label="Results"/>
                            </ul>
                        </nav>
                    </header>
                    <main>
                        <Route path="/" exact component={Home}/>
                        <Route path="/genLeague/" component={CalendarCreation}/>
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
