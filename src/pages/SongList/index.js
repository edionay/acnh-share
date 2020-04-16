import React, { useState, useEffect, useContext } from "react";
import Song from "../../components/Song";
import songs from "../../data/songs-mock";

import api from "../../api/firebase";
import { AuthContext } from "../../Auth";

const SongList = () => {
	const [userSongs, setUserSongs] = useState({});
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		api.getUserSongs(currentUser.uid).then((songs) => {
			console.log(songs);
			setUserSongs(songs);
		});
	});

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
				<Song
					pauseSong={pauseSong}
					playSong={playSong}
					key={index}
					index={index}
					song={song}
					owned={userSongs[song.title]}
				/>
			))}
		</div>
	);
};
export default SongList;
