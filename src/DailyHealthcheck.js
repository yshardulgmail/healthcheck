import React, { PureComponent, useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./index.css";
import Component from './Table';
import Countdown from 'react-countdown';
import { right } from '@popperjs/core';
import { FaSearch } from 'react-icons/fa';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';


const COLORS = ['green', 'red'];

const DailyHealthcheck = (props) => {
    const [server, setServer] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [appData, setAppData] = useState({tableData: {}, donutData: []});
    // const [filter, setFilter] = useState(3);
    const [timer, setTimer] = useState('1:00');
    const [search, setSearch] = React.useState('');
    const [currentTime, setCurrentTime] = useState(null);
    const filterRef = useRef();


    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const getTime = () => {
        const date = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const time = hours + ":" + minutes + " " + am_pm;

        return time;
    }

    async function fetchData(manual=false, filter=3) {
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
            console.log("filter: ",filter)
            const tableNodes = {};
            const donutData = {};
            let rowId = 0;
            let tempEnd = filter;
            const processedAppData = {};
            data.map(item => {
                const appId = item["APP_ID"];
                if(!processedAppData.hasOwnProperty(appId)) {
                    processedAppData[appId] = []
                }
                processedAppData[appId].push(item);
            });

            if(manual) {
                Object.keys(processedAppData).map(app => {
                    const singleAppData = processedAppData[app][0];
                    // let status = "DOWN";

                    // This is random status generator. Need to remove when app urls are working
                    const statuses = ["UP", "DOWN"];
                    let status = statuses[Math.floor(Math.random() * statuses.length)];
                    fetch(singleAppData.app_url, {
                        method: 'GET',
                        mode: 'no-cors',
                      })
                        .then(res => res.text())
                        .then(text => {
                            console.log("fetched")
                            if(text.toLowerCase().includes("\"up\"")) {
                                status = "UP";
                            }
                        });
                    const currentAppStatus = {};
                    currentAppStatus["APP_ID"] = app;
                    currentAppStatus["app_name"] = singleAppData.app_name;
                    currentAppStatus["app_url"] = singleAppData.app_url;
                    currentAppStatus["server"] = singleAppData.server;
                    currentAppStatus["check_time"] = getTime();
                    currentAppStatus["status"] = status;
                    processedAppData[app].push(currentAppStatus);
                });
            }

            Object.keys(processedAppData).map(app => {
                let tempData = [];
                
                if(filter != 12){
                    const tempFilter = manual ? (filter * 2) + 1 : filter * 2;

                    tempData = processedAppData[app].slice(-tempFilter);
                    console.log("length: ", tempData);
                }
                else{
                    let counter = 1;
                    processedAppData[app].map(item =>{
                        if(item.check_time.includes(":00") && counter <= 12) {
                            tempData.push(item);
                            counter++;
                        }
                    });
                }
                
                console.log("tempData: ",tempData);
                const node = {};
                let server = "";
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
            });

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
            setCurrentTime(Date.now() + 60*1000);
            setAppData({tableData: tableNodes, donutData: finalData});
        })
        .catch((err) => {
            console.log(err.message);
        });
            
    }
    
      useEffect(() => {
        fetchData();
      }, []); 

    //   useEffect(() => {
    //     // clearTimer(getDeadTime());
    //     const interval = setInterval(() => {
    //       props.tabIndex === 1 && fetchData();
    //     }, 60*1000);
    //     // Ref.current = id;
      
    //     return () => clearInterval(interval);
    //   }, []);
    // const tableNodes = props.data;
    const clicking = (data) => {
        console.log(server)
        setServer(data["server"]);
        setStatus(data["name"].toLowerCase());
    };

    const changeFilter = (value) => {
        filterRef.current = value;
        fetchData(false, value);
    };

    const handleRefreshNow = () => {
        fetchData(true, filterRef.current);
    };


    const data = appData.donutData;
    // console.log("donut data", data);
    // data.map((entry, index) => {
    //     console.log("server", Object.values(entry));
    // });
    if(Object.keys(appData.tableData).length > 0){
        const serverName = server != "" ? server : Object.keys(appData.donutData[0])[0];
        const selectedStatus = status != "" ? " with Status: " + status.toUpperCase() : "";
        return (
            <div>
                
                <div style={{paddingTop: "30px"}}>
                <label style={{color: "black", fontWeight: "bold", fontSize: "x-large"}}>BDX Healthcheck Dashboard</label>
                <div style={{float: "right"}}>
                    <Countdown
                        key={currentTime}
                        date={Date.now() + 60*1000} 
                        onComplete={() => {
                            props.tabIndex === 1 && fetchData();
                        }}
                        renderer={({ hours, minutes, seconds, completed }) => {
                            if(Object.keys(appData.tableData).length > 0)
                                return <span>{minutes}:{seconds}</span>;
                            else
                                return <span></span>
                        }}/>
                </div>
                <label style={{float: "right"}}>Page will refresh in </label> 
                </div>
                
                <div className="donuts_wrapper">
                    {
                    data.map((entry, index) => (
                        <div className="donut_wrapper">
                            <PieChart width={0.195 * window.innerWidth} height={.35 * window.innerHeight} title={Object.keys(entry)[0].toUpperCase()}>
                                <Pie 
                                    
                                    data={entry[Object.keys(entry)[0]]}
                                    cy={150}
                                    innerRadius={30}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onClick={clicking}>
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
                <br />
                <label style={{color: "black", fontWeight: "bold", fontSize: "large"}}>{serverName} Applications {selectedStatus}</label>
                <div style={{marginTop: "15px"}}>
                    <Stack spacing={10}>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents="none"
                            children={<FaSearch style={{ color: '#4a5568' }} />}
                            />
                            <Input className="search_input" placeholder="Search Application" value={search} onChange={handleSearch} />
                            <div style={{overflow: "hidden", width: "50%"}}>
                                <button onClick={() => handleRefreshNow()} className="button modal_send" >
                                    Refresh Now!!
                                </button>
                                <select autocomplete="off" onChange={(evt) => changeFilter(evt.target.value)} className="button modal_send" >
                                    <option value="3" selected>LAST 3 HOURS</option>
                                    <option value="6" >LAST 6 HOURS</option>
                                    <option value="12" >LAST 12 HOURS</option>
                                </select>
                            </div>
                        </InputGroup>
                    </Stack>
                    <br />
                    <Component key={search} server={server} status={status} data={appData.tableData} search={search}/>
                </div>
        </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}

export default DailyHealthcheck;
