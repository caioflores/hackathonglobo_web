import React, { PureComponent, PropTypes } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

class HeatMap extends PureComponent {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired)).isRequired,
		center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
	}

	constructor (props) {
		super(props);
		this.map = null;
		this.heat = null;
	}

	update (points) {
		this.heat = L.heatLayer(points,{
            radius: 20,
            blur: 15,
            maxZoom: 17
        }).addTo(this.map);
	}

	componentDidMount () {
		this.map = L.map("map").setView(this.props.center, 4);
        const mapLink =
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
            }).addTo(this.map);

		this.update(this.props.data);

	}

	componentWillReceiveProps(nextProps) {

	}

	render () {
		return (<div id="map" style={{width: "100%", height: "400px"}}></div>);
	}
}

export default HeatMap;
