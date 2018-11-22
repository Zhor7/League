import React, { Component } from "react";
import "./Search.scss";
import { getActiveLeagueId, getAllLeagues, setActiveLeagueId } from "../services/Services";

class Search extends Component {

    constructor(props) {
        getAllLeagues(res => {
            this.setState({
                leagues: res.data
            });
        });

        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            leagues: null
        };
    }

    activeLeagueId = null;

    handleClick(leagueId) {
        return () => {
            if (this.activeLeagueId !== leagueId) {
                setActiveLeagueId(leagueId);
                this.props.updateLeague();
            }
        };
    }

    render() {

        this.activeLeagueId = getActiveLeagueId();
        const { leagues } = this.state;

        return (
            <div className="SearchLeagues">
                {leagues && leagues.map((league) =>
                    <div key={league.id} className={this.activeLeagueId === league.id ? "League Active" : "League"}
                         onClick={this.handleClick(league.id)}>
                        <span>{league.name}</span>
                        <img src={league.image} alt="" width="100"/>
                    </div>
                )}
            </div>
        );
    }
}

export default Search;
