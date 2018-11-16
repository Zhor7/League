import React, { Component } from "react";
import "./Teamslist.scss";
import CButton from "../utils/CustomButton";

const maxTeamCount = 20;
const pivot = 2;
const restingTeam = "REST";
const randomStart = true;


class Teamslist extends Component {

    constructor(props) {
        super(props);
        this.state = { teamsCount: 2 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            teamsCount: Number(event.target.value)
        });
    };

    getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);

    calculateCalendar = (target) => {
        let teams = [],
            numberOfMatchDays,
            matchDays = [],
            teamsCount,
            firstMatchDay = [],
            lastMatchDay,
            teamsSac = [],
            arrayDummy = [],
            oddTeamsCount = false,
            restingTeams;

        teamsCount = this.state.teamsCount;

        // We put the teams of the form in an Array
        [...Array(teamsCount)].map((x, i) =>
            teams.push(target["team" + i].value)
        );

        // When the total of teams is odd we need to add a dummy, and the team that plays with it rests that matchday
        if (teamsCount % 2 !== 0) {
            teamsCount++;
            teams.push(restingTeam);
            oddTeamsCount = true;
        }

        // A team has to play against all the others except itself.
        numberOfMatchDays = teamsCount - 1;

        for (let i = 1; i <= teamsCount; i++) {
            arrayDummy.push(i - 1);
            teamsSac.push(i);
        }

        // This flag establishes whether the first matchday is randomised generated or not
        if (randomStart) {
            for (let i = 1; i <= teamsCount; i++) {
                let ran = this.getRandomArbitrary(0, arrayDummy.length);
                firstMatchDay.push(teamsSac[arrayDummy[ran]]);
                arrayDummy.splice(ran, 1);
            }
        } else {
            firstMatchDay = teamsSac;
        }

        matchDays.push(firstMatchDay);

        lastMatchDay = firstMatchDay;

        // First round
        for (let i = 2; i <= numberOfMatchDays; i++) {

            let matchDay = new Array(teamsCount);

            // For even matchdays
            /*
             *  1-2         4-1
             *  3-4         6-3
             *  5-6    to   8-5
             *  7-8         2-7
             */
            if (i % 2 === 0) {
                for (let j = 0; j < teamsCount; j++) {
                    if (j % 2 === 0) {
                        matchDay[j] = lastMatchDay[j + 3];
                    } else {
                        matchDay[j] = lastMatchDay[j - 1];
                    }
                }

                // The pivot team is moved to the penultimate position (Home team in the last match)
                matchDay[teamsCount - pivot] = lastMatchDay[pivot - 1];
                // For odd matchdays
                /*
                 *  4-1         4-2
                 *  6-3         1-6
                 *  8-5    to   3-8
                 *  2-7         5-7
                 */
            } else {
                matchDay[0] = lastMatchDay[0];
                matchDay[teamsCount - 1] = lastMatchDay[teamsCount - 1];

                for (let j = 0; j < teamsCount; j++) {
                    // The first and last teams stay in their positions this time
                    if (j !== 0 && j !== teamsCount - 1) {
                        matchDay[j] = lastMatchDay[j - 1];
                    }
                }

                // The pivot team gets into his initial position again
                matchDay[pivot - 1] = lastMatchDay[teamsCount - pivot];
            }

            lastMatchDay = matchDay.slice();

            matchDays.push(matchDay);

        }

        // Second round (We just reverse the matches, therefore the odd ones exchange with the even ones)
        for (let i = 0; i < numberOfMatchDays; i++) {
            let matchDay = new Array(teamsCount);

            for (let j = 0; j < teamsCount; j++) {
                if (j % 2 === 0) {
                    matchDay[j] = matchDays[i][j + 1];
                } else {
                    matchDay[j] = matchDays[i][j - 1];
                }
            }

            matchDays.push(matchDay);
        }

        if (oddTeamsCount) {
            restingTeams = [];

            matchDays.map((matchDay, i) => {
                matchDay.map((z, k) => {
                    let rest;
                    if (z === teamsCount) {
                        if (k % 2 === 0) {
                            rest = matchDay[k + 1];
                            matchDay.splice(k, 2);

                        } else {
                            rest = matchDay[k - 1];
                            matchDay.splice(k - 1, 2);
                        }

                        restingTeams.push(teams[rest - 1]);
                    }
                });
            });
        }


        /**
         * UNIT TESTING
         */

            // let test = {};
            //
            // for (let j = 0; j < teamsCount; j++) {
            //     test[teams[j]] = [];
            // }
            //
            // matchDays.map((x, i) => {
            //     if (i<matchDays.length/2) {
            //         x.map((y, j) => {
            //             if (j%2===0){
            //                 test[teams[y-1]].push(teams[x[j+1]-1])
            //             } else {
            //                 test[teams[y-1]].push(teams[x[j-1]-1])
            //             }
            //             return true;
            //         })
            //     }
            //
            //
            //     return true;
            // })
            //
            // function find_duplicate_in_array(arra1, index) {
            //     var object = {};
            //     var result = [];
            //
            //     arra1.forEach(function (item) {
            //         if(!object[item])
            //             object[item] = 0;
            //         object[item] += 1;
            //     })
            //
            //     for (var prop in object) {
            //         if(object[prop] >= 2) {
            //             result.push(prop);
            //         }
            //     }
            //
            //     console.log("lol", index, result);
            // }
            //
            // for (let j=0; j<teamsCount; j++) {
            //     find_duplicate_in_array(test[teams[j]], teams[j])
            // }

        let league = [];

        matchDays.map((matchDay) => {
            let matches = [];

            matchDay.map((z, k) => {
                if (k % 2 === 0) {
                    matches.push({
                        teamA: {
                            name: teams[matchDay[k] - 1]
                        },
                        teamB: {
                            name: teams[matchDay[k + 1] - 1]
                        }
                    });
                }
            });

            league.push({
                id     : null,
                matches: matches
            });
        });

        this.props.paintCalendar(league, restingTeams);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.calculateCalendar(event.target);
    };

    render() {

        const buttonStyles = {
            width : "180px",
            height: "40px"
        };

        return (
            <div className="Teamslist">
                <select value={this.state.teamsCount} onChange={this.handleChange}>
                    {
                        [...Array(maxTeamCount)].map((x, i) => {
                            let opt;
                            if (i > 0) {
                                opt = <option key={i} value={i + 1}>{i + 1}</option>;
                            }
                            return opt;
                        })
                    }
                </select>
                <form onSubmit={this.handleSubmit}>
                    <div className="InputsContainer">
                        {this.state.teamsCount &&
                        [...Array(this.state.teamsCount)].map((x, i) =>
                            <label key={i} htmlFor={"team" + i}>
                                <span>Team {i + 1}:</span>
                                <input required type="text" name={"team" + i} key={i}/>
                            </label>
                        )
                        }
                    </div>
                    <CButton style={buttonStyles} type="submit" value="Submit">Generate League</CButton>
                </form>
            </div>
        );
    }
}

export default Teamslist;