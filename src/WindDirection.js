import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import solidgauge from 'highcharts/modules/solid-gauge';
import exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);
solidgauge(Highcharts);
exporting(Highcharts);

const WindDirection = ({ windDirection }) => {

		const options = {
	    chart: {
	        //renderTo: 'container',
	        type: 'gauge',
	        backgroundColor: 'transparent',
	        height: 110,
	        width: 110,
	    },
	    
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

	    title: null,
	    
	    pane: {
	    	size: '100%',
	    	center: ['50%', '50%'],
	        startAngle: 0,
	        endAngle: 360,
	        background: { 
	            backgroundColor: 'rgba(0, 0, 0, 0.5)',
	            borderWidth: 0,
	            outerRadius: '100%',
	            innerRadius: '20%'
	        }
	    },
	       
	    // the value axis
	    yAxis: {
	        min: 0,
	        max: 360,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 0,
	        tickColor: '#fff',
	        tickInterval: 45,
	        minorTickColor: null,
	        minorTickLength: 0,
	        lineColor: "transparent",
	        minorGridLineColor: "transparent",
	        labels: {
	            rotation: 'auto',
	            style: {
	            	color: '#fff'
	            },
	            formatter:function(){
	                if(this.value === 360) { return 'N'; }
	            }
	        },
	    },

		  plotOptions: {
		    gauge: {
		      dial: {
		      	backgroundColor: '#59d5c8'
		      },
		      lineWidth: 0,
		    }
		  },

	    series: [{
	        name: 'Compass',
	        data: [windDirection],
			    dataLabels: {
			    	enabled: false
			    },	        
	    }]

	};

	return (
	  <HighchartsReact
	    highcharts={Highcharts}
	    options={options}
	  />
	)	
};

export default WindDirection;