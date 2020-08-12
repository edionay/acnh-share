import React from "react";
import "./Navbar.css";

const Navbar = () => (
	<div class="topnav">
		<a class="active" href="/">
			Músicas
		</a>
		<a href="#">Amigos</a>
		<a href="profile">Perfil</a>
		<a href="#">Desejos</a>
		<a href="#">Sair</a>
	</div>
);

export default Navbar;
