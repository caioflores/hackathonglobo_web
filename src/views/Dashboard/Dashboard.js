import React, { Component } from 'react';
import ChartDash from 'components/ChartDash';
import Cards from 'components/Cards';
import { Link } from 'react-router';
import axios from 'axios';

const brandPrimary =  '#20a8d8';
const brandDanger =   '#f86c6b';

const randomArr = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(Math.random()*10));
  }

  return arr;
};

const data1 = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
  datasets: [
    {
      label: 'Alagamentos',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: randomArr(7)
    }
  ],
};

const data2 = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
  datasets: [
    {
      label: 'Incêndios',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: randomArr(7)
    }
  ],
};


const data3 = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
  datasets: [
    {
      label: 'Alagamentos',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: randomArr(7)
    }
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, data1.datasets[0].data) - 5,
        max: Math.max.apply(Math, data1.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

class Dashboard extends Component {
  state = {
    card1: false,
    news: null
  }

  componentDidMount = () => {
    this.timeout = setTimeout(() => {
      axios.get(`https://ddb7351b.ngrok.io/api/news`)
      .then((response) => {
        this.setState({
          news: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
      // this.updateWordCloud();
    }, 3000);
  }

  render() {
    const { total, topic } = this.props;
    const { news } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              <Cards news={news}></Cards>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card card-inverse card-primary">
              <div className="chart-wrapper px-3">
                <Link to="topicos/alagamentos"><ChartDash topic="Alagamentos" total={121} data={data1} opts={cardChartOpts1} /></Link>
              </div>
            </div>
            <div className="card card-primary">
              <div className="chart-wrapper px-3">
                <Link to="topicos/alagamentos"><ChartDash topic="Incêndios" total={121} data={data2} opts={cardChartOpts1} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
