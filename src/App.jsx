import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  callTrack(id) {
    let FETCH_URL = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;
    fetch(FETCH_URL, {
      method: 'GET',
      headers: new Headers({     'Authorization': 'Bearer BQC4hioW4qde4H17P8Vrqvp5Pe85VLlSU6kl8PP6RMKoKowRFKQPkqNP0Luf_vVAHc2sjDGhEcYxfAqbti3QqWJm9-tp6Az5Bpp8m53ET5lF58HSj6TnsTra5CY34PfAwq0Hmz6WJMfJW0LTUNZSJn2o-IbBPoTVT7s'
    })
    })
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        const tracks = json;
        this.setState({ tracks });
      });
  }
  search() {
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    var accessToken =
      "BQC4hioW4qde4H17P8Vrqvp5Pe85VLlSU6kl8PP6RMKoKowRFKQPkqNP0Luf_vVAHc2sjDGhEcYxfAqbti3QqWJm9-tp6Az5Bpp8m53ET5lF58HSj6TnsTra5CY34PfAwq0Hmz6WJMfJW0LTUNZSJn2o-IbBPoTVT7s";

    var myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.callTrack(artist.id);
        this.setState({ artist });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="search" onClick={() => this.search()} />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks || []} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default App;
