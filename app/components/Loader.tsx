import React from 'react';

function Loader() {
  const spinnerStyle = {
    width: 50,
    height: 50,
    border: `3px solid #007bff`,
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return <div style={spinnerStyle}></div>;
}

export default Loader;
