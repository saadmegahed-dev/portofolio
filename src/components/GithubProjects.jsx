import { useEffect, useState } from "react";
import axios from "axios";

function GithubProjects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/users/YOURUSERNAME/repos")
      .then((res) => setRepos(res.data));
  }, []);

  return (
    <div>
      {repos.slice(0, 6).map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
    </div>
  );
}

export default GithubProjects;
