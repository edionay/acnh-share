import React, { useState, useEffect, useContext } from "react"
import "./Profile.css"

<<<<<<< HEAD:.old/src/pages/Profile/Edit/index.js
import api from "../../../api/firebase";
import { AuthContext } from "../../../Auth";

const ProfileEdit = () => {
	const { currentUser } = useContext(AuthContext);
=======
import api from "../../api/firebase"
import { AuthContext } from "../../Auth"

const Profile = () => {
	const { currentUser } = useContext(AuthContext)
>>>>>>> 6ee50f4c4923e6ff847f9e1e3a7914bbe7e32971:src/pages/Profile/Profile.js

	const [friendCode, setFriendCode] = useState("")
	const [nickname, setNickname] = useState("")
	const [hemisphere, setHemisphere] = useState("")
	const [islandName, setIslandName] = useState("")
	const [nativeFruit, setNativeFruit] = useState("")
	const [profilePicture, setProfilePicture] = useState("")

	useEffect(() => {
		if (currentUser) {
			api.getUserData(currentUser.uid).then((userData) => {
				setHemisphere(userData.data().profile.hemisphere)
				setNickname(userData.data().profile.nickname)
				setIslandName(userData.data().profile.islandName)
				setNativeFruit(userData.data().profile.nativeFruit)
				setFriendCode(userData.data().profile.friendCode)
				setProfilePicture(userData.data().profile.profilePicture)
			})
		}
	}, [currentUser])

	const saveProfile = async () => {
		const userData = {
			nickname,
			islandName,
			hemisphere,
			nativeFruit,
			friendCode,
			profilePicture,
		}
		await api.saveProfile(currentUser.uid, userData)
	}

	const profilePictures = ["Isabelle", "Mario", "Luigi", "KK", "Peach"]

	return (
		<div>
			<h1>Perfil</h1>

			{profilePictures.map((pictureName) => {
				return (
					<div key={pictureName} className="profile-card">
						<input
							id={pictureName}
							className="Input"
							type="radio"
							name="profilePicture"
							value={pictureName}
							checked={pictureName === profilePicture}
							onChange={(e) =>
								setProfilePicture(e.target.value)
							}></input>
						<label
							className="Label"
							htmlFor={pictureName}
							style={{
								display: "block",
								backgroundImage: `url("assets/profile-pictures/${pictureName}.png")`,
								backgroundSize: "cover",
							}}></label>
					</div>
				)
			})}

			<div>
				<label>Apelido:</label>
				<input
					onChange={(e) => setNickname(e.target.value)}
					type="text"
					defaultValue={nickname}></input>
			</div>
			<div>
				<label>Friend Code:</label>
				<input
					onChange={(e) => {
						setFriendCode(e.target.value)
					}}
					type="text"
					defaultValue={friendCode}></input>
			</div>
			<div>
				<label>Nome da ilha:</label>
				<input
					onChange={(e) => setIslandName(e.target.value)}
					type="text"
					defaultValue={islandName}></input>
			</div>
			<div>
				<label>Fruta nativa:</label>
				<select
					name="select"
					value={nativeFruit}
					onChange={(e) => setNativeFruit(e.target.value)}>
					<option value="">Selecione...</option>
					<option value="pear">Pera</option>
					<option value="orange">Laranja</option>
					<option value="cherry">Cereja</option>
					<option value="peach">Pêssego</option>
					<option value="apple">Maçã</option>
				</select>
			</div>
			<div>
				<label>Hemisfério:</label>
				<select
					name="select"
					value={hemisphere}
					onChange={(e) => setHemisphere(e.target.value)}>
					<option value="">Selecione...</option>
					<option value="north">Norte</option>
					<option value="south">Sul</option>
				</select>
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

<<<<<<< HEAD:.old/src/pages/Profile/Edit/index.js
export default ProfileEdit;
=======
export default Profile
>>>>>>> 6ee50f4c4923e6ff847f9e1e3a7914bbe7e32971:src/pages/Profile/Profile.js
