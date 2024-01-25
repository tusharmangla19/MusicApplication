import { useState, useEffect } from "react";
import AccessToken from "./AccessToken";
import ApiCall from "./ApiCall";
import MusicCard from "./MusicCard";
import Search from "./Search";

function App() {
	const [search, setSearch] = useState(null);
	const [accessToken, setAccessToken] = useState("");
	const [musicData, setMusicData] = useState([]);
	useEffect(() => {
		if (search) {
			<div>
				<ApiCall
					accessToken={accessToken}
					setMusicData={setMusicData}
					search={search}
				></ApiCall>

				<MusicCard musicData={musicData} />
			</div>;
		}
	}, [search, accessToken]);
	return (
		<>
			<h1 className="title">Music App</h1>
			<Search search={search} setSearch={setSearch}></Search>

			<AccessToken setAccessToken={setAccessToken}></AccessToken>

			{search && (
				<ApiCall
					accessToken={accessToken}
					setMusicData={setMusicData}
					search={search}
				></ApiCall>
			)}

			{search && <MusicCard musicData={musicData} />}
		</>
	);
}

export default App;
