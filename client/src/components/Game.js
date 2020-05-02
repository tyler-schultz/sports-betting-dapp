import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class Game extends Component{
    constructor(props) {
        super(props);

        let state = {
            gameID: null,
            gameDate: null
        };
    }
 render() {



    return (
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>Game Number 1</CardTitle>
                            <CardSubtitle>TEST FOR DATE</CardSubtitle>
                            <CardText>TEST IF CARD RENDERED.</CardText>
                            <Button>TEST</Button>
                        </CardBody>
                    </Card>
                </div>);
        }}


export default Game;