import React, { Component } from "react";
import BallinChainContract from "./BallinChain.json";
import getWeb3 from "./utils/getWeb3.js";
import GameFrame from "./components/GameFrame"
import "./style/App.css";

class App extends Component {
    state = {
        web3: null,
        accounts: null,
        BC: {},

        loading: false,
        value: "",
        message: "",
    };

    componentDidMount = async () => {
        //
        // Get network provider and web3 instance for CryptoRam and CryptoRamSale and RamCoin contracts
        //

        try {
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            const purchaserAddress = accounts[0];

            // Get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = BallinChainContract.networks[networkId];
            const BC = new web3.eth.Contract(
                BallinChainContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            // Write web3, accounts, and contract and all other info to the state
            this.setState({
                web3: web3,
                accounts: accounts,
                BC,
                purchaserAddress,
            });

            let gameData = await this.state.BC.methods.getGamedData(0).call();
            let gameStart = gameData[0];
            this.setState({
                gameData,
                gameStart
            });

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    };

    /*
    <div>
    Game 0 Start: {this.state.gameStart}{"\n"}
    <Bet state={this.state} gameId="1" />
    </div>
     */


    render() {
        return (
            <div>
                <nav>
                    <img src={require("./logo.png")} alt="BallinChain" />
                    <li>Home</li>
                    <li>About</li>
                    <footer>&copy; 2020</footer>
                </nav>
                <main>
                    <GameFrame state={this.state} />
                </main>
            </div>
        );
    }
}

export default App;
