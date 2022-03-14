import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const RepositoriesList = (props: any) => {
  return (
    <div className="list_container">
      <h2>{props.name}</h2>
      <div className="description_container">
        <p>
          {props.description ? props.description : "No description provided!"}
        </p>
      </div>
      <div className="owner_container">
        <span>
          Owner: <a href={props.owner.html_url}>{props.owner.login}</a>
        </span>
        <span>Repo's visibility: {props.visibility}</span>
      </div>
    </div>
  );
};

type UserProfileData = {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  public_repos: number;
  twitter_username: string;
};

const userDefaulValue = {
  avatar_url: "https://avatars.githubusercontent.com/u/60210091?v=4",
  login: "ganamavo",
  company: "Onja",
  name: "Rinon Tendrinomena",
  bio: "I am a professional front-end developer for Protect Our Winters UK with experience contributing to React applications using TypeScript and Next.js.",
  location: "Mahanoro, Madagascar",
  blog: "https://rinon.onja.org/",
  public_repos: 61,
  twitter_username: "Tojo_Rinon",
};

function App() {
  const [githubUsername, setGithubUsername] = useState("ganamavo");
  const [githubRepos, setGithubRepos] = useState([]);
  const [error, setError] = useState<unknown | string>("");
  const [userProfile, setUserProfile] =
    useState<UserProfileData>(userDefaulValue);

  const { register, handleSubmit } = useForm();

  const getUserProfile = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername}`);
      const data = await res.json();
      if (data.login) {
        setUserProfile(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  const getRepos = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      const data = await res.json();

      if (data.length) {
        setGithubRepos(data);
      } else {
        setError(data.message);
        setGithubRepos([]);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getRepos();
    getUserProfile();
  }, [githubUsername]);

  const onSubmit = (data: any) => {
    setGithubUsername(data.username);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Type your github username to see details</h3>
        <div className="search_container">
          <div>
            <input type="text" {...register("username", { required: true })} />
            <span> </span>
          </div>
          <button>Search</button>
        </div>
      </form>
      <div>
        {!githubRepos && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {typeof error === "string" && error !== "" && (
          <div className="error_container">
            <p>{error}! Please try an existing username</p>
          </div>
        )}
        {githubRepos.length > 0 && (
          <div>
            <section>
              <div>
                <div className="user_avatar_container">
                  <img
                    className="user_avatar"
                    src={userProfile.avatar_url}
                    alt={`${userProfile.login}'s avatar`}
                  />
                </div>
                <div className="user_info bio">
                  <p>{userProfile.name}</p>
                  <p>{userProfile.bio}</p>
                </div>
                <div className="user_ifo location">
                  {userProfile.location && (
                    <p>
                      <b>Location:</b> {userProfile.location}
                    </p>
                  )}
                  {userProfile.company && (
                    <p>
                      <b>Company:</b> {userProfile.company}
                    </p>
                  )}
                </div>
                <div className="user_info work">
                  <p>
                    <b>Public repos:</b> {userProfile.public_repos}
                  </p>
                  {userProfile.blog && (
                    <p>
                      <b>User website or portfolio:</b>{" "}
                      <a href={userProfile.blog}>{userProfile.blog}</a>
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section>
              {githubRepos.map((repo: any) => (
                <RepositoriesList key={repo.id} {...repo} />
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
