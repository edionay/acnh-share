import app from "../base";
import React, { AuthContext } from "../Auth";
import { useContext } from "react";

const getUserSongs = async (uid) => {
	const userDocument = await app
		.firestore()
		.collection("users")
		.doc(uid)
		.get();
	if (userDocument.exists) return userDocument.data().songs;
	else return {};
};

const registerSong = async (userId, songTitle) => {
	await app
		.firestore()
		.collection("users")
		.doc(userId)
		.set(
			{
				songs: {
					[songTitle]: true,
				},
			},
			{ merge: true }
		);
	return true;
};

const unregisterSong = async (userId, songTitle) => {
	await app
		.firestore()
		.collection("users")
		.doc(userId)
		.set(
			{
				songs: {
					[songTitle]: false,
				},
			},
			{ merge: true }
		);
	return true;
};

const saveProfile = async (uid, profile) => {
	await app.firestore().collection("users").doc(uid).set(
		{
			profile: profile,
		},
		{ merge: true }
	);
	return true;
};

const api = {
	registerSong,
	unregisterSong,
	getUserSongs,
	saveProfile,
};

export default api;
