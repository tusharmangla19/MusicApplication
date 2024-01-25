import React, { useRef, useEffect, useState } from "react";
import Modal from "react-modal";
import "./SongModal.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		width: "90%",
		maxWidth: "1000px",
		maxHeight: "75%",
		backgroundColor: "rgb(0 0 0 / 47%)", // Dark background color
		boxShadow: " 0 42px 38px rgba(0, 0, 0, 0.3)",
		padding: "20px",
		borderRadius: "10px",
		border: "none",
		color: "#fff", // Text color
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
};

Modal.setAppElement("#root");

const SongModal = ({
	isOpen,
	onRequestClose,
	song,
	playNextSong,
	playPreviousSong,
}) => {
	const audioRef = useRef(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
			audioRef.current.play().catch((e) => {
				setError("Song Not Available");
			});
			audioRef.current.addEventListener("error", (e) => {
				setError("Error: An audio playback error occurred.");
			});
		}
	}, [song]);

	const closeAndClearError = () => {
		setError(null);
		onRequestClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeAndClearError}
			style={customStyles}
			contentLabel="Song Information Modal"
		>
			{error ? (
				<div className="error-message">{error}</div>
			) : (
				<div className="song-modal">
					<img src={song.album.images[0].url} alt="Album Cover" />
					<audio ref={audioRef} controls>
						<source src={song.preview_url} type="audio/mpeg" />
					</audio>
					<div className="songDetails">
						<p>Song: {song.name}</p>
						<p>
							Artist: {song.artists.map((artist) => artist.name).join(", ")}
						</p>
						<p>Album: {song.album.name}</p>
					</div>
					<div className="modal-buttons">
						<button onClick={playPreviousSong}>Previous</button>
						<button onClick={playNextSong}>Next</button>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default SongModal;
