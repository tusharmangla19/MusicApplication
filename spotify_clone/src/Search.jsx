import React, { useState } from "react";

const Search = ({ setSearch }) => {
	const [inputValue, setInputValue] = useState("");

	const handleButtonClick = function (e) {
		setSearch(inputValue);
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="searchBar">
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Search For Songs"
			/>
			<button className="searchButton" onClick={handleButtonClick}>
				Search Song
			</button>
		</div>
	);
};

export default Search;
