import React, { Component } from "react";
import BallinChainContract from "./BallinChain.json";
import getWeb3 from "./utils/getWeb3.js";
import Bet from "./components/Bet"

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

            //  log basic info to show we are alive
            const mySym = await BC.methods.symbol().call();
            console.log("my symbol", mySym);
            console.log("accounts", accounts);

            let purchaserBCCount = await BC.methods
                .balanceOf(purchaserAddress)
                .call();
            purchaserBCCount /= 1e18;

            // Write web3, accounts, and contract and all other info to the state
            this.setState({
                web3: web3,
                accounts: accounts,
                BC,

                purchaserAddress
            });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
        }
    }

    render() {
        return (
            <Bet
        state = {this.state}
        gameId = "3" />
    );
    }
}

export default App;
