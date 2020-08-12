import React from "react";
import { view } from "@risingstack/react-easy-state";

import "./SongCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSquare } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const SongCard = view(({ song, appState }) => (
	<div className="song-card">
		<div className="card-wrapper">
			<img
				style={{ width: "100%" }}
				src={`/assets/covers/${song.title}.png`}
			/>
			<div className="card-options">
				<FontAwesomeIcon icon={faStar} />

				{appState.currentSong !== song.title ? (
					<FontAwesomeIcon
						icon={faPlay}
						onClick={() => appState.playSong(song.title)}
					/>
				) : (
					<FontAwesomeIcon
						icon={faSquare}
						onClick={() => appState.stopSong()}
					/>
				)}
			</div>
			<span>{song.title}</span>
		</div>
	</div>
));

export default SongCard;
