import React, { useState, useEffect, useContext } from "react"
import "./Profile.css"

import api from "../../api/firebase"
import { AuthContext } from "../../Auth"

const Profile = () => {
	const { currentUser } = useContext(AuthContext)
	console.log("Current User", currentUser)
	// Aqui ele imprime

	const [friendCode, setFriendCode] = useState()

	useEffect(() => {
		console.log("aqui", currentUser)
		// Aqui dá nulo
		if (currentUser) {
			api.getUserSongs(currentUser.uid).then((songs) => {
				// console.log(songs);
			})
		}
	}, [currentUser])

	const saveProfile = async () => {
		await api.saveProfile("123", {
			friendCode: "1234-5678-9102",
			profilePicture: "assets/profile-pictures/isabelle.png",
		})
	}

	return (
		<div>
			<h1>Perfil</h1>

			<div className='profile-card'>
				<input
					className='Input'
					type='checkbox'
					style={{ display: "none" }}></input>
				<label
					className='Label'
					style={{
						display: "block",
						backgroundImage: `url("assets/profile-pictures/isabelle.png")`,
						backgroundSize: "cover",
					}}></label>
			</div>

			<div>
				<label>Apelido:</label>
				<input type='text'></input>
			</div>
			<div>
				<label>Friend Code:</label>
				<input type='text'></input>
			</div>
			<button
				onClick={() => {
					saveProfile()
				}}>
				Salvar
			</button>
		</div>
	)
}

export default Profile
