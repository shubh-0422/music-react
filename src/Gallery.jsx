import React, { Component } from "react";
import "./App.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: "",
      audio: null,
      playing: false
    };
  }
  playAudio(url) {
    let audio = new Audio(url);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: url,
        audio
      });
    } else {
      if (this.state.playingUrl === url) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: url,
          audio
        });
      }
    }
  }
  render() {
    const tracks = this.props.tracks.tracks || [];
    return (
      <div>
        {tracks.map((track, key) => {
          const trackImg = track.album.images[0].url;
          return (
            <div
              key={key}
              onClick={() => this.playAudio(track.preview_url)}
              className="track"
            >
              <img src={trackImg} className="track-img" alt="track" />
              <div className="track-play">
                <div className="track-play-inner">
                  {this.state.playingUrl === track.preview_url ? (
                    <span>| |</span>
                  ) : (
                    <span>&#x25b6;</span>
                  )}
                </div>
              </div>
              <p className="track-text">{track.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Gallery;
