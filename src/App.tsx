import "./App.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import nextId from "react-id-generator";
import { RepositoriesList } from "./components/RepositoryList";
import { SearchForm } from "./components/SearchForm";
import { UserInfo } from "./components/UserInfo";
import { UserProfileData as UserProfileProps } from "./components/UserInfo";

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
  const username = localStorage.getItem("username");
  const [githubUsername, setGithubUsername] = useState(
    username ? username : "ganamavo"
  );
  const [githubRepos, setGithubRepos] = useState([]);
  const [error, setError] = useState<unknown | string>("");
  const [userProfile, setUserProfile] =
    useState<UserProfileProps>(userDefaulValue);

  // For the pagination
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage] = useState(5);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>();

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

  const onSubmit = (data: { username: string }) => {
    localStorage.setItem("username", data.username);
    setGithubUsername(data.username);
  };

  // Code for the pagination
  useEffect(() => {
    githubRepos.length > 0 &&
      setPageCount(Math.ceil(githubRepos.length / perPage));
  }, [githubRepos]);

  const handlePageClick: (selectedItem: { selected: number }) => void = (
    item
  ) => {
    const selectedPage = item.selected;
    setOffset(selectedPage + 1);
  };

  const githubReposList =
    githubRepos &&
    githubRepos.slice(offset, offset + perPage).map((repo) => {
      return <RepositoriesList key={nextId()} {...repo} />;
    });

  return (
    <div>
      <SearchForm
        handleSubmit={handleSubmit(onSubmit)}
        register={register("username", { required: true })}
        errorMessage={errors.username ? "This field is required" : ""}
      />
      <div>
        {typeof error === "string" && error !== "" && (
          <div className="error_container">
            <p>{error}! Please try an existing username</p>
          </div>
        )}
        {githubRepos.length > 0 ? (
          <div>
            <section>
              <UserInfo userProfile={userProfile} />
            </section>
            <section>
              <h2>
                {userProfile.public_repos > 1 ? "Repositories" : "Repository"}
              </h2>
              {githubReposList}
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </section>
          </div>
        ) : (
          <div className="error_container">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
