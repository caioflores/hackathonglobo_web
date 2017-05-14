import React, { PureComponent, PropTypes } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const fill = d3.scaleOrdinal(d3.schemeCategory20);

const MAX_WORD_SIZE = 25;
const MIN_WORD_SIZE = 10;
const scale = d3.scaleLinear().range([MIN_WORD_SIZE, MAX_WORD_SIZE]);

class WordCloud extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    font: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    color: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    maxWords: PropTypes.number
  }

  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    font: 'serif',
    rotate: 0,
    color: undefined,
    colors: [],
    maxWords: null
  }

  state = {
    element: null,
    mouseOver: false
  }

  componentWillReceiveProps(nextProps) {
    const currentData = this.props.data;
    const newData = nextProps.data;
    let areEqual = true;

    if (newData != null) {
      if (currentData.length !== newData.length) {
        areEqual = false;
      } else {
        for (let i = currentData.length; i--;) {
          if (currentData[i] !== newData[i]) {
            areEqual = false;
            break;
          }
        }
      }
    }

    if (this.props.maxWords !== nextProps.maxWords && nextProps.maxWords <= nextProps.data.length) {
      areEqual = false;
    }

    if (!areEqual) {
      this.update(nextProps);
      this.update(nextProps);
    }
  }

  update = (props = this.props) => {
    const { data, width, height, padding, font, rotate, maxWords } = props;

    let words = data;
    if (maxWords != null && maxWords < data.length) {
      if (maxWords < data.length) {
        words = data.slice(data.length - maxWords);
      }
    }

    scale.domain([
      d3.min(words, d => d.value),
      d3.max(words, d => d.value)
    ]);
    const fontSizeMapper = word => scale(word.value);

    cloud()
      .size([width, height])
      .words(words)
      .font(font)
      .rotate(rotate)
      .padding(padding)
      .fontSize(fontSizeMapper)
      .spiral("archimedean")
      .on('end', this.draw)
      .start();
  }

  draw = (words) => {
    const { colors, color } = this.props;

    const fillColor = (colors.length === 0 && !color)
    ? (d, i) => fill(i)
    : (d, i) => (i < colors.length ? colors[i] : color);

    const cloud = this.svg.selectAll("g text")
                    .data(words, function(d) { return d.text; })

    //Entering words
    cloud.enter()
        .append("text")
        .style("font-family", "serif")
        .style('fill', fillColor)
        .attr("text-anchor", "middle")
        .attr('cursor', 'pointer')
        .attr('font-size', 1)
        .text(d => d.text)
        .attr('opacity', 0.7)
        .on('mouseover', function(d, i) {
          d3.select(this).attr('opacity', 1);
        })
        .on('mouseout', function(d) {
          d3.select(this).attr('opacity', 0.7);
        })
        .on('click', (d) => {
          if (this.props.onClick) {
            this.props.onClick(`${d.text}: ${d.value}`);
          }
        });

    // Entering and existing words
    cloud
        .transition()
            .duration(600)
            .style("font-size", function(d) { return d.size + "px"; })
            .style('fill', fillColor)
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("opacity", 0.7);

    //Exiting words
    cloud.exit()
        .transition()
            .duration(200)
            .style('opacity', 0)
            .attr('font-size', 1)
            .remove();
  }

  componentDidMount() {
    const { width, height } = this.props;

    this.svg = d3.select(this.node)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('transform', 'translate(' + Math.min(width, height) / 2 + ',' + Math.min(width, height) / 2 + ')');

      this.update();
      this.update();
  }

  componentWillUnmount() {
      d3.select(this.svg).remove();
  }

  render() {
    return (
      <div ref={(node) => { this.node = node }}></div>
    );
  }
}

export default WordCloud
