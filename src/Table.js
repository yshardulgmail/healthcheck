import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import './index.css';
import red from "./resources/red.png"
import green from "./resources/green.png"
// import { nodes } from './data';

const key = 'Search';
const nodes2 = {
    server0: [
    {
      id: '0',
      appName: "Google",
      appUrl: "https://www.google.com",
      "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "Down",
      status: "stopped",
    },
    {
        id: '1',
        appName: "Facebook",
        appUrl: "https://www.facebook.com",
        "4:30PM": "UP",
        "5:00PM": "Down",
        "5:30PM": "UP",
        status: "running",
    },
    {
        id: '2',
        appName: "Microsoft",
        appUrl: "https://www.microsoft.com",
        "4:30PM": "Down",
        "5:00PM": "UP",
        "5:30PM": "Down",
        status: "stopped",
    },
  ],
  server1: [
    {
      id: '3',
      appName: "Go",
      appUrl: "https://www.google.com",
      "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "Down",
      status: "stopped",
    },
    {
        id: '4',
        appName: "Fa",
        appUrl: "https://www.facebook.com",
        "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "UP",
      status: "running",
    },
    {
        id: '5',
        appName: "Mi",
        appUrl: "https://www.microsoft.com",
        "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "Down",
      status: "stopped",
    },
  ],
  server2: [
    {
      id: '6',
      appName: "Gogi",
      appUrl: "https://www.google.com",
      "4:30PM": "Down",
      "5:00PM": "UP",
      "5:30PM": "UP",
      status: "running",
    },
    {
        id: '7',
        appName: "Faci",
        appUrl: "https://www.facebook.com",
        "4:30PM": "down",
        "5:00PM": "down",
        "5:30PM": "Down",
        status: "stopped",
    },
    {
        id: '8',
        appName: "Micri",
        appUrl: "https://www.microsoft.com",
        "4:30PM": "UP",
        "5:00PM": "UP",
        "5:30PM": "Down",
        status: "stopped",
    },
  ],
  server3: [
    {
      id: '9',
      appName: "Googli",
      appUrl: "https://www.google.com",
      "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "UP",
      status: "running",
    },
    {
        id: '10',
        appName: "Facebooki",
        appUrl: "https://www.facebook.com",
        "4:30PM": "Down",
      "5:00PM": "UP",
      "5:30PM": "UP",
      status: "running",
    },
    {
        id: '11',
        appName: "Microsofti",
        appUrl: "https://www.microsoft.com",
        "4:30PM": "Down",
      "5:00PM": "Down",
      "5:30PM": "UP",
      status: "running",
    },
  ],
  server4: [
    {
      id: '12',
      appName: "Gooooog",
      appUrl: "https://www.google.com",
      "4:30PM": "UP",
      "5:00PM": "UP",
      "5:30PM": "Down",
      status: "running",
    },
    {
        id: '13',
        appName: "Faaaaaace",
        appUrl: "https://www.facebook.com",
        "4:30PM": "UP",
        "5:00PM": "UP",
        "5:30PM": "Down",
        status: "running",
    },
    {
        id: '14',
        appName: "Miiiiiiic",
        appUrl: "https://www.microsoft.com",
        "4:30PM": "UP",
        "5:00PM": "UP",
        "5:30PM": "Down",
        status: "running",
    },
  ]};
  

  // const nodes = {
  //     "BDS": [
  //         {
  //             "id": 0,
  //             "appName": "Goggle",
  //             "appUrl": "https://www.google.com",
  //             "4:30PM": "UP",
  //             "status": "DOWN",
  //             "5:00PM": "UP",
  //             "5:30PM": "DOWN"
  //         },
  //         {
  //             "id": 1,
  //             "appName": "Facebook",
  //             "appUrl": "https://www.facebook.com",
  //             "4:30PM": "UP",
  //             "status": "UP",
  //             "5:00PM": "DOWN",
  //             "5:30PM": "UP"
  //         }
  //     ],
  //     "DNS": [
  //         {
  //             "id": 2,
  //             "appName": "Goggle",
  //             "appUrl": "https://www.google.com",
  //             "4:30PM": "DOWN",
  //             "status": "DOWN",
  //             "5:00PM": "UP",
  //             "5:30PM": "DOWN"
  //         },
  //         {
  //             "id": 3,
  //             "appName": "Facebook",
  //             "appUrl": "https://www.facebook.com",
  //             "4:30PM": "UP",
  //             "status": "DOWN",
  //             "5:00PM": "UP",
  //             "5:30PM": "DOWN"
  //         }
  //     ],
  //     "BDSA": [
  //         {
  //             "id": 4,
  //             "appName": "Goggle",
  //             "appUrl": "https://www.google.com",
  //             "4:30PM": "UP",
  //             "status": "UP",
  //             "5:00PM": "UP",
  //             "5:30PM": "UP"
  //         },
  //         {
  //             "id": 5,
  //             "appName": "Facebook",
  //             "appUrl": "https://www.facebook.com",
  //             "4:30PM": "UP",
  //             "status": "DOWN",
  //             "5:00PM": "UP",
  //             "5:30PM": "DOWN"
  //         }
  //     ],
  //     "BAMS": [
  //         {
  //             "id": 6,
  //             "appName": "Goggle",
  //             "appUrl": "https://www.google.com",
  //             "4:30PM": "DOWN",
  //             "status": "UP",
  //             "5:00PM": "UP",
  //             "5:30PM": "UP"
  //         },
  //         {
  //             "id": 7,
  //             "appName": "Facebook",
  //             "appUrl": "https://www.facebook.com",
  //             "4:30PM": "DOWN",
  //             "status": "DOWN",
  //             "5:00PM": "DOWN",
  //             "5:30PM": "DOWN"
  //         }
  //     ],
  //     "BAQS": [
  //         {
  //             "id": 8,
  //             "appName": "Goggle",
  //             "appUrl": "https://www.google.com",
  //             "4:30PM": "UP",
  //             "status": "DOWN",
  //             "5:00PM": "UP",
  //             "5:30PM": "DOWN"
  //         },
  //         {
  //             "id": 9,
  //             "appName": "Facebook",
  //             "appUrl": "https://www.facebook.com",
  //             "4:30PM": "UP",
  //             "status": "UP",
  //             "5:00PM": "UP",
  //             "5:30PM": "UP"
  //         }
  //     ]
  // };


