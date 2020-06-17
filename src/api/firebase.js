import app from '../base'
import React, { AuthContext } from '../Auth'
import { useContext } from 'react'

const getUserFriends = async (uid) => {
	const userDocument = await app
		.firestore()
		.collection('users')
		.doc(uid)
		.get()
	if (userDocument.exists) return userDocument.data().friends
	else return {}
}

const getUserSongs = async (uid) => {
	const userDocument = await app
		.firestore()
		.collection('users')
		.doc(uid)
		.get()
	if (userDocument.exists) return userDocument.data()
	else return {}
}

const getUserData = async (uid) => {
	const userDocument = await app
		.firestore()
		.collection('users')
		.doc(uid)
		.get()
	if (userDocument.exists) return userDocument
	else return {}
}

const registerSong = async (userId, songTitle) => {
	await app
		.firestore()
		.collection('users')
		.doc(userId)
		.set(
			{
				songs: {
					[songTitle]: true,
				},
			},
			{ merge: true }
		)
	return true
}

const addToWishList = async (userId, songTitle) => {
	await app
		.firestore()
		.collection('users')
		.doc(userId)
		.set(
			{
				wishes: {
					[songTitle]: true,
				},
			},
			{ merge: true }
		)
	return true
}

const unregisterSong = async (userId, songTitle) => {
	await app
		.firestore()
		.collection('users')
		.doc(userId)
		.set(
			{
				songs: {
					[songTitle]: false,
				},
			},
			{ merge: true }
		)
	return true
}

const removeFromWishes = async (userId, songTitle) => {
	await app
		.firestore()
		.collection('users')
		.doc(userId)
		.set(
			{
				wishes: {
					[songTitle]: false,
				},
			},
			{ merge: true }
		)
	return true
}

const saveProfile = async (uid, profile) => {
	await app.firestore().collection('users').doc(uid).set(
		{
			profile: profile,
		},
		{ merge: true }
	)
	return true
}

const api = {
	registerSong,
	unregisterSong,
	getUserSongs,
	getUserFriends,
	saveProfile,
	getUserData,
	addToWishList,
	removeFromWishes,
}

export default api

class User {
	/**
	 *
	 * @param {string} nickname
	 * @param {string} friendCode
	 * @param {string} nativeFruit
	 * @param {string} islandName
	 */
	constructor(nickname, friendCode, nativeFruit, islandName) {
		this.nickname = nickname
		this.friendCode = friendCode
		this.nativeFruit = nativeFruit
		this.islandName = islandName
		this.ownedSongs = {}
		this.wishList = {}
		this.frientList = []
	}
}
