import React from "react";
import Song from "./Song";

const SongList = ({ songs, userSongs }) => (
	<div>
		{songs.map((song, index) => (
			<Song key={index} index={index} song={song} owned={userSongs[song]} />
		))}
	</div>
);

export default SongList;
