import React from "react";
import Song from "./Song";

const SongList = ({ songs, userSongs }) => {
	const playSong = (songTitle) => {
		if (audio) audio.pause();
		audio = new Audio(`./assets/songs/${songTitle}.mp3`);
		audio.play();
	};

	let audio;

	return (
		<div
			style={{
				background: `url("./assets/main-background.png")`,
				// paddingLeft: "15vw",
				paddingTop: "40vh",
				width: "100vw",
			}}
		>
			{songs.map((song, index) => (
				<Song
					playSong={playSong}
					key={index}
					index={index}
					song={song}
					owned={userSongs[song]}
				/>
			))}
		</div>
	);
};
export default SongList;
