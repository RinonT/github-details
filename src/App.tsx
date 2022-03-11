import "./App.css";
import useSWR from "swr";

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
  const fetcher = () =>
    fetch("https://api.github.com/users/ganamavo/repos").then((res) =>
      res.json()
    );
  const { data, error } = useSWR("/api/user/123", fetcher);

  console.log(data);

  return (
    <div>
      {!data && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {data &&
        data.map((repo: any) => <RepositoriesList key={repo.id} {...repo} />)}
    </div>
  );
}

export default App;
