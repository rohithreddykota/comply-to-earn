import React, { useState, useEffect } from 'react';
import './App.css';
import { FaSpinner, FaRecycle, FaTrash, FaLeaf, FaComment, FaUsers, FaHistory, FaDollarSign } from 'react-icons/fa';

import Dustbin from './Dustbin';
import DisposalForm from './DisposalForm';
import EducationalResources from './EducationalResources';



const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const dustbins = [
    { color: 'blue', items: ['Syringes', 'Gloves', 'Plastic Waste'], textColor: 'white' },
    { color: 'yellow', items: ['Face Mask', 'Body Parts', 'Body Fluids'], textColor: 'black' },
    { color: 'red', items: ['IV set', 'Urine Bags', 'Dialysis Kit'], textColor: 'black' },
    { color: 'white', items: ['Needles', 'Glass Slides', 'Lancets'], textColor: 'blue' },
    { color: 'black', items: ['Medicines', 'Chemo Waste', 'Radioactive Waste'], textColor: 'white' },
  ];

  return (

    <div className="app-container">
      <h1 className="heading">Comply & Earn</h1>
      {loading ? (
        <FaSpinner className="spinner" />
      ) : (
        <div className="content-container">
          <div className="recycle-icon">
            <FaRecycle />
          </div>
          <div className="leaf-container">
            <FaLeaf className="leaf" />
          </div>
          <div className="trash-can-logo-container">
            <FaTrash className="trash-can-logo" />
          </div>
          <div className="dustbin-container">
            {dustbins.map((dustbin, index) => (
              <Dustbin key={index} color={dustbin.color} items={dustbin.items} textColor={dustbin.textColor} />
            ))}
          </div>
          <div className="form-container">
            <DisposalForm />
          </div>

        </div>
      )}
      <div className="educational-resources-container">
        <EducationalResources />
      </div>
      <div className="sidebar">
        <div className="icon feedback-icon">
          <FaUsers />
        </div>
        <div className="icon community-icon">
          <FaComment />
        </div>
        <div className="icon leaderboard-icon">
          <FaDollarSign />
        </div>
        <div className="icon leaderboard-icon">
          <FaHistory />
        </div>
      </div>
    </div>

  );
};

export default App;
