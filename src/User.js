import React, { Component } from 'react';
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

class User extends Component {
  render() {
    const { loading, error, data } = this.props;

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const { name, login, url, bioHTML, avatarUrl } = data.user;

    return (
      <div>
        <img src={avatarUrl} img="" />
        <h1>{name}</h1>
        <a href={url} target="_blank">@{login}</a>
        <p>{<span dangerouslySetInnerHTML={{ __html: bioHTML }} /> || <em>No Bio</em>}</p>
      </div>
    );
  }
}

const query = gql`
  query ($username: String!) {
    user(login: $username) {
      url
      name
      login
      bioHTML
      avatarUrl
    }
  }
`;

export default props => (
  <Query query={query} variables={props}>
    {res => <User {...res} {...props} />}
  </Query>
);
