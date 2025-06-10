import { useEffect, useState } from "react";

function Body() {
  const [profile, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function searchProfile(username) {
    if (!username) return; 
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();

    setProfile(data.items || []); 
  }

  useEffect(() => {
    searchProfile("john"); 
  }, []);

  return (
    <div className="but">
      <input
        type="text"
        className="inpu"
        placeholder="Search GitHub username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => searchProfile(searchTerm)}>Search Profile</button>

      <div className="profiles">
        {profile.map((user) => (
          <div key={user.id} className="cards">
            <img src={user.avatar_url} alt={user.login} />
            <h2>{user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
