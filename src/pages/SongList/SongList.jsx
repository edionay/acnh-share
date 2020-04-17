import React, { useState, useEffect, useContext } from "react";
import songs from "../../data/songs-mock";

import api from "../../api/firebase";
import { AuthContext } from "../../Auth";
import "./SongList.css";

const useUserSongs = (currentUser) => {
	const [userSongs, setUserSongs] = useState({});

	useEffect(() => {
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs);
		});
	}, []);

	return userSongs;
};

const SongList = () => {
	const { currentUser } = useContext(AuthContext);

	const userSongs = useUserSongs(currentUser);

	const playSong = (songTitle) => {
		if (audio) audio.pause();
		audio = new Audio(`./assets/songs/${songTitle}.mp3`);
		audio.play();
	};

	const pauseSong = (songTitle) => {
		if (audio) audio.pause();
	};

	let audio;

	return (
		<div
			style={{
				paddingTop: "30vh",
				width: "100%",
				textAlign: "center",
			}}
		>
			{songs.map((song, index) => (
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
							filter: `${
								userSongs[song.title] ? "grayscale(0)" : "grayscale(1)"
							}`,
						}}
						htmlFor={index}
					>
						<div className="options">
							{true ? <button>Pausar</button> : <button>Tocar</button>}
							{userSongs[song.title] ? (
								<button>Remover</button>
							) : (
								<button>Adicionar</button>
							)}
						</div>
					</label>
				</div>

				// <Song
				// 	pauseSong={pauseSong}
				// 	playSong={playSong}
				// 	key={index}
				// 	index={index}
				// 	song={song}
				// 	owned={userSongs[song.title]}
				// />
			))}
		</div>
	);
};
export default SongList;