const Component = (props) => {
  
  const server = props.server;
  const status = props.status;
  const nodes = props.data;
  
  let data = { nodes };
  console.log("data : ", data);
//   const app
const COLUMNS = [
  { label: 'App Name', renderCell: (item) => <a target="_blank" href={item.appUrl}>{item.appName}</a> },
  { label: 'App URL', renderCell: (item) => <p>{item.appUrl}</p> },

  // { label: '4:30PM', renderCell: (item) => item["4:30PM"].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>},
  // { label: '5:00PM', renderCell: (item) => item["5:00PM"].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>},
  // { label: '5:30PM', renderCell: (item) => item["5:30PM"].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>},
];
  if(Object.keys(nodes).length > 0){
    console.log("node keys :", Object.keys(nodes));
    Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
      if(col.includes(":")){
        COLUMNS.push({ label: col, renderCell: (item) => item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>});
      }
    });
  }
  
  React.useEffect(() => console.log(props.data), [props.data])
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
//   const theme = useTheme(chakraTheme);
    const cust_theme = {...chakraTheme,
        HeaderRow: `
        background-color: black;
        color: white;
        `,
        Row: `
        &:nth-of-type(odd) {
            background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
            background-color: #eaf5fd;
        }
        `,
    };

const theme = useTheme(cust_theme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  if(server != "" && status != "") {
    console.log("inside server not blank", server, status);
    data = {
        nodes: data.nodes[server].filter((item) => item.appName.toLowerCase().startsWith(search.toLowerCase()) && 
                                                        item.status.toLowerCase().includes(status)),
    };
  }
  else {
    
    data = {
        nodes: data.nodes[Object.keys(data.nodes)[0]]
    };
    // Object.values(nodes).map(item => data.nodes.(...item))
    
  }
  console.log(data);
//   const COLUMNS = [
//     { label: 'Application Name', renderCell: (item) => <a href={item.appUrl}>{item.appName}</a> },
//     { label: 'Up Time', renderCell: (item) => item.upTime },
//     { label: 'Down Time', renderCell: (item) => item.downTime },
//   ];

  if(data.nodes) {
    return (
    
      <div>
        <Stack spacing={10}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch style={{ color: '#4a5568' }} />}
            />
            <Input className="search_input" placeholder="Search Application" value={search} onChange={handleSearch} />
          </InputGroup>
        </Stack>
        <br />
  
        <Box p={3} borderWidth="1px" borderRadius="lg">
          <CompactTable columns={COLUMNS} data={data} theme={theme} />
        </Box>
  
        <br />
      </div>
    );      
  }
  else {
    return (<div></div>);
  }
  
};

export default Component;