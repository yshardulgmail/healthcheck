import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box } from '@chakra-ui/react';
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import './index.css';
import red from "./resources/red.png"
import green from "./resources/green.png"
// import { nodes } from './data';

// const nodes2 = {
//     server0: [
//     {
//       id: '0',
//       appName: "Google",
//       appUrl: "https://www.google.com",
//       "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "Down",
//       status: "stopped",
//     },
//     {
//         id: '1',
//         appName: "Facebook",
//         appUrl: "https://www.facebook.com",
//         "4:30PM": "UP",
//         "5:00PM": "Down",
//         "5:30PM": "UP",
//         status: "running",
//     },
//     {
//         id: '2',
//         appName: "Microsoft",
//         appUrl: "https://www.microsoft.com",
//         "4:30PM": "Down",
//         "5:00PM": "UP",
//         "5:30PM": "Down",
//         status: "stopped",
//     },
//   ],
//   server1: [
//     {
//       id: '3',
//       appName: "Go",
//       appUrl: "https://www.google.com",
//       "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "Down",
//       status: "stopped",
//     },
//     {
//         id: '4',
//         appName: "Fa",
//         appUrl: "https://www.facebook.com",
//         "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "UP",
//       status: "running",
//     },
//     {
//         id: '5',
//         appName: "Mi",
//         appUrl: "https://www.microsoft.com",
//         "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "Down",
//       status: "stopped",
//     },
//   ],
//   server2: [
//     {
//       id: '6',
//       appName: "Gogi",
//       appUrl: "https://www.google.com",
//       "4:30PM": "Down",
//       "5:00PM": "UP",
//       "5:30PM": "UP",
//       status: "running",
//     },
//     {
//         id: '7',
//         appName: "Faci",
//         appUrl: "https://www.facebook.com",
//         "4:30PM": "down",
//         "5:00PM": "down",
//         "5:30PM": "Down",
//         status: "stopped",
//     },
//     {
//         id: '8',
//         appName: "Micri",
//         appUrl: "https://www.microsoft.com",
//         "4:30PM": "UP",
//         "5:00PM": "UP",
//         "5:30PM": "Down",
//         status: "stopped",
//     },
//   ],
//   server3: [
//     {
//       id: '9',
//       appName: "Googli",
//       appUrl: "https://www.google.com",
//       "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "UP",
//       status: "running",
//     },
//     {
//         id: '10',
//         appName: "Facebooki",
//         appUrl: "https://www.facebook.com",
//         "4:30PM": "Down",
//       "5:00PM": "UP",
//       "5:30PM": "UP",
//       status: "running",
//     },
//     {
//         id: '11',
//         appName: "Microsofti",
//         appUrl: "https://www.microsoft.com",
//         "4:30PM": "Down",
//       "5:00PM": "Down",
//       "5:30PM": "UP",
//       status: "running",
//     },
//   ],
//   server4: [
//     {
//       id: '12',
//       appName: "Gooooog",
//       appUrl: "https://www.google.com",
//       "4:30PM": "UP",
//       "5:00PM": "UP",
//       "5:30PM": "Down",
//       status: "running",
//     },
//     {
//         id: '13',
//         appName: "Faaaaaace",
//         appUrl: "https://www.facebook.com",
//         "4:30PM": "UP",
//         "5:00PM": "UP",
//         "5:30PM": "Down",
//         status: "running",
//     },
//     {
//         id: '14',
//         appName: "Miiiiiiic",
//         appUrl: "https://www.microsoft.com",
//         "4:30PM": "UP",
//         "5:00PM": "UP",
//         "5:30PM": "Down",
//         status: "running",
//     },
//   ]};

const Component = (props) => {
  
  const server = props.server;
  const status = props.status;
  const nodes = props.data;
  const search = props.search;
  
  console.log("seasrch: ", search);
  let data = { nodes };
  console.log("data : ", data);
  const COLUMNS = [
    { label: 'App Name', renderCell: (item) => <a target="_blank" href={item.appUrl}>{item.appName}</a> },
    { label: 'App URL', renderCell: (item) => <p>{item.appUrl}</p> },
  ];
  if(Object.keys(nodes).length > 0){
    console.log("node keys :", Object.keys(nodes));
    Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
      if(col.includes(":")){
        COLUMNS.push({ label: col, renderCell: (item) => item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>});
      }
    });
  }
  
  React.useEffect(() => console.log(props.data), [props.data, props.search])
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

  

  if(server != "" && status != "") {
    console.log("inside server not blank", server, status);
    data = {
        nodes: data.nodes[server].filter((item) => item.appName.toLowerCase().startsWith(search.toLowerCase()) && 
                                                        item.status.toLowerCase().includes(status)),
    };
  }
  else {
    if(Object.keys(nodes).length > 0){
      data = {
          nodes: data.nodes[Object.keys(data.nodes)[0]].filter((item) => item.appName.toLowerCase().startsWith(search.toLowerCase()))
      };
    }    
  }
  console.log(data);

  if(Object.keys(nodes).length > 0){
    
    return (
    
      <div className='table_container'>
        {/* <Box p={3} borderWidth="1px" borderRadius="lg">
          <CompactTable columns={COLUMNS} data={data} theme={theme} />
        </Box> */}
        {/* <Table data={data} theme={theme}>
      {(tableList) => (
        <>
          <Header>
              <HeaderRow>
                  <HeaderCell style={{width: "150%"}}>App Name</HeaderCell>
                  <HeaderCell style={{width: "150%"}}>App URL</HeaderCell>
                  {Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
                    if(col.includes(":")){
                      // COLUMNS.push({ label: col, renderCell: (item) => item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>});
                      return <HeaderCell  style={{width: "50%"}}>{col}</HeaderCell>
                    }
                  })};
              </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.appName}</Cell>
                <Cell>{item.appUrl}</Cell>
                {Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
                  if(col.includes(":")){
                    // COLUMNS.push({ label: col, renderCell: (item) => item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>});
                    return <Cell style={{width: "50%"}}>{item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>}</Cell>
                  }
                })};
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table> */}

<table class="styled-table">
    <thead>
        <tr>
            <th>App Name</th>
            <th>App URL</th>
            {Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
              console.log(col);
              if(col.includes(":")){
                return <th>{col}</th>
              }
            })}
        </tr>
    </thead>
    <tbody>
        {Object.keys(data.nodes).map((item) => (
          <tr key={data.nodes[item].id} item={item}>
            <td>{data.nodes[item].appName}</td>
            <td>{data.nodes[item].appUrl}</td>
            {Object.keys(nodes[Object.keys(nodes)[0]][0]).map(col => {
              if(col.includes(":")){
                // COLUMNS.push({ label: col, renderCell: (item) => item[col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>});
                return <td>{data.nodes[item][col].toLowerCase() === "up" ? <img id="running_img" src={green}></img> : <img id="stopped_img" src={red}></img>}</td>
              }
            })}
          </tr>
        ))}
       
    </tbody>
</table>
        <br />
      </div>
    );      
  }
  else {
    return (<div></div>);
  }
  
};

export default Component;