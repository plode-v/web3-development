import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";

function App() {

    const [manager, setManager] = useState("");
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState("");
    const [message, setMessage] = useState("");
    const [value, setValue] = useState("");
    const [winner, setWinner] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const manager = await lottery.methods.manager().call();
            const players = await lottery.methods.getAll().call();
            const balance = await web3.eth.getBalance(lottery.options.address);
            
            setManager(manager);
            setPlayers(players);
            setBalance(balance);
        }
        fetchData()
            .catch(console.error);
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        setMessage("Waiting on transaction success...")

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(value, "ether")
        });

        setMessage("You have been entered!");
    };

    const handleClick = async () => {
        const accounts = await web3.eth.getAccounts();

        setMessage("Waiting on transaction Success...")

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        setWinner(await lottery.methods.lastWinner).call();
        setMessage("Winner has been picked!");
    }


    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>This contract is managed by <strong>{manager}</strong></p>
            <p>There are currently {players.length === 0 ? 0 : players.length} people entered,</p>
            <p>competing to win {web3.utils.fromWei(balance, "ether")} ether!</p>
            <hr />

            <h3>Want to try your luck?</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Amount of Ether to enter</label>
                    <input type="number" placeholder="Minimum of 0.001 ETH" onChange={e => setValue(e.target.value)} value={value} />
                    <button type="submit">Enter</button>
                </form>
            </div>
            <hr />
            <h3>Time to pick a winner?</h3>
            <button onClick={handleClick}>Pick Winner</button>
            <br />
            {
                winner !== "" && <p>The winner is: {winner}</p>
            }
            <hr />
            <h1>{message}</h1>

        </div>
    );
}

export default App;
