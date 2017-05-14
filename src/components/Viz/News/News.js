import React, { Component } from 'react';
import axios from 'axios';

class News extends Component {
  state = {
    card: false,
    news: null
  }

  componentDidMount() {
    axios.get('http://ddb7351b.ngrok.io/api/news')
      .then((response) => {
        console.log(response);
        this.setState({
          news: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { news } = this.state;

    const renderNews = () => {
      if (news != null) {
          return (
            news.data.map((el, i) => (
            <div key={i} className="card">
              <div className="card-block">
                {el.content}
              </div>
            </div>)
          )
        )
      }
    }
    return (
      <div>{renderNews()}</div>
    );
  }
}

export default News;
