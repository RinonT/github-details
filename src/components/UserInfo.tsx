export type UserProfileData = {
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

interface UserInfoProps {
  userProfile: UserProfileData;
}

export const UserInfo: React.FC<UserInfoProps> = (props) => {
  return (
    <div>
      <h2>About</h2>
      <div>
        <div className="user_avatar_container">
          <img
            className="user_avatar"
            src={props.userProfile.avatar_url}
            alt={`${props.userProfile.login}'s avatar`}
          />
        </div>
        <div className="user_info bio">
          <p>{props.userProfile.name}</p>
          <p>{props.userProfile.bio}</p>
        </div>
        <div className="user_ifo location">
          {props.userProfile.location && (
            <p>
              <b>Location:</b> {props.userProfile.location}
            </p>
          )}
          {props.userProfile.company && (
            <p>
              <b>Company:</b> {props.userProfile.company}
            </p>
          )}
        </div>
        <div className="user_info work">
          <p>
            <b>Public repos:</b> {props.userProfile.public_repos}
          </p>
          {props.userProfile.blog && (
            <p>
              <b>User website or portfolio:</b>{" "}
              <a href={props.userProfile.blog}>{props.userProfile.blog}</a>
            </p>
          )}
          {props.userProfile.twitter_username && (
            <p>
              <b>Twitter username:</b>{" "}
              <a
                href={`https://twitter.com/${props.userProfile.twitter_username}`}
              >
                {props.userProfile.twitter_username}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
