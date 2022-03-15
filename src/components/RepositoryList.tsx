interface RepositoriesListProps {
  name: string;
  description: string;
  owner: {
    html_url: string;
    login: string;
  };
  visibility: string;
}

export const RepositoriesList: React.FC<RepositoriesListProps> = (props) => {
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
