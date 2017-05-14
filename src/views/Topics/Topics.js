import React, { Component } from 'react';
import axios from 'axios';
import seriesData from './data.json';
import wordCloudData from './wordcloud.json';

import * as backend from 'api/backend';
import { WordCloud, SeriesChart, HeatMap, News } from 'components/Viz';

const LEFT = 0;
const RIGHT = 1;

const colors = [
  "#1f77b4",
  "#aec7e8",
  "#ff7f0e",
  "#ffbb78",
  "#2ca02c",
  "#98df8a",
  "#d62728",
  "#ff9896",
  "#9467bd"
];
class Topics extends Component {
  state = {
    words: [],
    series: [],
    resolutions: [],
    tag: null,
    start: null,
    end: null,
    timeRange: null,
    isLoading: false,
    leftComponent: 1,
    rightComponent: 1,
    maxWords: null,
    geolocationId: null,
    geolocation: null
  }

  updateWordCloud = () => {
    const { tag, timeRange, maxWords } = this.state;

    if (tag != null && timeRange != null) {
      // backend.getWordCloud(tag.value, timeRange)
      // .then((words) => {
      // const max = maxWords ? maxWords : words.length;
      // const query = words.slice(words.length - max, words.length - max + 5).map(w => w.text).reduce((a, w) => a += " " + w);

      //   this.setState({ words, query, isLoading: false });
      // }).catch((error) => {
      //    this.setState({ words: [], isLoading: false });
      // });
    }
  }

  updateGeolocation = () => {
    const { geolocationId, timeRange } = this.state;

    if (geolocationId != null && timeRange != null) {
      // backend.getGeolocations(geolocationId, timeRange).then((res) => {
      //   this.setState({ geolocation: res.data });
      // });
    }
  }

  getSeries = (seriesId, start, unit) => {
    // backend.getSeries(seriesId, start)
    // .then((series) => {
    //   let words = [];

    //   series.id = seriesId;
    //   series.resolution = unit;
    //   series.start = start;
    //   this.setState({ start, series, words, isLoading: false });
    // })
    // .catch((error) => {
    //   alert("No data");
    //   this.setState({ isLoading: false });
    // });
  }

  handleOptionsSubmit = (tag, start) => {
    const { isLoading, series } = this.state;
    if (tag != null && this.topic != null && !isLoading) {
      const startDate = start == null ? -1 : start;
      this.setState({ isLoading: true, tag}, () => {
        // this.getSeries(startDate, endDate);
      });
    } else if (isLoading) {
      alert("Series loading...");
    }
  }

  handleTimeRangeChange = (timeRange) => {
    const { words, series, resolutions } = this.state;

    console.log(timeRange);

    this.setState({ timeRange }, () => {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }
      const DELAY = 1000; // 1 second
      const time = words.length > 0 ? DELAY : 0;
      this.timeout = setTimeout(() => {
        this.updateWordCloud();
        this.updateGeolocation();
      }, time);
    });
  }

  componentWillReceiveProps(nextProps) {
    const producerId = parseInt(nextProps.match.params.id, 10);

    if (this.topic != null) {
      if (this.topic.id !== producerId) {
        this.setState({
          series: [],
          words: [],
          resolutions: [],
          timeRange: null,
          isLoading: false
        });
      }
    }
  }

  handleWordsSizeChange = (e) => {
    const maxWords = parseInt(e.target.value, 10);
    this.setState({ maxWords });
  }

  componentDidMount() {
    this.setState({ series: seriesData, words: wordCloudData });
  }

  render() {
    const { leftComponent, rightComponent, tag, series, words, isLoading, resolutions, query, maxWords, timeRange, geolocation } = this.state;

    
    const topic = "alagamento";

    const renderRightComponent = () => {
      if (rightComponent === 1) {
        if (words.length > 0) {
          return (
            <div>
              <div className="form-group row">
                <label htmlFor="maxwords-input" className="col-5 col-form-label">Máximo de palavras</label>
                <div className="col-5">
                  <input className="form-control" type="number" id="maxwords-input" max={words.length} min="5" size="3"
                    value={maxWords ? maxWords : words.length} 
                    onChange={this.handleWordsSizeChange}
                  />
                </div>
              </div>
              <WordCloud
                data={words}
                width={300}
                height={300}
                colors={colors}
                color="#999"
                maxWords={maxWords}
                onClick={(word) => alert(word)}
                padding={1} />
            </div>
          );
        } else if (isLoading) {
          return <h6 className="text-center">Carregando...</h6>;
        } else {
          return <h6 className="text-center">Sem dados</h6>;
        }
      } else if (rightComponent === 2) {
        return <News query={query} timeRange={timeRange} />;
      } else if (rightComponent === 3) {
        const points = geolocation.map((point) => [ point.lat, point.lng, point.radius ]);

        return (<HeatMap data={points} center={[-15.33240, -48.081619]} />)
      }
    };

    const renderResolutions = () => {
      return (
        <div className="btn-group text-center">
            {resolutions.map((el, index) => (
            <button key={index} onClick={ el.enabled && el.unit !== series.resolution ? this.handleChangeResolution : null} type="button" className={series.resolution === el.unit ? "btn btn-primary" :  el.enabled ? "btn btn-secondary" : "btn btn-secondary disabled"}>{el.unit}</button>
            ))}
        </div>
      );
    };

    const renderSeriesChart = () => {
      if (series.data) {
        return <SeriesChart
                  series={seriesData}
                  topic={topic}
                  onTimeRangeChange={this.handleTimeRangeChange}
                  // onClick={this.handleChartClick}
                />;
      } else if (isLoading) {
        return <h6 className="text-center">Carregando...</h6>;
      } else {
        return <h6 className="text-center">Sem dados</h6>;
      }
    };

    const getNavLink = (i, side) => {
      const component = side === LEFT ? leftComponent : rightComponent;
      if (i === component) {
        return "nav-link active";
      } else {
        return "nav-link";
      }
    };

      return (
          <div className="animated fadeIn">
                <div className="row">
                  <div className="col-sm-12 col-md-7">
                    <div className="card">
                      <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                          <li className="nav-item">
                            <a className={getNavLink(1, LEFT)} href="#" onClick={
                              (e) => {
                              e.preventDefault();
                              this.setState({ rightComponent: 1 });
                            }
                            }>Gráfico</a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-block">
                      {renderResolutions()}
                      {renderSeriesChart()}
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-5">
                  <div className="card text-center">
                    <div className="card-header">
                      <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                          <a className={getNavLink(1, RIGHT)} href="#" onClick={
                            (e) => {
                            e.preventDefault();
                            this.setState({ rightComponent: 1 });
                          }
                          }>Nuvem de Palavras</a>
                      </li>
                      <li className="nav-item">
                        <a className={getNavLink(2, RIGHT)} href="#" onClick={
                          (e) => {
                          e.preventDefault();
                          this.setState({ rightComponent: 2 });
                        }
                        }>Notícias</a>
                    </li>
                    <li className="nav-item">
                      <a className={getNavLink(3, RIGHT)} href="#" onClick={
                        (e) => {
                        e.preventDefault();
                        this.setState({ rightComponent: 3 });
                      }
                      }>HeatMap</a>
                  </li>
                </ul>
              </div>
              <div className="card-block">
                {renderRightComponent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Topics;
