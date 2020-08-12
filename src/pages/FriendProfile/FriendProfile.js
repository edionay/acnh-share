import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import "./FriendProfile.css"

import api from "../../api/firebase"
import { AuthContext } from "../../Auth"

const FriendProfile = () => {
	const { id } = useParams()

	const [user, setUser] = useState([])

	useEffect(() => {
		api.getUserData(id).then((user) => {
			setUser(user)
		})
	}, [])

	return <></>
}

export default FriendProfile
