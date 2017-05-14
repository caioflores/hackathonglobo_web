import React from 'react';
import moment from 'moment';

import {
  timeFormat
} from 'd3';

import {
  TimeSeries
} from 'pondjs';

import {
  ChartContainer,
  ChartRow,
  Charts,
  YAxis,
  LineChart,
  Legend,
  Resizable,
  Brush,
  styler
} from 'react-timeseries-charts';

function buildPoints(series) {
  let points = [];

  for (let i = 0; i < series.length; i++) {
    points.push([series[i].x, series[i].y]);
  }

  return points;
}

const SeriesChart = React.createClass({
  propTypes: {
    onTimeRangeChange: React.PropTypes.func.isRequired
  },
  buildSeries(props = this.props) {
    const timeSeries = new TimeSeries({
      name: "Time Series",
      columns: ["time", props.topic],
      points: buildPoints(props.series.data)
    });

    return {
      timeSeries,
      tracker: null,
      timeRange: timeSeries.range(),
      brushRange: timeSeries.range()
    };
  },
  getInitialState() {
    return this.buildSeries();
  },
  componentWillReceiveProps(nextProps) {
    const topic = this.props.topic;
    const start = this.props.start;

    if (topic !== nextProps.topic 
        || start !== nextProps.start) {
          this.setState(this.buildSeries(nextProps), () => {
            const { timeRange } = this.state;
            this.props.onTimeRangeChange({ 
              start: moment(timeRange.begin()).valueOf(),
              end: moment(timeRange.end()).valueOf()
            });
          });
    }
  },
  handleTrackerChanged(tracker) {
    this.setState({
      tracker
    });
  },
  handleTimeRangeChange(timeRange) {
    this.props.onTimeRangeChange({ 
      start: moment(timeRange.begin()).valueOf(),
      end: moment(timeRange.end()).valueOf()
    });
    
    this.setState({
      timeRange,
      brushRange: timeRange
    });
  },
  componentDidMount() {
    const { timeRange } = this.state;
    this.props.onTimeRangeChange({ 
      start: moment(timeRange.begin()).valueOf(),
      end: moment(timeRange.end()).valueOf()
    });
  },
  render() {
    const { timeSeries, timeRange } = this.state;
    const df = timeFormat("%b %d %Y %X");

    const max = timeSeries.max(this.props.topic);
    const min = timeSeries.min(this.props.topic);

    const style = styler([{
      key: this.props.topic,
      color: "#F68B24",
      width: 2
    }]);

    const timeStyle = {
      fontSize: "1.1rem",
      color: "#999"
    };

    const brushStyle = {
      paddingTop: 10
    };

    let value;
    if (this.state.tracker) {
      const index = timeSeries.bisect(this.state.tracker);
      const trackerEvent = timeSeries.at(index);
      value = trackerEvent.get(this.props.topic);
    }

    return (
      <div>
        <div className="row" style={{ height: 28 }}>
          <div className="col-md-6" style={timeStyle}>
            {this.state.tracker ? `${df(this.state.tracker)}` : ""}
          </div>
          <div className="col-md-6">
            <Legend
              type="line"
              align="right"
              style={style}
              highlight={this.state.highlight}
              onHighlightChange={highlight => this.setState({ highlight })}
              selection={this.state.selection}
              onSelectionChange={selection => this.setState({ selection })}
              categories={[ { key: this.props.topic, label: this.props.topic, value } ]} />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Resizable>
              <ChartContainer
                timeRange={timeRange}
                maxTime={timeSeries.range().end()}
                minTime={timeSeries.range().begin()}
                trackerPosition={this.state.tracker}
                onTrackerChanged={this.handleTrackerChanged}
                onBackgroundClick={() => this.setState({ selection: null })}
                enablePanZoom
                onTimeRangeChanged={this.handleTimeRangeChange}
                minDuration={1000 * 60 * 60 * 24 * 30}>
                <ChartRow height="300">
                  <YAxis
                    id="chartY"
                    width="60"
                    type="linear"
                    min={min}
                    max={max}
                    format=".2f" />
                  <Charts>
                    <LineChart
                      axis="chartY"
                      breakLine={false}
                      series={timeSeries}
                      columns={[this.props.topic]}
                      style={style}
                      interpolation="curveBasis"
                      highlight={this.state.highlight}
                      onHighlightChange={highlight => this.setState({ highlight })}
                      selection={this.state.selection}
                      onSelectionChange={selection => this.setState({ selection })} />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={brushStyle}>
            <Resizable>
              <ChartContainer
                timeRange={timeSeries.range()}
                maxTime={timeSeries.range().end()}
                minTime={timeSeries.range().begin()}
                trackerPosition={this.state.tracker}>
                <ChartRow height="80" debug={false}>
                  <Brush 
                    timeRange={this.state.brushRange}
                    onTimeRangeChanged={this.handleTimeRangeChange} />
                  <YAxis
                    id="brushY"
                    width="60"
                    type="linear"
                    min={min}
                    max={max}
                    format=".2f" />
                  <Charts>
                    <LineChart
                      axis="brushY"
                      breakLine={false}
                      series={timeSeries}
                      columns={[this.props.topic]}
                      interpolation="curveBasis"
                      style={style} />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    );
  }
});

export default SeriesChart;