import React from "react";
import Song from "./Song";

const SongList = ({ songs, userSongs }) => (
	<div
		style={{
			background: `url("./assets/main-background.png")`,
			// paddingLeft: "15vw",
			paddingTop: "40vh",
		}}
	>
		{songs.map((song, index) => (
			<Song key={index} index={index} song={song} owned={userSongs[song]} />
		))}
	</div>
);

export default SongList;
