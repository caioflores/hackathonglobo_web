import React, { Component } from 'react';
import axios from 'axios';

class News extends Component {

  render() {
    const { news } = this.props;

    const renderNews = () => {
      console.log(news);
      if (news != null) {
          return (
            news.data.map((el, i) => (
            <div key={i} className="card">
              <div className="card-header">
                {el.user_name}
              </div>
              <div className="card-block">
                {el.content}
                <img src={el.image} style={{width:"100%"}} />
                {el.tags}
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
