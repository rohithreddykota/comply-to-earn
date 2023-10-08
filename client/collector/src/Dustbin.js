// Dustbin.js
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './App.css';

const Dustbin = ({ color, items, textColor }) => {
    return (
        <div className={`dustbin ${color}`}>
            <FaTrash />
            <div className="dustbin-text" style={{ color: textColor }}>
                {items.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
};

export default Dustbin;