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
	faShoppingBasket,
	faPlus,
	faCheck,
	faTimes,
} from "@fortawesome/free-solid-svg-icons"

const SongList = () => {
	const { currentUser } = useContext(AuthContext)
	const [userSongs, setUserSongs] = useState(null)
	const [wishes, setWishes] = useState(null)
	const [allSongs, setAllSongs] = useState(songs)
	const [playingSong, setPlayingSong] = useState("")
	const [audio, setAudio] = useState(new Audio())
	const [allSongsFilter, setAllSongsFilter] = useState(true)
	const [selectedTab, setSelectedTab] = useState("all-songs")

	useEffect(() => {
		console.log("usuário", currentUser)
		api.getUserSongs(currentUser.uid).then((songs) => {
			setUserSongs(songs)
		})
	}, [currentUser.uid])

	const removeSong = async (songTitle) => {
		await api.unregisterSong(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((userData) => {
			setUserSongs(userData.songs)
			setWishes(userData.wishes)
		})
	}

	const addSong = async (songTitle) => {
		await api.registerSong(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((userData) => {
			setUserSongs(userData.songs)
			setWishes(userData.wishes)
		})
	}

	const wishSong = async (songTitle) => {
		await api.addToWishList(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((userData) => {
			setUserSongs(userData.songs)
			setWishes(userData.wishes)
			// filterSongs("wishes");
		})
	}

	const removeWish = async (songTitle) => {
		await api.removeFromWishes(currentUser.uid, songTitle)
		api.getUserSongs(currentUser.uid).then((userData) => {
			console.log("atualizou")
			setUserSongs(userData.songs)
			setWishes(userData.wishes)
			filterSongs("wishes")
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
		} else if (filter === "wishes") {
			setAllSongs(
				songs.filter((song) => {
					if (wishes[song.title]) {
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
		api.getUserSongs(currentUser.uid).then((userData) => {
			setUserSongs(userData.songs)
			setWishes(userData.wishes)
			if (selectedTab === "wishes") filterSongs("wishes")
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
		userSongs &&
		wishes && (
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
								setSelectedTab("all-songs")
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
								setSelectedTab("user-songs")
								setAllSongsFilter(false)
								filterSongs("user-songs")
							}}
							type='radio'
							name='songs'
							id='user-songs'
							value='user-songs'></input>
						<label htmlFor='user-songs'>Minhas músicas</label>
						<input
							onChange={() => {
								setSelectedTab("wishes")
								setAllSongsFilter(false)
								filterSongs("wishes")
							}}
							type='radio'
							name='songs'
							id='wishes'
							value='wishes'></input>
						<label htmlFor='wishes'>Lista de desejos</label>
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
													icon={faCheck}
												/>
											</button>
										) : (
											<button
												onClick={() =>
													addSong(song.title)
												}>
												{" "}
												<FontAwesomeIcon
													icon={faPlus}
												/>
											</button>
										)}
										{!wishes[song.title] && (
											<button
												onClick={() => {
													wishSong(song.title)
												}}>
												<FontAwesomeIcon
													icon={faShoppingBasket}
												/>
											</button>
										)}
										{wishes[song.title] &&
											selectedTab === "wishes" && (
												<button
													onClick={() => {
														removeWish(song.title)
													}}>
													<FontAwesomeIcon
														icon={faTimes}
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
