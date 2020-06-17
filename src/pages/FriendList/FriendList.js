import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/firebase'
import { AuthContext } from '../../Auth'

import './FriendList.css'

const FriendList = () => {
	const [friendsId, setFriendsId] = useState([])
	const [friendsData, setFriendsData] = useState([])
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		api.getUserFriends(currentUser.uid).then((friends) => {
			setFriendsId(friends)
			console.log(friends)
		})
	}, [currentUser.uid])

	useEffect(() => {
		console.log(friendsData)
	}, [friendsData])
	useEffect(() => {
		friendsId.forEach((friendId) => {
			api.getUserData(friendId).then((friend) => {
				setFriendsData(...friendsData, [friend])
			})
		})
	}, [friendsId])

	return (
		<>
			<div>
				{friendsData.map((friend, index) => (
					<div className='friendList-item' key={index}>
						<h4>
							{friend.profile.nickname} |{' '}
							{friend.profile.islandName}
						</h4>
						<Link to={'/profile/' + friend.profile.id}>
							<button>Visit</button>
						</Link>
					</div>
				))}
			</div>
		</>
	)
}

export default FriendList
