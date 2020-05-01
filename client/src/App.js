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
        isAdmin: false
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
            const compactPurchaserAddress = purchaserAddress.substring(0, 7) + "..." + purchaserAddress.substring(37);

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
                compactPurchaserAddress,
                isAdmin: (purchaserAddress === deployedNetwork.address)
            });

            let totalUserBets = await this.state.BC.methods.totalUserBets().call();
            this.setState({
                totalUserBets
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


                    {this.state.isAdmin && <div>TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANNNNNNNNNNNNNEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRRRRRRR</div>}
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
