import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

import SongList from "./pages/SongList/SongList";
import Login from "./pages/Login";
import ProfileEdit from "./pages/Profile/Edit";
import ProfileView from "./pages/Profile/View";

export default function Routes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<PrivateRoute exact path="/" component={SongList} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/profile" component={ProfileEdit} />
					<Route exact path="/profile/view" component={ProfileView} />
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}
