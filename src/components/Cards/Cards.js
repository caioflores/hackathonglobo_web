import React, { Component } from 'react';
import './Cards.css';

class Cards extends Component {
  render() {
    const { news } = this.props;

    const renderNews = () => {
      console.log(news);
      if (news != null) {
          return (
            news.data.map((el, i) => (
              <div className="col-sm-6">
                <div key={i} className="card">
                  <div className="card-block mh-380px pb">
                    <div className="card-head">
                      {el.user_name}
                    </div>
                    <div className="card-block">
                      <p>{el.content}</p>
                      <img src={el.image} style={{width:"100%"}} className="img-thumbnail responsive"/>
                    </div>
                  </div>
                </div>
            </div>)
          )
        )
      }
    }
    return (
      <div className="row">
        {renderNews()}
      </div>
    )
  }
}

export default Cards;
