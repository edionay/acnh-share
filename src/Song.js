import React, { useState } from "react";

const Song = ({ song, owned, index }) => {
	const [selected, setSelected] = useState(owned);
	// const audio = new Audio(
	// 	"https://nookipedia.com/w/images/f/fb/NH_BGM_Audio_090_Disco_Hifi.flac"
	// );

	return (
		<div
			style={{
				display: "inline-block",
				width: 200 + "px",
				height: 200 + "px",
				margin: 10 + "px",
			}}
			key={index}
		>
			<input
				onClick={() => {
					setSelected(!selected);
					// console.log(selected);

					// selected ? audio.pause() : audio.play();
					// // audio.play();
				}}
				className="Input"
				id={index}
				type="checkbox"
				style={{ display: "none" }}
			></input>
			<label
				className="Label"
				style={{
					display: "block",
					background: `url("assets/covers/${song.title}.png")`,
					height: 200 + "px",
					with: 200 + "px",
					backgroundSize: "cover",
					filter: `${selected ? "grayscale(0)" : "grayscale(1)"}`,
				}}
				htmlFor={index}
			></label>
		</div>
	);
};

export default Song;
