import React, { useState } from "react";
import { view } from "@risingstack/react-easy-state";

import SongCard from "../components/SongCard.js";
import BottomBar from "../components/BottomBar";
import PageTitle from "../components/PageTitle.js";

import songs from "../data/songs-mock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./KKSongList.css";

const KKSongs = view(({ appState }) => {
	const [filteredSongs, setFilteredSongs] = useState(songs);

	const filterSongs = (filter) => {
		setFilteredSongs(
			songs.filter((song) => {
				if (song.title.toLowerCase().includes(filter.toLowerCase()))
					return song;
			})
		);
	};

	return (
		<>
			<main style={{ background: "gray" }}>
				<PageTitle title={"K.K. Songs"} />

				<div className="container search-input">
					<input
						id="kk-songs-search"
						type="text"
						onChange={(event) => {
							filterSongs(event.target.value);
						}}
					/>
					<label htmlFor="kk-songs-search">
						<FontAwesomeIcon icon={faSearch} />
					</label>
				</div>
				<div
					className="container song-list"
					style={{ display: "flex", flexWrap: "wrap" }}
				>
					{filteredSongs.map((song) => (
						<SongCard song={song} appState={appState} />
					))}
				</div>
			</main>
		</>
	);
});

export default KKSongs;
