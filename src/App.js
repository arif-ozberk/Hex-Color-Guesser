import React, { useState, useEffect, useRef } from 'react';

// Styles
import './App.css';


function App() {

	const [hexCodes, setHexCodes] = useState([]);
	const [correctHexCode, setCorrectHexCode] = useState("");
	const hexLetters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];


	const generateHexCode = (hexLetters) => {
		setHexCodes([]);
		const syncHexCodes = [];
		for(let k = 0; k < 3; k++) {
			let hexBase = "#"
			for (let i = 0; i < 6; + i++) {
				hexBase = hexBase + hexLetters[Math.floor(Math.random() * hexLetters.length)]
			}
			syncHexCodes.push(hexBase);
			setHexCodes(prev => [...prev, hexBase]);
		}
		setCorrectHexCode(syncHexCodes[Math.floor(Math.random() * hexCodes.length)]);
	}


	const [isCorrect, setIsCorrect] = useState(null);
	const [isDisplay, setIsDisplay] = useState(false);
	const [userScore, setUserScore] = useState(0);

	const handleButtonClick = (buttonIndex) => {
		setIsDisplay(true);
		if(hexCodes[buttonIndex] === correctHexCode) {
			setIsCorrect(true);
			setUserScore(prev => prev + 1);
		}
		else {
			setIsCorrect(false);
			setUserScore(0);
			if (userScore > localStorage.getItem("highScore")) {
				localStorage.setItem("highScore", userScore);
			}
		} 
	}


	useEffect(() => {
		generateHexCode(hexLetters);
	}, []);


	return (
		<div className="App">
			<p className='high-score'>High Score: {localStorage.getItem("highScore")}</p>
			<p className='user-score'>Current Score: {userScore}</p>
			<div style={{ backgroundColor: correctHexCode }} className='color-container'>

			</div>
			<div className='button-container'>
				{hexCodes.map((hexCode, index) => (
					<button onClick={() => {generateHexCode(hexLetters); handleButtonClick(index)}} key={index}>{hexCode}</button>
				))}
			</div>
			{isDisplay && <h1>{isCorrect ? "Correct!" : "Wrong!"}</h1>}
		</div>
	);
}

export default App;
