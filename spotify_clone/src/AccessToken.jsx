import { useEffect } from "react";
const AccessToken = ({ accessToken, setAccessToken }) => {
	useEffect(() => {
		const clientId = "976d83b6a474442798f9a7ec14f86b85";
		const clientSecret = "5c6d6be7c9c74148908c272269cba4a1";

		// Step 1: Obtaining an Access Token
		const authParameters = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body:
				"grant_type=client_credentials&client_id=" +
				clientId +
				"&client_secret=" +
				clientSecret,
		};

		fetch("https://accounts.spotify.com/api/token", authParameters)
			.then((results) => results.json())
			.then((data) => setAccessToken(data.access_token));
	}, []);
	console.log(accessToken);
};

export default AccessToken;
