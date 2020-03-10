import React from 'react';
import './App.css';
import axios from 'axios';
// import Usercard from "./Usercard";
import styled from 'styled-components';

const Container = styled.div `
  width: 90%;
  display: flex;
  align-items: center;
  margin: 5%;
  flex-direction: column;
`

const Card = styled.div `
  border: 1px solid blue;
  border-radius: 30%;
  height: 200px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  img {
      object-fit: scale-down;
      max-height: 150px;
      border-radius: 20%;
    }

`

class App extends React.Component {
  state = {
    users: [],
    followers: []
  };

  componentDidMount() {
    axios.get('https://api.github.com/users/justinruss24')
    .then(response => {
      // console.log(response.data)
      this.setState({
        users: response.data
      });
    })
    .catch(error => {
      console.log("sorrey", error)
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.users !== this.state.users) {
  //   axios.get('https://api.github.com/users/justinruss24/followers')
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState({
  //         users: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log('sorrey', error)
  //     })
  //   }
  // }

  getFollowers = e => {
    e.preventDefault();
    axios.get('https://api.github.com/users/justinruss24/followers')
      .then(response => {
        console.log(response.data)
        this.setState({
          followers: response.data
        })
      })
      .catch(error => {
        console.log('sorrey', error)
      })
  }

  render() {
    return (
      <Container>
        <h1>React Github UserCard</h1>
        <Card>
          <div>
            <img src={this.state.users.avatar_url} alt={this.state.users.name} />
          </div>
          <div>
            <h3>{this.state.users.name}</h3>
            <p>Github: {this.state.users.login}</p>
          </div>
        </Card>
        <button onClick={this.getFollowers}>Show Followers</button>
        <div>
          {this.state.followers.map(followers => (
            <Card key={followers.id}>
              <div>
                <img src={this.state.followers.avatar_url} alt={this.state.followers.login} />
              </div>
              <div>
                <p>Github: {this.state.followers.login}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    );
  }
  
}

export default App;
