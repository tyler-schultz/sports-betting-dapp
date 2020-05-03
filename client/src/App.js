import React, { Component } from "react";
import { Button } from "reactstrap";
import BallinChainContract from "./BallinChain.json";
import getWeb3 from "./utils/getWeb3.js";
import GameFrame from "./components/GameFrame"
import "./style/App.css";
import Admin from "./components/Admin";
import Game from "./components/Game";
import Col from "reactstrap/es/Col";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            accounts: null,
            BC: {},

            loading: false,
            value: "",
            message: "",
            contractOwner: "0x7cFe7dE72c30dd49b5bcEB0d6831Ab55bd718de0",
            isAdminOpen: false,
            isAdmin: false,
            gameTable: []
        };
        this.toggleAdminOpen = this.toggleAdminOpen.bind(this);
        this.fetchGameData = this.fetchGameData.bind(this);
        this.createGame = this.createGame.bind(this);
        this.updateGameFinal = this.updateGameFinal.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.ownerWithdraw = this.ownerWithdraw.bind(this);
        this.totalGamesToday = this.totalGamesToday.bind(this);
        this.calcImage = this.calcImage.bind(this);
    }

    componentDidMount = async () => {
        //
        // Get network provider and web3 instance for CryptoRam and CryptoRamSale and RamCoin contracts
        //

        try {
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            const purchaserAddress = accounts[0];
            const compactPurchaserAddress = purchaserAddress.substring(0, 7) + "..." + purchaserAddress.substring(37);

            // Get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = BallinChainContract.networks[networkId];
            const BC = new web3.eth.Contract(
                BallinChainContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            // Write web3, accounts, and contract and all other info to the state
            let totalUserBets = await BC.methods.totalUserBets().call();
            let gList = [];
            let idList = [];
            let bList = [];
            let date = "05-03-2020";
            let gamesToday = await BC.methods.totalGamesToday(date).call();
            for (let i = 0; i < gamesToday; i++) {
                let id = await BC.methods.getGameToday(date, i).call();
                idList.push(id);
                let game = await BC.methods.getGamedData(id).call();
                gList.push(game);
                let bal = await BC.methods.gameBalance(id).call();
                bList.push(bal);
            }
            let gameTable = [];
            for (let i = 0; i < gList.length; i++) {
                gameTable.push(
                    {
                        key: i,
                        id: idList[i],
                        image: this.calcImage(gList[i].homeTeamName),
                        start: gList[i].gameStart,
                        end: gList[i].gameEnd,
                        date: gList[i].date,
                        hName: gList[i].homeTeamName,
                        hRecord: gList[i].homeTeamRecord,
                        hBetters: gList[i].homeTeamBetters,
                        aName: gList[i].awayTeamName,
                        aRecord: gList[i].awayTeamRecord,
                        aBetters: gList[i].awayTeamBetters,
                        gameB: bList[i],
                        winner: gList[i].winner,
                        score: gList[i].score
                    }
                );
            }
            this.setState({
                web3: web3,
                accounts: accounts,
                BC: BC,
                purchaserAddress,
                isAdmin: (purchaserAddress === this.state.contractOwner),
                compactPurchaserAddress,
                totalUserBets,
                gameTable: gameTable
            });

            document.title = "BallinChain";

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <nav>
                    <img src={require("./logo.png")} alt="BallinChain" />
                    <strong>Search by team</strong><br />
                    <input type="text" name="team" /><br />
                    <br />
                    <select>
                        <option value="all">All games</option>
                        <option value="my">My games</option>
                        <option value="today">Today's games</option>
                        <option value="past">Past games</option>
                    </select>
                    <hr />
                    <strong>Sort by</strong><br />
                    <select>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="lowest">Lowest total bid</option>
                        <option value="highest">Highest total bid</option>
                        <option value="alphabetical">A-Z</option>
                    </select>
                    <hr />
                    <strong>Your account address</strong><br />
                    {this.state.compactPurchaserAddress}<br />
                    <br />
                    <strong>Your total bets</strong><br />
                    {this.state.totalUserBets}
                    <br />
                    <br />
                    {this.state.isAdmin && <Button onClick={this.toggleAdminOpen}>Admin</Button>}
                    <footer>&copy; 2020</footer>
                </nav>
                <main>
                    <GameFrame gameTable={this.state.gameTable} state={this.state} style={{padding: "50px"}} />
                </main>
                <Admin isAdminOpen={this.state.isAdminOpen} toggleAdminOpen={this.toggleAdminOpen} BC={this.state.BC} purchaserAddress={this.state.purchaserAddress}
                        fetchGameData={this.fetchGameData} createGame={this.createGame} updateGameFinal={this.updateGameFinal} cancelGame={this.cancelGame}
                        ownerWithdraw={this.ownerWithdraw}/>
            </div>
        );
    }

    toggleAdminOpen(){
        let temp = !this.state.isAdminOpen;
        this.setState({isAdminOpen: temp});
    }

    calcImage(name){
        switch (name) {
            case "Nets":
                return "NetsvBucks.png";
            case "Rockets":
                return "RocketsvClippers.png";
            case "Mavericks":
                return "MavsvKings.png";
            case "76ers":
                return "76ersvRaptors.png";
        }
    }
    async fetchGameData(gameId){
        let gameID = +gameId;
        let gameData = await this.state.BC.methods.getGamedData(gameID).call();
        return gameData;
    }

    async createGame(gameStart, gameFinish, date, homeName, homeRecord, awayName, awayRecord){
        await this.state.BC.methods.createGame(gameStart, gameFinish, date, homeName, homeRecord, awayName, awayRecord).send({from:this.state.purchaserAddress});
    }

    async updateGameFinal( gameID, winner, score){
        let response = await this.state.BC.methods.updateGameFinal(gameID, winner, score).send({from:this.state.purchaserAddress});
        return response;
    }

    async cancelGame( gameID, reason){
        let response = await this.state.BC.methods.cancelGame(gameID, reason).send({from:this.state.purchaserAddress});
        return response;
    }

    async ownerWithdraw(gameID){
        let response = await this.state.BC.methods.ownerWithdraw(gameID).send({from:this.state.purchaserAddress});
        return response;
    }

    async totalGamesToday(date){
        try {
            let response = await this.state.BC.methods.totalGamesToday(date).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getGameToday(date, index){
        try {
            let response = await this.state.BC.methods.getGameToday(date, index).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async gameBalance(gameId){
        try {
            let response = await this.state.BC.methods.gameBalance(gameId).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}

export default App;