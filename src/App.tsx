import "./App.css";
import useSWR from "swr";
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
  const [githubData, setGithubData] = useState([]);

  const { register, handleSubmit } = useForm();

  const fetcher = () =>
    fetch(`https://api.github.com/users/${githubUsername}/repos`).then((res) =>
      res.json()
    );

  const { data, error } = useSWR(
    `https://api.github.com/usersa/${githubUsername}/repos`,
    fetcher
  );

  useEffect(() => {
    setGithubData(data);
  }, [data, githubUsername]);

  const onSubmit = (data: any) => {
    setGithubUsername(data.username);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Type your github username to see details</h3>
        <div>
          <input type="text" {...register("username", { required: true })} />
          <button>Search</button>
        </div>
      </form>
      {!githubData && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {githubData &&
        githubData.map((repo: any) => (
          <RepositoriesList key={repo.id} {...repo} />
        ))}
    </div>
  );
}

export default App;
