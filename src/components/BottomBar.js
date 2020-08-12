import React from "react";
import { Link } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faBars,
	faUserFriends,
	faUser,
	faGuitar,
	faStar,
	faSignOutAlt,
	faCogs,
	faSquare,
} from "@fortawesome/free-solid-svg-icons";

import "./BottomBar.css";

const BottomBar = view(({ appState }) => {
	const toggleMenu = () => {
		document
			.getElementById("menu-options")
			.classList.toggle("active-options");
	};
	return (
		<nav className="bottom-bar">
			<ul id="menu-options">
				<li onClick={toggleMenu}>
					<Link to="/">
						<FontAwesomeIcon icon={faGuitar} />
						<span>K.K. Songs</span>
					</Link>
				</li>
				<li>
					<Link>
						<FontAwesomeIcon icon={faStar} />
						<span>Minhas músicas</span>
					</Link>
				</li>
				<li onClick={toggleMenu}>
					<Link to="friends">
						<FontAwesomeIcon icon={faUserFriends} />
						<span>Amigos</span>
					</Link>
				</li>
				<li>
					<Link>
						<FontAwesomeIcon icon={faUser} />
						<span>Perfil</span>
					</Link>
				</li>
				<li>
					<Link>
						<FontAwesomeIcon icon={faCogs} />
						<span>Configurações</span>
					</Link>
				</li>
				<li>
					<Link to="/">
						<FontAwesomeIcon icon={faSignOutAlt} />
						<span>Sair</span>
					</Link>
				</li>
			</ul>
			<div className="nav-summary">
				{appState.currentSong ? (
					<div className="playing-info">
						<img
							style={{ width: "50px" }}
							src={`/assets/covers/${appState.currentSong}.png`}
						/>
						<div className="stop-icon">
							<FontAwesomeIcon
								onClick={appState.stopSong}
								icon={faSquare}
							/>
						</div>

						<div>
							Tocando:
							<br />
							{appState.currentSong}
						</div>
					</div>
				) : (
					<div className="app-logo">ACNH SHARE</div>
				)}

				<div className="menu-icon" onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</div>
			</div>
		</nav>
	);
});

export default BottomBar;
