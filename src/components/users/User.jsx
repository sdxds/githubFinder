import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, user, loading, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login); //login coming from url /user/:login in app.js route path
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  // componentDidMount is user when there is class based component

  //   componentDidMount() {
  //     getUser(this.props.match.params.login); //login coming from url /user/:login in app.js route path
  //     getUserRepos(this.props.match.params.login);
  //   }

  const {
    name,
    login,
    company,
    avatar_url,
    html_url,
    blog,
    location,
    hireable,
    bio,
    followers,
    following,
    public_repos,
    public_gists
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to={"/"} className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fa fa-check text-success" />
      ) : (
        <i className="fa fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location : {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
