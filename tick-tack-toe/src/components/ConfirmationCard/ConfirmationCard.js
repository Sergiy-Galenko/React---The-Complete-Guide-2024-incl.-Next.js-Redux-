import React from 'react';
import './ConfirmationCard.css';

const ConfirmationCard = ({ message, onDismiss }) => {
  return (
    <div className="modal-overlay">
      <div className="card">
        <button className="dismiss" type="button" onClick={onDismiss}>×</button>
        <div className="header">
          <div className="image">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </div>
          <div className="content">
            <span className="title">Дія підтверджена</span>
            <p className="message">{message}</p>
          </div>
        </div>
        <div className="actions">
          <button className="history" type="button">Історія</button>
          <button className="track" type="button">Відстежити</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
