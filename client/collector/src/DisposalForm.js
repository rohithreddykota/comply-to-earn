import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Web3 from 'web3';
import './DisposalForm.css';

const DisposalForm = () => {
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState('');

    const handleDisposal = async (event) => {
        event.preventDefault();

        // Connect to the user's Ethereum wallet
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await window.web3.eth.getAccounts();
                const userAddress = accounts[0];

                // TODO: Interact with your smart contract to dispose waste and get NFTs
                // For example:
                // const contract = new window.web3.eth.Contract(abi, contractAddress);
                // await contract.methods.disposeWaste(quantity).send({ from: userAddress });

                setMessage('Waste disposed successfully! NFTs received.');
            } catch (error) {
                setMessage('Error connecting to your Ethereum wallet. Please try again.');
            }
        } else {
            setMessage('Please install MetaMask to use this feature.');
        }
    };

    return (
        <div>
            <h2 className='h2' >Biomedical Waste Disposal Form</h2>
            <Form onSubmit={handleDisposal}>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Your Ethereum Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Ethereum address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity of Waste</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </Form.Group>
                <Button className='dispose-button' variant="primary" type="submit">
                    Dispose Waste and Get NFTs
                </Button>
            </Form>
            <div className="mt-3">{message}</div>
        </div>
    );
};

export default DisposalForm;
