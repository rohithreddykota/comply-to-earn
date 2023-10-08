import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DisposalForm.css";

const data = [
    { itemType: "Needles", address: "Washington St", category: "Sharps Waste" },
    { itemType: "Chemotherapy Waste", address: "Harvard", category: "Cytotoxic Waste" },
];

const DisposalForm = () => {
    const handleDisposal = (approved) => {
        if (approved) {
            toast.success("Schedule approved!");
        } else {
            toast.error("Schedule rejected!");
        }
    };

    return (
        <div>
            <h2 className="h2">Biomedical Waste Collector Form</h2>
            {data.map((item, index) => {
                return (
                    <div key={index}>
                        <Card style={{ backgroundColor: "white", padding: "12px", marginBottom: "12px", borderRadius: "16px" }}>
                            <Card.Body className="cardbody">
                                <h2>{item.category}</h2>
                                <Card.Text>
                                    <h3>{item.address}</h3>
                                </Card.Text>
                                <Card.Text>
                                    <h4>{item.itemType}</h4>
                                </Card.Text>
                                <Button
                                    className="search-button"
                                    style={{ marginRight: "12px" }}
                                    variant="primary"
                                    onClick={() => handleDisposal(true)}
                                >
                                    Approve
                                </Button>
                                <Button
                                    className="search-button"
                                    variant="primary"
                                    onClick={() => handleDisposal(false)}
                                >
                                    Reject
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default DisposalForm;
