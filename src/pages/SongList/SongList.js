import React, { useState, useEffect, useContext } from "react"
import songs from "../../data/songs-mock"
import Song from "../../components/Song"

import api from "../../api/firebase"
import { AuthContext } from "../../Auth"
import "./SongList.css"

const SongList = () => {
	const { currentUser } = useContext(AuthContext)
	const [userSongs, setUserSongs] = useState(null)

	useEffect(() => {
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs)
		})
	}, [currentUser.uid])

	const playSong = (songTitle, setPlaying) => {
		if (audio) audio.pause()
		audio = new Audio(`./assets/songs/${songTitle}.mp3`)
		audio.play()
	}

	const pauseSong = (songTitle, toggleButton) => {
		if (audio) audio.pause()
	}

	let audio

	return userSongs ? (
		<div
			style={{
				paddingTop: "30vh",
				width: "100%",
				textAlign: "center",
			}}>
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
	) : (
		<></>
	)
}
export default SongList
