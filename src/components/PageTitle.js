import React from "react";
import "./PageTitle.css";

const PageTitle = ({ title }) => (
	<div className="page-title">
		<div style={{ background: "black" }}>
			<h1>{title}</h1>
		</div>
	</div>
);

export default PageTitle;
