import React, { useState, useEffect, useContext } from "react"
import songs from "../../data/songs-mock"
import Song from "../../components/Song"

import api from "../../api/firebase"
import { AuthContext } from "../../Auth"
import "./SongList.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faPlay,
	faPause,
	faHeart,
	faHeartBroken,
} from "@fortawesome/free-solid-svg-icons"

const SongList = () => {
	const { currentUser } = useContext(AuthContext)
	const [userSongs, setUserSongs] = useState(null)
	const [allSongs, setAllSongs] = useState(songs)
	const [playingSong, setPlayingSong] = useState("")
	const [audio, setAudio] = useState(new Audio())
	const [allSongsFilter, setAllSongsFilter] = useState(true)

	const removeSong = async (songTitle) => {
		await api.unregisterSong(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs)
		})
	}

	const addSong = async (songTitle) => {
		await api.registerSong(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs)
		})
	}

	const filterSongs = (filter = "") => {
		if (filter === "user-songs") {
			setAllSongs(
				songs.filter((song) => {
					if (userSongs[song.title]) {
						return song
					}
				})
			)
		} else if (filter === "all-songs") {
			console.log(filter)
			setAllSongs(songs)
		} else {
			setAllSongs(
				songs.filter((song) => {
					if (song.title.toLowerCase().includes(filter.toLowerCase()))
						return song
				})
			)
		}
	}

	useEffect(() => {
		console.log("usuário", currentUser)
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs)
		})
	}, [currentUser.uid])

	const playSong = (songTitle) => {
		if (audio) audio.pause()
		setPlayingSong(songTitle)
		const newAudio = new Audio(`./assets/songs/${songTitle}.mp3`)
		newAudio.autoplay = true
		newAudio.onended = () => setPlayingSong("")
		setAudio(newAudio)
	}

	const pauseSong = () => {
		setPlayingSong("")
		if (audio) audio.pause()
	}

	return (
		userSongs && (
			<>
				<div>
					{allSongsFilter && (
						<div>
							<input
								type='text'
								onChange={(event) => {
									filterSongs(event.target.value)
								}}></input>
						</div>
					)}

					<div>
						<input
							onChange={() => {
								setAllSongsFilter(true)
								filterSongs("all-songs")
							}}
							type='radio'
							name='songs'
							id='all-songs'
							value='all-songs'></input>
						<label htmlFor='all-songs'>Todas as músicas</label>
						<input
							onChange={() => {
								setAllSongsFilter(false)

								filterSongs("user-songs")
							}}
							type='radio'
							name='songs'
							id='user-songs'
							value='user-songs'></input>
						<label htmlFor='user-songs'>Minhas músicas</label>
					</div>
					<div>
						{allSongs.map((song, index) => (
							<div className='song-card' key={index}>
								<input
									className='Input'
									id={index}
									type='checkbox'
									style={{ display: "none" }}></input>
								<label
									className='Label'
									style={{
										display: "block",
										backgroundImage: `url("assets/covers/${song.title}.png")`,
										backgroundSize: "cover",
										filter: `${
											userSongs[song.title]
												? "grayscale(0)"
												: "grayscale(1)"
										}`,
									}}
									htmlFor={index}>
									<div className='options'>
										{playingSong === song.title ? (
											<button
												onClick={() => {
													pauseSong()
												}}>
												<FontAwesomeIcon
													icon={faPause}
												/>
											</button>
										) : (
											<button
												onClick={() => {
													playSong(song.title)
												}}>
												<FontAwesomeIcon
													icon={faPlay}
												/>
											</button>
										)}
										{userSongs[song.title] ? (
											<button
												onClick={() =>
													removeSong(song.title)
												}>
												<FontAwesomeIcon
													icon={faHeartBroken}
												/>
											</button>
										) : (
											<button
												onClick={() =>
													addSong(song.title)
												}>
												{" "}
												<FontAwesomeIcon
													icon={faHeart}
												/>
											</button>
										)}
									</div>
								</label>
							</div>
						))}
					</div>
				</div>
				<div hidden={!playingSong} id='snackbar'>
					<button
						className='snackBarButton'
						onClick={() => {
							pauseSong()
						}}>
						<FontAwesomeIcon icon={faPause} />
					</button>
					Now Playing: {playingSong}
				</div>
			</>
		)
	)
}
export default SongList
