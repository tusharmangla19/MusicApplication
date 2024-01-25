import React, { useState } from "react";
import SongModal from "./SongModal";

const MusicCard = ({ musicData }) => {
	const [selectedSong, setSelectedSong] = useState(null);
	const [selectedSongIndex, setSelectedSongIndex] = useState(null);

	const handleMusicCardClick = (song, index) => {
		setSelectedSong(song);
		setSelectedSongIndex(index);
	};

	const playNextSong = () => {
		if (
			selectedSongIndex !== null &&
			selectedSongIndex < musicData.length - 1
		) {
			const nextIndex = selectedSongIndex + 1;
			setSelectedSong(musicData[nextIndex]);
			setSelectedSongIndex(nextIndex);
		}
	};

	const playPreviousSong = () => {
		if (selectedSongIndex !== null && selectedSongIndex > 0) {
			const prevIndex = selectedSongIndex - 1;
			setSelectedSong(musicData[prevIndex]);
			setSelectedSongIndex(prevIndex);
		}
	};

	const closeModal = () => {
		setSelectedSong(null);
		setSelectedSongIndex(null);
	};

	return (
		<div className="music-grid">
			{musicData.map((track, index) => (
				<div
					key={track.id}
					className="music-item"
					onClick={() => handleMusicCardClick(track, index)}
				>
					<img src={track.album.images[0].url} alt="Album Cover" />
					<p className="song-title">{track.name}</p>
					<p className="artist-name">
						{track.artists.map((artist) => artist.name).join(", ")}
					</p>
					<p className="album-title">Album: {track.album.name}</p>
				</div>
			))}

			{selectedSong && (
				<SongModal
					isOpen={true}
					onRequestClose={closeModal}
					song={selectedSong}
					playNextSong={playNextSong}
					playPreviousSong={playPreviousSong}
				/>
			)}
		</div>
	);
};

export default MusicCard;
