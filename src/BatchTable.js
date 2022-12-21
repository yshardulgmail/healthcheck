 import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import './index.css'
import Modal from './Modal';
import TimePicker from 'react-time-picker';
// import { nodes } from './data';

const key = 'Search';
const nodes = [
    {
      id: '0',
      srno: "1",
      batch: "Batch job 1",
      sla_slo: "12:04 PM",
      eta: "",
      status: ""
    },
    {
      id: '1',
      srno: "2",
      batch: "Batch job 2",
      sla_slo: "03:46 AM",
      eta: "",
      status: ""
    },
    {
      id: '2',
      srno: "3",
      batch: "Batch job 3",
      sla_slo: "07:23 PM",
      eta: "",
      status: ""
    },
  ];
  
  

const BatchTable = (props) => {
  let data = { nodes };
  const [search, setSearch] = React.useState('');
  const [eta, setETA] = React.useState({});
  const [status, setStatus] = React.useState({});
  const [show, setShow] = React.useState(false);
  
  const headerDisplay = show && "display: none"
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
//   const theme = useTheme(chakraTheme);
  const cust_theme = {...chakraTheme,
      HeaderRow: `
      background-color: black;
      color: white;
       ` + headerDisplay,
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


  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const onChangeTimer = (srno, data) => {
    console.log(eta);
    const timeSplit = data.split(":");
    let finalTime = data + " AM";
    if(Number(timeSplit[0]) > 12) {
      finalTime = String(Number(timeSplit[0]) - 12) + ":" + timeSplit[1] + " PM";
    }
    let tempEta = {...eta};
    tempEta[srno] = finalTime;
    setETA(tempEta);
  }

  const onChangeStatus = (srno, value) => {
    console.log(status);
    let val = {...status}
    val[srno] = value;
    setStatus(val);
  }

  data = {
      nodes: data.nodes.filter((item) => item.batch.toLowerCase().startsWith(search.toLowerCase())),
  };
  
  console.log(data);
//   const COLUMNS = [
//     { label: 'Application Name', renderCell: (item) => <a href={item.appUrl}>{item.appName}</a> },
//     { label: 'Up Time', renderCell: (item) => item.upTime },
//     { label: 'Down Time', renderCell: (item) => item.downTime },
//   ];
const COLUMNS = [
  { label: 'Sr. No.', renderCell: (item) => item.srno },
  { label: 'Batch Name', renderCell: (item) => item.batch },
  { label: 'SLA/SLO', renderCell: (item) => item.sla_slo },
  { label: 'ETA', renderCell: (item) => (
    <div>
      <TimePicker onChange={(value) => onChangeTimer(item.srno, value)} disableClock={true} format={"h:m a"}/>
    </div>) },
  { label: 'Status', renderCell: (item) => (
    <select onChange={(evt) => onChangeStatus(item.srno, evt.target.value)}>
      <option>-</option>
      <option>Status1</option>
      <option>Status2</option>
      <option>Status3</option>
    </select>) },
];

const tableData = <table border={1} cellPadding={"5px"}>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Batch Name</th>
                      <th>SLA/SLO</th>
                      <th>ETA</th>
                      <th>Status</th>
                    </tr>
                    {nodes.map(node =>
                      <tr>
                          <td>{node.srno}</td>
                          <td>{node.batch}</td>
                          <td>{node.sla_slo}</td>
                          <td>{eta[node.srno]}</td>
                          <td>{status[node.srno]}</td>
                      </tr>
                    )}
                  </table>;
  console.log(data);
  return (
    <div>
      {/* <Box p={1} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box> */}
      <div className='table_container' style={{paddingTop: "30px"}}>
        
      <table class="styled-table" >
          <thead>
              <tr>
                  <th>Sr.No.</th>
                  <th>Batch Name</th>
                  <th>SLA/SLO</th>
                  <th>ETA</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              {Object.keys(nodes).map((item) => (
                
                <tr key={nodes[item].id}>
                  <td>{nodes[item].srno}</td>
                  <td>{nodes[item].batch}</td>
                  <td>{nodes[item].sla_slo}</td>
                  <td>
                    <div>
                      <TimePicker onChange={(value) => onChangeTimer(nodes[item].srno, value)} disableClock={true} clearIcon={null} format={"h:m a"}/>
                    </div>
                  </td>
                  <td>
                    <select className='status_select' onChange={(evt) => onChangeStatus(nodes[item].srno, evt.target.value)}>
                      <option>-</option>
                      <option>Status1</option>
                      <option>Status2</option>
                      <option>Status3</option>
                    </select>
                  </td>
                </tr>
              ))}
            
          </tbody>
      </table>
        <br />
      </div>

      <br />
      <div style={{float: "right", marginRight: "40px" }}>
        <button onClick={() => setShow(true)} className="refresh_now" style={{width: "80px"}}>Review</button>
        <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
          <label style={{fontWeight: "bold"}}>Review Summary: </label>
          <br />
          <br />
            {tableData}
          <br />
          <br />
          <div style={{display: "inline-block", width: "100%"}}><label style={{fontWeight: "bold"}}>Recipients: </label><input style={{marginLeft: "15px", width: "75%"}} type="text"></input></div>
        </Modal>
      </div>
    </div>
  );
};

export default BatchTable;