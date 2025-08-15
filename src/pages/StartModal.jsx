// src/components/StartModal.jsx
import React from 'react';

function StartModal({ onStart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="mb-6 text-gray-600">Ce test dure 35 minutes et comporte 39 questions. L'audio se lancera automatiquement.</p>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Commencer
        </button>
      </div>
    </div>
  );
}

export default StartModal;
