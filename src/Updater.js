import React, { Component } from 'react';
import './App.css';
import WindSpeed from './WindSpeed';
import WindDirection from './WindDirection';
import NumberDisplay from './NumberDisplay';

class Updater extends Component {
	constructor(props) {
		super(props);
		this.state = {	
			responseText: 'just starting',
			windData: [],
		};
	}

	setConfig = () => {
		var config = {	
				customBaseURL: "https://sheltered-mesa-11556.herokuapp.com/http://www.ctml102.com/lwyclub/lwycweather/",
			 	clientRawName: "clientraw.txt",
				clientRawExtraName: "clientrawextra.txt",
				clientRawHourName: "clientrawhour.txt",
				clientRawDailyName: "clientrawdaily.txt",
		};
		return config;
	}

	updateCallback = (response) => {
		console.log('update callback called from interval');
		// callback gets the xmlHttpRequest responseText and puts in it an array and then to state
		this.setState((prevState) => {
			return { responseText: response }
		});
		// wind direction: [3] and [117]
		// wind speed: [1], [2], [113], [71]
		this.setState((prevState) => {	
			return {	windData: [
									{ name: 'Info', data: prevState.responseText[32] },
									{ name: 'Temperature', data: prevState.responseText[4]},
									{ name: 'Hour', data: prevState.responseText[29]},
									{ name: 'Minute', data: prevState.responseText[30]},
									{ name: 'Second', data: prevState.responseText[31]},
									{ name: 'Wind Degree', data: prevState.responseText[3] },
									{ name: 'Wind Degree 2', data: prevState.responseText[117] },
									{ name: 'Wind Speed', data: prevState.responseText[1] },
									{ name: 'Gust Speed', data: prevState.responseText[2] },
									{ name: 'Max Wind Speed', data: prevState.responseText[113] },
									{ name: 'Max Gust Speed', data: prevState.responseText[71] },
									]
			}
		});

		this.convertWindData("Speed");
		this.convertWindData("Temperature");

	}

	componentDidMount() {
		const config = this.setConfig();
		this.updateClientRaw(config, this.updateCallback);
		// calls updateClientRaw every minute to see changes
		this.interval = setInterval(() => this.updateClientRaw(config, this.updateCallback), 60000);
	}

	componentWillUnMount() {
		clearInterval(this.interval);
	}

	loadArray = (url) => {
		// gets data from clientraw file
		var xhttpVar;

		if (window.XMLHttpRequest) {
			// code for modern browsers
			xhttpVar = new XMLHttpRequest();
	    }

		xhttpVar.open("GET", url, true);
	    //xhttpVar.setRequestHeader("Cache-Control", "no-cache");
	    xhttpVar.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhttpVar.send();
		return xhttpVar;
	}

	// retrieves clientraw.txt file and
	updateClientRaw = (url, callback) => {
		console.log('called updateRaw from interval');
	  var xhttpCR;
	  const baseURL = url.customBaseURL;
	  const clientRawName = url.clientRawName;

	  xhttpCR = this.loadArray(baseURL + clientRawName);

	  xhttpCR.onreadystatechange = function () {
	  	if (xhttpCR.readyState === 4) {
	  		if (xhttpCR.status === 200) {
	  			callback(xhttpCR.responseText.toString().split(" "));
	  		} else {
	  			console.log("nope");
	  		}
	  	}
	  };
	}

	// return the desired data from parameter (Wind Speed, Gust Speed, etc)
	getWindData = (data) => {
		if ( this.state.windData.length > 1 ) {
			const result = this.state.windData.filter(wind => {
    		return wind.name === data;
      }); 
      //console.log(result[0].data.toString());
      return Number(result[0].data);
		} else {
			return '';
		}
	}

	// convert wind data to desired units
	// type = Speed , knots to mph
	// type = Temperature , celsius to fahrenheit
	convertWindData = (type) => {
		function convertUnits(type, number) {
			if ( type === "Speed" ) {
				// 1 knot = 1.15078 mph
				return (number * 1.15078).toFixed(1);				
			}

			else if ( type === "Temperature" ) {
				// F = C * 1.8 + 32
				return (number * 1.8 + 32).toFixed(1);
			}
		};
		// create new const from windData, find all with 'type' (Speed, Temp) in the name and convert
		// if not those just return as is. 
		const filter = this.state.windData.map(wind => {
			if (wind.name.includes(type)) {
				return { name: wind.name,
						 data: convertUnits(type, wind.data),
				};
			} else {
				return { name: wind.name, data: wind.data };
			}
		});
		this.setState({ windData: filter });
	}
	
	renderWindData = () => {
		return this.state.windData.map(wind => ( 
			<li key={wind.name}>{wind.name}: {wind.data}</li>
		));
	}

	// used to display the Updated time
	getUpdateTime = () => {
		const hour = this.getWindData("Hour");
		const minute = this.getWindData("Minute");
		return hour + ':' + minute; 
	}

	// used to set Highcharts Gauge positioning
	selectGauge = (gauge) => {
		const wind = { 
			startAngle: -90,
			endAngle: 0,
			center: ['140', '120']
		};
		const gust = {	
			startAngle: 90,
			endAngle: 0,
			center: ['10', '120']
		};	
		if ( gauge === 'wind') {
			return wind;
		} else if ( gauge === 'gust') {
			return gust;
		}
	}

	render() {
		return (
			<div className="Updater">

				<div className="Gauge">
					<div className="speed">
						<WindSpeed 
							gauge={this.selectGauge('wind')}
							windSpeed={this.getWindData("Wind Speed")} 
							windMax={this.getWindData("Max Wind Speed")}	 
						/>
					</div>
					<div className="gust">
						<WindSpeed 
							gauge={this.selectGauge('gust')}
							gustSpeed={this.getWindData("Gust Speed")}
							gustMax={this.getWindData("Max Gust Speed")}
						/>
					</div>
				</div>

				<div className="left-display">
					<NumberDisplay 
						name="display top-left" 
						number={this.getWindData("Wind Speed")} 
						title="WIND"
					/>
					<NumberDisplay 
						name="display bottom-left" 
						number={this.getWindData("Max Wind Speed")} 
						title="MAX"
					/>
				</div>	

				<WindDirection windDirection={this.getWindData("Wind Degree")} />
				
				<div className="right-display">
					<NumberDisplay 
						name="display top-right" 
						number={this.getWindData("Gust Speed")}
						title="GUST"
					/>
					<NumberDisplay 
						name="display bottom-right" 
						number={this.getWindData("Max Gust Speed")} 
						title="MAX"
					/>
				</div>

				<NumberDisplay
					name="big-display temp"
					number={this.getWindData("Temperature")}
					title="TEMPERATURE"
				/>
				<NumberDisplay
					name="big-display location"
					number="LWYC"
					title="LOCATION"
				/>
				<NumberDisplay
					name="big-display update"
					number={this.getUpdateTime()}
					title="UPDATED"
				/>				

			</div>
		);

	}

}

export default Updater;