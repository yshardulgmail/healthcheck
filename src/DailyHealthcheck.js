import React, { PureComponent, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./index.css";
import Component from './Table';
import Countdown from 'react-countdown';
import { right } from '@popperjs/core';
import { FaSearch } from 'react-icons/fa';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';


const COLORS = ['green', 'red'];

const Example = (props) => {
    const [server, setServer] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [appData, setAppData] = useState({tableData: {}, donutData: []});
    // const [filter, setFilter] = useState(3);
    const [timer, setTimer] = useState('1:00');
    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setSearch(event.target.value);
    };
  
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
            let counter = 1;
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
                const tempData = processedAppData[app].slice(-filter);
                console.log("tempData: ",tempData);
                const node = {};
                let server = "";
                let status = "";
                tempData.map(item => {
                    console.log(counter);
                    if(node.hasOwnProperty(rowId)) {
                        node[item.check_time] = item.status;
                        counter++;
                    }
                    else{
                        node["id"] = rowId;
                        node["appName"] = item.app_name;
                        node["appUrl"] = item.app_url;
                        node[item.check_time] = item.status;
                        node["status"] = item.status;
                        counter = 1;
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

    const changeFilter = (value) => {
        fetchData(false, value);

    };

    const data = appData.donutData;
    // console.log("donut data", data);
    // data.map((entry, index) => {
    //     console.log("server", Object.values(entry));
    // });

    if(Object.keys(appData.tableData).length > 0){
        return (
            <div>
                
                <div style={{paddingTop: "30px"}}>
                <label style={{color: "black", fontWeight: "bold", fontSize: "x-large"}}>BDX Healthcheck Dashboard</label>
                </div>
                
                <div className="donuts_wrapper">
                    {
                    data.map((entry, index) => (
                        <div className="donut_wrapper">
                            <PieChart width={0.196 * window.innerWidth} height={.50 * window.innerHeight} title={Object.keys(entry)[0]}>
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
                <div>
                    <Stack spacing={10}>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents="none"
                            children={<FaSearch style={{ color: '#4a5568' }} />}
                            />
                            <Input className="search_input" placeholder="Search Application" value={search} onChange={handleSearch} />
                            <div style={{overflow: "hidden", width: "50%"}}>
                                <button onClick={() => fetchData(true)} className="button modal_send" >
                                    Refresh Now!!
                                </button>
                                <select autocomplete="off" onChange={(evt) => changeFilter(evt.target.value)} className="button modal_send" >
                                    <option value="3" selected>LAST 3 HOURS</option>
                                    <option value="6" >LAST 6 HOURS</option>
                                    <option value="12" >LAST 12 HOURS</option>
                                </select>
                                {/* <label style={{float: "right"}}>Page will refresh in </label> <Countdown style={{float: "right"}} date={Date.now() + 10000} /> */}
                            

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

export default Example;