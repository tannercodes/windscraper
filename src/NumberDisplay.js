import React, { Component } from 'react';
import './App.css';

const NumberDisplay = ({number, name, title}) => {
	return (
		<div className={name}>
			<p className="title">{title}</p>
			<p className="number">{number}</p>
		</div>
	)
}

export default NumberDisplay;