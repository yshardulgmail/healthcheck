import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./index.css";
import Component from './Table';

const data = [
  { server0: [{ name: 'Running', value: 30, server: "server0" }, { name: 'Stopped', value: 10, server: "server0" }]},
  { server1: [{ name: 'Running', value: 80, server: "server1" }, { name: 'Stopped', value: 50, server: "server1" }]},
  { server2: [{ name: 'Running', value: 10, server: "server2" }, { name: 'Stopped', value: 50, server: "server2" }]},
  { server3: [{ name: 'Running', value: 100, server: "server3" }, { name: 'Stopped', value: 0, server: "server3" }]},
  { server4: [{ name: 'Running', value: 100, server: "server4" }, { name: 'Stopped', value: 0, server: "server4" }]},
];
const COLORS = ['green', 'red'];

const Example = () => {
    const [server, setServer] = React.useState('');
    const [status, setStatus] = React.useState('');
    const clicking = (data, data1) => {
        console.log(server)
        setServer(data["server"]);
        setStatus(data["name"].toLowerCase());
    };

    data.map((entry, index) => {
        console.log("server", Object.values(entry));
    });

    return (
        <div>
            <div className="donuts_wrapper">
                {
                data.map((entry, index) => (
                    <div className="donut_wrapper">
                        <PieChart width={0.196 * window.innerWidth} height={.30 * window.innerHeight} title={Object.keys(entry)[0]}>
                            <Pie 
                                
                                data={entry["server"+String(index)]}
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
                <Component key={server} server={server} status={status} />
            </div>
    </div>
    );
}

export default Example;
