import React, { useState } from "react";
import userSongs from "../data/user-songs-mock";
import "./Song.css";

const Song = ({ playSong, pauseSong, song, owned, index }) => {
	const [isOwned, setIsOwned] = useState(owned);
	const [playing, setPlaying] = useState(false);
	const [ownedSongs, setOwnedSongs] = useState(userSongs);

	const showOptions = () => {};

	const removeSong = (songTitle) => {
		ownedSongs[songTitle] = false;
		setOwnedSongs(ownedSongs);
		setIsOwned(false);
	};

	const addSong = (songTitle) => {
		ownedSongs[songTitle] = true;
		setOwnedSongs(ownedSongs);
		setIsOwned(true);
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
					height: 200 + "px",
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
						<button onClick={() => removeSong(song.title)}>Remover</button>
					) : (
						<button onClick={() => addSong(song.title)}>Adicionar</button>
					)}
				</div>
			</label>
		</div>
	);
};

export default Song;
