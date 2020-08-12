import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "./Auth"

<<<<<<< HEAD:.old/src/routes.js
import SongList from "./pages/SongList/SongList";
import Login from "./pages/Login";
import ProfileEdit from "./pages/Profile/Edit";
import ProfileView from "./pages/Profile/View";
=======
import SongList from "./pages/SongList/SongList"
import Login from "./pages/Login"
import Profile from "./pages/Profile/Profile"
import Friendlist from "./pages/FriendList/FriendList"
import FriendProfile from "./pages/FriendProfile/FriendProfile"
>>>>>>> 6ee50f4c4923e6ff847f9e1e3a7914bbe7e32971:src/routes.js

export default function Routes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<PrivateRoute exact path="/" component={SongList} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute
						exact
						path="/profile/:id"
						component={FriendProfile}
					/>
					<PrivateRoute
						exact
						path="/friendlist"
						component={Friendlist}
					/>
					<Route exact path="/login" component={Login} />
<<<<<<< HEAD:.old/src/routes.js
					<Route exact path="/profile" component={ProfileEdit} />
					<Route exact path="/profile/view" component={ProfileView} />
=======
>>>>>>> 6ee50f4c4923e6ff847f9e1e3a7914bbe7e32971:src/routes.js
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
}
