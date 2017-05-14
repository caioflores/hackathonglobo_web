import React, { Component } from 'react';
import axios from 'axios';

class News extends Component {
  state = {
    card: false
  }

  componentDidMount() {
    var resp = [];
    resp = axios.get('http://ddb7351b.ngrok.io/api/news')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      news: resp
    })
  }

  render() {
    const { news } = this.state;

    const renderNews = () => {
      if (news != null) {
          return (
            news.map((el, i) => (
            <div key={i} className="card">
              <div className="card-block">
                {el.content}
              </div>
            </div>)
          )
      }
    }
    return (
      // {renderNews()}
      <h1>hey</h1>
    );
  }
}

export default News;
