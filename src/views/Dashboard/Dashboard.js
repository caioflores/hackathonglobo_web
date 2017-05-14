import React, { Component } from 'react';
import ChartDash from 'components/ChartDash';
import { Link } from 'react-router';

const brandPrimary =  '#20a8d8';

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
      label: 'Alagamentos',
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
    card1: false
  }

  render() {
    const { total, topic } = this.props;

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-6 col-lg-4">
            <Link to="topicos/alagamentos"><ChartDash topic="Alagamentos" total={121} data={data1} opts={cardChartOpts1} /></Link>
          </div>
          <div className="col-sm-6 col-lg-4">
            <Link to="topicos/incendios"><ChartDash topic="Incêndios" total={126} data={data2} opts={cardChartOpts1} /></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
