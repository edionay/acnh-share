import React, { useEffect, useState } from "react";
import app from "./base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			app
				.firestore()
				.collection("users")
				.doc(user.uid)
				.onSnapshot((userDocument) => {
					setUser({ uid: userDocument.uid, ...userDocument.data() });
				});
			setCurrentUser(user);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, user }}>
			{children}
		</AuthContext.Provider>
	);
};
