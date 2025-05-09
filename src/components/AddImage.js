import React, { useState } from 'react';

const AddImage = ({ onAdd }) => {
  const [image, setImage] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ image, lat, long, timestamp });
    setImage('');
    setLat('');
    setLong('');
    setTimestamp('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-image-form">
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
      <input type="text" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} required />
      <input type="text" placeholder="Longitude" value={long} onChange={(e) => setLong(e.target.value)} required />
      <input type="text" placeholder="Timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} required />
      <button type="submit">Add Image</button>
    </form>
  );
};

export default AddImage; 