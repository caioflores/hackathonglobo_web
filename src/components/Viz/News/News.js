import React, { Component } from 'react';

class News extends Component {
  state = {
    card: false 
  }

  render() {

    return (
            <div className="card">
              <div className="card-header">
                some title
              </div>
              <div className="card-block">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores iure inventore esse dolorem eius nulla voluptatibus sed quidem dignissimos libero, fugit sint quasi harum fugiat cupiditate, laboriosam debitis omnis!
              </div>
            </div>
    );
  }
}

export default News;