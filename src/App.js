import React from "react";
import Routes from "./routes"
import "./App.css";
import SongList from "./SongList";

import songs from "./songs-mock";
import userSongs from "./user-songs-mock";

function App() {
	return (<div> 
        <div>
          <Routes/>
        </div>
      </div>
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
