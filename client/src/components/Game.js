import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
class Game extends Component{
    constructor(props) {
        super(props);

        let state = {
            gameID: 0,
            gameDate: new Date("")
        };
function checkDate(props) {
    const todayDate = new Date();
    if (todayDate !== this.state.gameDate) { //Catch older games
        return (<div id="snackbar">Bets can only be placed on today's games!</div>
        );
    } else {
        this.state.gameDate = todayDate;
    }
}

    return (
                <div>
                    <Card>
                        <CardImg top width="318px"  src="./basketball.jpg" alt="Basketball image" />
                        <CardBody>
                            <CardTitle>Game Number {this.state.gameID}</CardTitle>
                            <CardSubtitle>{this.state.gameDate}</CardSubtitle>
                            <CardText>TEST IF CARD RENDERED.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </div>);
        }

}