import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "./Auth"

import SongList from "./pages/SongList/SongList"
import Login from "./pages/Login"
import Profile from "./pages/Profile/Profile"
import Friendlist from "./pages/FriendList/FriendList"

export default function Routes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<PrivateRoute exact path='/' component={SongList} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute
						exact
						path='/friendlist'
						component={Friendlist}
					/>
					<Route exact path='/login' component={Login} />
				</div>
			</BrowserRouter>
		</AuthProvider>
	)
}
