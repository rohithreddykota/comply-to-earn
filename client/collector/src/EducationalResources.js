import React from 'react';
import './EducationResource.css';

const EducationalResources = () => {
    return (
        <div className="educational-resources">
            <h2>Educational Resources</h2>
            <p>
                Proper disposal of biomedical waste is crucial for the environment and public health. Join us in safeguarding the environment and public health. Let's make a difference together! Here are some educational resources to raise awareness about responsible waste disposal methods:
            </p>
            <ul>
                <li>
                    <a href="https://www.epa.gov/rcra" target="_blank" rel="noopener noreferrer">EPA Resource Conservation and Recovery Act (RCRA)</a>
                </li>
                <li>
                    <a href="https://www.who.int/campaigns/world-blood-donor-day/2019/en/" target="_blank" rel="noopener noreferrer">World Health Organization: Safe Blood Transfusion</a>
                </li>
                <li>
                    <a href="https://www.cdc.gov/infectioncontrol/basics/index.html" target="_blank" rel="noopener noreferrer">CDC Infection Control Basics</a>
                </li>
                <li>
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK138703/" target="_blank" rel="noopener noreferrer">Guidelines for Hospital Waste Management</a>
                </li>
                <li>
                    <a href="https://www.medicalwastecompany.com/blog/medical-waste-color-coding-guide/" target="_blank" rel="noopener noreferrer">Medical Waste Color Coding Guide</a>
                </li>
            </ul>
        </div>
    );
};

export default EducationalResources;
