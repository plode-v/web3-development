import React, { Component, useEffect, useState } from 'react'
import factory from "../ethereum/factory.js";

// FIX THIS WHATEVER IS GOING ON HERE

const CampaignIndex = () => {
	const [campaigns, setCampaigns] = useState([]);
	const [metamaskInstalled, setMetamaskInstalled] = useState(true);

	useEffect(() => {
		async function getCampaigns() {
			try {
				const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
				const campaigns = await factory.methods.getDeployedCampaigns().call({ from: accounts[0] });
				setCampaigns(campaigns);
			} catch (err) {
				setMetamaskInstalled(false);
				console.error(err);
			}
		}

		if (window.ethereum) {
			getCampaigns();
		} else {
			setMetamaskInstalled(false);
		}
	}, []);

	return (
		<div>
			{metamaskInstalled ? (
				campaigns.length ? (
					<ul>
						{campaigns.map((campaign) => {
							<li key={campaign}>{campaign}</li>
						})}
					</ul>
				) : (
					<p>No campaign found.</p>
				)
			) : (
				<p>Please install Metamask to use this feature.</p>
			)}
		</div>
	);
};

export default CampaignIndex;