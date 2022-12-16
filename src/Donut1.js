import React, { PureComponent, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./index.css";
import Component from './Table';
import Countdown from 'react-countdown';
import { right } from '@popperjs/core';


const COLORS = ['green', 'red'];

const Example = (props) => {
    const [server, setServer] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [appData, setAppData] = useState({tableData: {}, donutData: []});
    const [filter, setFilter] = useState(3);
    const [timer, setTimer] = useState('1:00');
  
    // const Ref = useRef(null);
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    async function fetchData(manual=false) {
        fetch('/api/healthcheck/appstatus', {
          method: 'GET',
          mode: 'no-cors',
          // headers: {
          //     'Content-Type': 'application/json',
          //     'Access-Control-Allow-Origin': '*',
          //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          // }
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const tableNodes = {};
            const donutData = {};
            let rowId = 0;
            let tempStart = 0;
            let tempEnd = filter;

            while(tempEnd <= data.length) {
                const tempData = data.slice(tempStart, tempEnd);
                const node = {};
                let server = "";
                let status = "";
                tempData.map(item => {
                    if(node.hasOwnProperty(rowId)) {
                        node[item.check_time] = item.status;
                    }
                    else{
                        node["id"] = rowId;
                        node["appName"] = item.app_name;
                        node["appUrl"] = item.app_url;
                        node[item.check_time] = item.status;
                        node["status"] = item.status;
                    }
                    server = item.server;
                });
                rowId++;
                if(!tableNodes.hasOwnProperty(server)) {
                    tableNodes[server] = [];
                }
                tableNodes[server].push(node);

                if(!donutData.hasOwnProperty(server)) {
                    console.log("inside");
                    donutData[server] = {"UP": [], "DOWN": []}
                }
                donutData[server][node["status"]].push(node);

                tempStart = tempEnd;
                tempEnd = tempEnd + filter;
            }

            // const data = [
            // { server0: [{ name: 'UP', value: 30, server: "server0" }, { name: 'DOWN', value: 10, server: "server0" }]},
            // { server1: [{ name: 'UP', value: 80, server: "server1" }, { name: 'DOWN', value: 50, server: "server1" }]},
            // { server2: [{ name: 'UP', value: 10, server: "server2" }, { name: 'DOWN', value: 50, server: "server2" }]},
            // { server3: [{ name: 'UP', value: 100, server: "server3" }, { name: 'DOWN', value: 0, server: "server3" }]},
            // { server4: [{ name: 'UP', value: 100, server: "server4" }, { name: 'DOWN', value: 0, server: "server4" }]},
            // ];

            const finalData = [];
            Object.keys(donutData).map(entry => {
                const serverData = {};
                serverData[entry] = [
                    {name: "UP", value: donutData[entry]["UP"].length, server: entry},
                    {name: "DOWN", value: donutData[entry]["DOWN"].length, server: entry}
                ];
                finalData.push(serverData);
            }
            );
              // console.log(nodes);
            setAppData({tableData: tableNodes, donutData: finalData});
        })
        .catch((err) => {
            console.log(err.message);
        });
            
    }
    
      useEffect(() => {
        fetchData();
      }, []); 

      useEffect(() => {
        // clearTimer(getDeadTime());
        const interval = setInterval(() => {
          console.log("Interval: ", interval);
          setTimer('00:00:10');
          // if (Ref.current) clearInterval(Ref.current);
          let deadline = new Date();
          startTimer(deadline.setSeconds(deadline.getSeconds() +60));
          props.tabIndex === 1 && fetchData();
        }, 60*1000);
        // Ref.current = id;
      
        return () => clearInterval(interval);
      }, []);
    // const tableNodes = props.data;
    const clicking = (data) => {
        console.log(server)
        setServer(data["server"]);
        setStatus(data["name"].toLowerCase());
    };

    const data = appData.donutData;
    console.log("donut data", data);
    data.map((entry, index) => {
        console.log("server", Object.values(entry));
    });

    return (
        <div>
            
            <div style={{paddingTop: "30px"}}>
              <label style={{color: "black", fontWeight: "bold", fontSize: "x-large"}}>BDX Healthcheck Dashboard</label>
            </div>
            <div style={{overflow: "hidden", width: "100%"}}>
            <button onClick={() => fetchData(true)} className="button modal_send" style={{marginLeft: "10px"}}>
                Refresh Now!!
              </button>
              <label style={{float: "right"}}>Page will refresh in </label> <Countdown style={{float: "right"}} date={Date.now() + 10000} />
              

            </div>
            <div className="donuts_wrapper">
                {
                data.map((entry, index) => (
                    <div className="donut_wrapper">
                        <PieChart width={0.196 * window.innerWidth} height={.30 * window.innerHeight} title={Object.keys(entry)[0]}>
                            <Pie 
                                
                                data={entry[Object.keys(entry)[0]]}
                                cx={120}
                                cy={200}
                                innerRadius={30}
                                outerRadius={80}
                                fill="#8884d8"
                                // paddingAngle={5}
                                dataKey="value"
                                onClick={clicking}
                                // label={Object.keys(entry)[0]}
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            
                            {/* <Legend /> */}
                        </PieChart>
                        <div className="donut_header"><label>{Object.keys(entry)[0].toUpperCase()}</label></div>
                        {/* <div id="donut_header"><label className={styles.donut_header}>This is long name</label></div> */}
                    </div>
            ))}
        </div>
            <br />
            <br />
            <br />
            <h1>Application Details:</h1>
            <div>
                <Component key={server} server={server} status={status} data={appData.tableData}/>
            </div>
    </div>
    );
}

export default Example;
