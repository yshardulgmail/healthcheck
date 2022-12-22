import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import "./index.css";
import Component from './Table';
import {Bars, Circles} from 'react-loader-spinner';
import { FaSearch } from 'react-icons/fa';
import { Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';


const COLORS = ['green', 'red'];

const DailyHealthcheck = (props) => {
    const [server, setServer] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [appData, setAppData] = useState({tableData: {}, donutData: []});
    const [search, setSearch] = React.useState('');
    const [currentTime, setCurrentTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const filterRef = useRef();

    const LoadingIndicator = props => {
        return (
          <div
            style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Bars color="#009EDC" height="80" width="150" />
          </div>)
      };

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const getTime = () => {
        // const date = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
        const date = new Date();
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const time = hours + ":" + minutes + " " + am_pm;

        return time;
    }

    function fetchData(manual=false, filter=3) {
        fetch('/api/healthcheck/appstatus/'+manual, {
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
                        if(item.check_time.includes(":45") && counter <= 12) {
                            tempData.push(item);
                            counter++;
                        }
                    });
                    if(manual) {
                        tempData.push(processedAppData[app][processedAppData[app].length - 1]);
                    }
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
                        node["appId"] = app;
                        node["appName"] = item.app_name;
                        node["appUrl"] = item.app_url;
                        node[item.check_time] = item.status;
                        node["status"] = item.status;
                        node["server"] = item.server;
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
            setIsLoading(false) 
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
          props.tabIndex === 1 && fetchData();
        }, 15*60*1000);
        return () => clearInterval(interval);
    }, []);

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
        setIsLoading(true);
        fetchData(true, filterRef.current);
    };


    const data = appData.donutData;
    const defaultShow = <div style={{paddingTop: "30px"}}>
    <label style={{color: "black", fontWeight: "bold", fontSize: "x-large"}}>BDX Healthcheck Dashboard</label>
    </div>;
    if(Object.keys(appData.tableData).length > 0){
        const serverName = server != "" ? server : Object.keys(appData.donutData[0])[0];
        const selectedStatus = status != "" ? " with Status: " + status.toUpperCase() : "";
        return (
            <div>
                
                {defaultShow}
                
                <div className="donuts_wrapper">
                    {isLoading ? <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Circles color="#009EDC" height="80" width="150" />
          </div> : 
                    data.map((entry, index) => (
                        <div className="donut_wrapper">
                            <PieChart width={0.195 * window.innerWidth} height={.27 * window.innerHeight} title={Object.keys(entry)[0].toUpperCase()}>
                                <Pie 
                                    
                                    data={entry[Object.keys(entry)[0]]}
                                    cy={140}
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
                                <select autocomplete="off" onChange={(evt) => changeFilter(evt.target.value)} className="button filter_select" >
                                    <option value="3" selected>LAST 3 HOURS</option>
                                    <option value="6" >LAST 6 HOURS</option>
                                    <option value="12" >LAST 12 HOURS</option>
                                </select>
                                <button onClick={() => handleRefreshNow()} className="button refresh_now"  disabled={isLoading}>
                                    REFRESH NOW!!
                                </button>
                                
                            </div>
                        </InputGroup>
                    </Stack>
                    <br />
                    
                    {isLoading ? <LoadingIndicator /> : 
                    <Component key={search} server={server} status={status} data={appData.tableData} search={search}/>
                                    }
                </div>
        </div>
        );
    }
    else {
        return (
            <div>
                {defaultShow}
            </div>
        )
    }
}

export default DailyHealthcheck;
