import React, { useState, useContext } from "react";
import userSongs from "../data/user-songs-mock";
import "./Song.css";

import api from "../api/firebase";
import { AuthContext } from "../Auth";

const Song = ({ playSong, pauseSong, song, owned, index }) => {
	const { currentUser } = useContext(AuthContext);

	const [isOwned, setIsOwned] = useState(owned);
	const [playing, setPlaying] = useState(false);
	const [ownedSongs, setOwnedSongs] = useState(userSongs);

	const removeSong = () => {
		ownedSongs[song.title] = false;
		setOwnedSongs(ownedSongs);
		setIsOwned(false);
		api.unregisterSong(currentUser.uid, song.title);
	};

	const addSong = () => {
		ownedSongs[song.title] = true;
		setOwnedSongs(ownedSongs);
		setIsOwned(true);
		api.registerSong(currentUser.uid, song.title);
	};

	return (
		<div className="song-card" key={index}>
			<input
				className="Input"
				id={index}
				type="checkbox"
				style={{ display: "none" }}
			></input>
			<label
				className="Label"
				style={{
					display: "block",
					background: `url("assets/covers/${song.title}.png")`,
					backgroundSize: "cover",
					filter: `${isOwned ? "grayscale(0)" : "grayscale(1)"}`,
				}}
				htmlFor={index}
			>
				<div className="options">
					{playing ? (
						<button
							onClick={() => {
								setPlaying(false);
								pauseSong(song.title);
							}}
						>
							Pausar
						</button>
					) : (
						<button
							onClick={() => {
								setPlaying(true);
								playSong(song.title);
							}}
						>
							Tocar
						</button>
					)}
					{isOwned ? (
						<button onClick={() => removeSong()}>Remover</button>
					) : (
						<button onClick={() => addSong()}>Adicionar</button>
					)}
				</div>
			</label>
		</div>
	);
};

export default Song;
