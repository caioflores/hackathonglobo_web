import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import { Line } from 'react-chartjs-2';


class ChartDash extends Component {
  state = {
    card: false 
  }

  render() {
    const { data, opts, total, topic } = this.props;

    return (
            <div className="card card-inverse card-primary">
              <div className="card-block pb-0">
                <h4 className="mb-0">{total}</h4>
                <p>{topic}</p>
              </div>
              <div className="chart-wrapper px-3">
                <Line data={data} options={opts} height={100}/>
              </div>
            </div>
    );
  }
}

export default ChartDash;