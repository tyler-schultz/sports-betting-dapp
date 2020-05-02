import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import Model from "./Model";
class Game extends Component{
    constructor(props) {
        super(props);

        let state = {
            gameID: null,
            gameDate: new Date()
        };
    }

 render() {

     return (
                <div>
                    <Card>
                        <CardImg top width="100%" src="../basketball.jpg" alt="Card image" />
                        <CardBody>
                            <CardTitle>Game Number {this.props.gameID}</CardTitle>
                            <CardSubtitle>{this.props.gameDate}</CardSubtitle>
                            <CardText>TEST IF CARD RENDERED.</CardText>
                            <Model>" "</Model>
                        </CardBody>
                    </Card>
                </div>);
        }}


export default Game;