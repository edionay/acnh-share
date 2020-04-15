import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

import SongList from "./pages/SongList";
import Login from "./pages/Login";

export default function Routes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div>
					<PrivateRoute exact path="/" component={SongList} />
					<Route exact path="/login" component={Login} />
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}
