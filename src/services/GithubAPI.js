class GithubAPI {
	static async getUserName(username) {
		return fetch(`https://api.github.com/users/${username}`).then((response) => {
			return response.json().then((response) => {
				return response.name;
			});
		});
	}
}

export default GithubAPI;
