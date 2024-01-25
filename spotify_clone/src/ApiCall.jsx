import React, { useEffect, useState } from "react";

const ApiCall = ({ accessToken, setMusicData, search }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (accessToken && search) {
			setLoading(true);
			setError(null);

			fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					if (data.tracks && data.tracks.items) {
						setMusicData(data.tracks.items);
					}
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		}
	}, [accessToken, search]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return null;
};

export default ApiCall;
