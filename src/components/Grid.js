import React from 'react';

const Grid = ({ imageData }) => {
  return (
    <div className="grid">
      {imageData.map((data, index) => (
        <div key={index} className="grid-item">
          <img src={data.image} alt={`Image ${index}`} />
          <p>Latitude: {data.lat}</p>
          <p>Longitude: {data.long}</p>
          <p>Timestamp: {data.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid; 