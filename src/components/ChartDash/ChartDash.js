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
                <div className="btn-group float-right">
                  <Dropdown isOpen={this.state.card} toggle={() => { this.setState({ card: !this.state.card }); }}>
                    <button onClick={() => { this.setState({ card: !this.state.card }); }} className="btn btn-transparent active dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.card}>
                      <i className="icon-settings"></i>
                    </button>
                    <DropdownMenu>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
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