import React from "react";
import SongList from "./SongList";

import songs from "./songs-mock";
import userSongs from "./user-songs-mock";

import "./App.css";

function App() {
	return (
		<>
			<div
				style={{
					height: "40vh",
					width: "100vw",
					background: "url(./assets/header-background.png)",
					backgroundRepeat: "repeat-x",
					position: "fixed",
					top: 0,
					zIndex: 1,
				}}
			></div>
			<SongList
				style={{ paddingTop: "30vh" }}
				songs={songs}
				userSongs={userSongs}
			/>
		</>

		// <div className="App">
		// 	<header className="App-header">
		// 		<img src={logo} className="App-logo" alt="logo" />
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<a
		// 			className="App-link"
		// 			href="https://reactjs.org"
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 		>
		// 			Learn React
		// 		</a>
		// 	</header>
		// </div>
	);
}

export default App;
