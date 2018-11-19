import React, { Component } from "react";
import "./Standings.scss";
import axios from "axios/index";

class Standings extends Component {

    state = {
        standings: null
    };

    constructor(props) {

        super(props);
        // axios.get("http://172.16.1.232:8080/api/v1/leagues/17")
        axios.get("../standings.json")
            .then(res => {
                this.setState({
                    standings: res.data.standings
                });
            });

    }

    render() {
        const { standings } = this.state;

        return (
            <div className="Standings">
                <div className="Table">
                    <div className="Header">
                        <span>Team</span>
                        <span>MP</span>
                        <span>W</span>
                        <span>D</span>
                        <span>L</span>
                        <span>GF</span>
                        <span>GA</span>
                        <span>GD</span>
                        <span>Pts</span>
                    </div>
                    {standings && standings.map((s, i) =>
                        <div key={i} className="Body">
                            <div>
                                <span>{i + 1}</span>
                                <span><img src={s.team.imageUrl} alt="" width="24" height="24"></img></span>
                                <span>{s.team.name}</span>
                            </div>
                            <span>{s.matchsPlayed}</span>
                            <span>{s.won}</span>
                            <span>{s.draw}</span>
                            <span>{s.loss}</span>
                            <span>{s.goalsFor}</span>
                            <span>{s.goalsAgainst}</span>
                            <span>{s.goalDifference}</span>
                            <span>{s.points}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Standings;
