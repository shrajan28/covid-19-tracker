import React, { useState, useEffect } from 'react'
import {Line} from "react-chartjs-2"
import numeral from "numeral"


function LineGraph({casesType="cases"}) {
    const [graphData,setGraphData]=useState({})
    const options = {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              return numeral(tooltipItem.value).format("+0,0");
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
              },
            },
          ],
        },
      };

    const buildgraphData= (data,caseType=casesType)=>{
        const graphData=[];
        let lastvalue;
        
        for(let date in data.cases)
        {
         
        
            if(lastvalue){
                const newvalue={
                    x:date,
                    y:data[caseType][date]-lastvalue
                }
                graphData.push(newvalue);
                
            }
            lastvalue=data[caseType][date];
         
        }
        return graphData;
    }
    useEffect(()=>{
        const fetchData=async()=>{
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response)=>response.json())
        .then((data)=>{
            setGraphData(buildgraphData(data))
        })
    }
    fetchData();
    })
    return (
        
        <div>
            {
                graphData?.length>0 &&(
                    <Line data={{
                        datasets:[{
                            data:graphData
                        }]
                    }}options={options}/>

                    
                )
            }
        </div>
    )
}

export default LineGraph
