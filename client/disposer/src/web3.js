import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Modern dapp browsers
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access if needed
} else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // Legacy dapp browsers
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Non-dapp browsers
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    web3 = new Web3(provider);
}

export default web3;
