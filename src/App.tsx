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

function App() {
  const [githubUsername, setGithubUsername] = useState("ganamavo");
  const [githubRepos, setGithubRepos] = useState([]);
  const [error, setError] = useState<unknown | string>("");

  const { register, handleSubmit } = useForm();

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
      {githubRepos.length > 0 &&
        githubRepos.map((repo: any) => (
          <RepositoriesList key={repo.id} {...repo} />
        ))}
    </div>
  );
}

export default App;
