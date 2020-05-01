import React, { Component } from "react";
import BallinChainContract from "./BallinChain.json";
import getWeb3 from "./utils/getWeb3.js";
import GameFrame from "./components/GameFrame"
import "./style/App.css";
import Admin from "./components/Admin";

class App extends Component {
    state = {
        web3: null,
        accounts: null,
        BC: {},

        loading: false,
        value: "",
        message: "",
        contractOwner: "0x7cFe7dE72c30dd49b5bcEB0d6831Ab55bd718de0",
        isAdminOpen: false
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
                <Admin isAdminOpen={this.state.isAdminOpen} toggleAdminOpen={this.toggleAdminOpen}/>
            </div>
        );
    }

    toggleAdminOpen(){
        let temp = !this.state.isAdminOpen;
        this.setState({isAdminOpen: temp});
    }
}

export default App;
