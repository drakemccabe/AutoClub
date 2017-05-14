import React, { Component } from 'react';
import "./FrontCta.css";

class FrontCta extends Component {

  render() {
    return (
      <div>
      <article className="athelas">
        <div className="bkGround vh-100 dt w-100 tc bg-dark-gray white cover">
          <div className="dtc v-mid">
            <header className="white-70">
              <h2 className="f6 fw1 ttu tracked mb2 lh-title">Issue Six</h2>
              <h3 className="f6 fw1 lh-title">Summer MMXVI</h3>
            </header>
            <h1 className="f1 f-headline-l fw1 i white-60">The Chronicles</h1>
            <blockquote className="ph0 mh0 measure f4 lh-copy center">
              <p className="fw1 white-70">
                It's the space you put between the notes that make the music.
              </p>
              <cite className="f6 ttu tracked fs-normal">Massimo Vignelli</cite>
            </blockquote>
          </div>
        </div>
      </article>
      </div>
    );
  }
}

export default FrontCta;
