import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import solidgauge from 'highcharts/modules/solid-gauge';
import exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);
solidgauge(Highcharts);
exporting(Highcharts);

const WindSpeed = ({ gauge, windSpeed, windMax, gustSpeed, gustMax }) => {

	const options = {

	  chart: {
	    type: 'solidgauge',
	    width: 150,
	    height: 150,
	    backgroundColor: 'transparent',
	  },

	  title: null,

		navigation: {
		  buttonOptions: {
		    enabled: false
		  }
		},

	  credits: {
	    enabled: false
	  },

	  tooltip: {
	    enabled: false
	  },

	  pane: {
		  center: gauge.center,
		  size: 250,
		  startAngle: gauge.startAngle,
		  endAngle: gauge.endAngle,
		  background: {
		    backgroundColor: 'rgba(0, 0, 0, 0.5)',
		    borderColor: 'transparent',
		    borderWidth: 1,
		    innerRadius: '40%',
		    outerRadius: '90%',
		    shape: 'arc'
		  }
		},

	  yAxis: [
	  	// yAxis: 0
		  {
		    lineWidth: 0,
		    minColor: '#2ecc71',
		    maxColor: '#2ecc71',
		    minorTickInterval: null,
		    tickAmount: 1,
		    tickColor: null,
		    labels: {
		      enabled: false
		    },
		    min: 0,
		    max: 30
			},

			// yAxis: 1
			{
		    lineWidth: 0,
		    minColor: '#59d5c8',
		    maxColor: '#59d5c8',
		    minorTickInterval: null,
		    tickAmount: 1,
		    tickColor: null,
		    labels: {
		      enabled: false
		    },
		    min: 0,
		    max: 30				
			}
		],	

	  plotOptions: {
	    solidgauge: {
	      dataLabels: {
	      	enabled: false
	      }
	    }
	  },

	  series: [
	  	{
		    name: 'speed',
		    yAxis: 0,
		    data: [windSpeed],
		    innerRadius: '65%',
		    radius: '90%', 
		    dataLabels: {
		    	enabled: false
		    },
	 		}, 

	  	{
		    name: 'max wind speed',
		    yAxis: 1,
		    data: [windMax],
		    innerRadius: '40%',
		    radius: '65%', 
		    dataLabels: {
		    	enabled: false
		    },
	 		}, 

	 		{
	 			name: 'gust',
	 			yAxis: 0,
	 			data: [gustSpeed],
	 			innerRadius: '65%',
	 			radius: '90%',
	 			dataLabels: {
	 				enabled: false
	 			}, 
	 		}, 

	  	{
		    name: 'max gust speed',
		    yAxis: 1,
		    data: [gustMax],
		    innerRadius: '40%',
		    radius: '65%', 
		    dataLabels: {
		    	enabled: false
		    },
	 		}, 
	 		
	 	]

	};

	return (
		<div className="windspeed">
		  <HighchartsReact
		    highcharts={Highcharts}
		    options={options}
		  />
		</div>
	)	
};

export default WindSpeed;