import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import Example from './Donut1';
import BatchTable from './BatchTable';
// import "./index.css"



const App = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [appData, setAppData] = useState([]);
  const [filter, setFilter] = useState(3);

  useEffect(() => {
    // clearTimer(getDeadTime());
    const interval = setInterval(() => {
      console.log("Interval: ", interval);
      setTimer('00:00:10');
      // if (Ref.current) clearInterval(Ref.current);
      let deadline = new Date();
      startTimer(deadline.setSeconds(deadline.getSeconds() +60));
      tabIndex === 1 && fetchData();
    }, 60*1000);
    // Ref.current = id;
  
    return () => clearInterval(interval);
  }, []);

  // const fetchdata = async () => {
  //   await fetch('/api/healthcheck/appstatus', {
  //     method: 'GET',
  //     mode: 'no-cors',
  //     // headers: {
  //     //     'Content-Type': 'application/json',
  //     //     'Access-Control-Allow-Origin': '*',
  //     //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  //     // }
  //   })
  //      .then((response) => response.json())
  //      .then((data) => {
  //         console.log(data);
  //         // setAppData(data.text());
  //      })
  //      .catch((err) => {
  //         console.log(err.message);
  //      });
  // }
  
  async function fetchData() {
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
            if(tableNodes.hasOwnProperty(server)) {
              console.log("inside");
              tableNodes[server].push(node);
            }
            else {
              tableNodes[server] = [node];
            }
            tempStart = tempEnd;
            tempEnd = tempEnd + filter;
          }
          console.log(tableNodes);
          
          setAppData(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
        
  }

  useEffect(() => {
    fetchData();
  }, []); 

  // useEffect(() => fetchdata(), []);

    // The state for our timer
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
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

  return (
    <div style={{background:"#009EDC"}}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab disabled><label style={{color: "white", fontWeight: "bold", fontSize: "x-large"}}>Bank Technology Operations</label></Tab>
          <Tab>Daily Healthcheck</Tab>
          <Tab>Batch Notification</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel>
          <div>
            <div style={{paddingTop: "30px"}}>
              <label style={{color: "black", fontWeight: "bold", fontSize: "x-large"}}>BDX Healthcheck Dashboard</label>
            </div>
            <div style={{overflow: "hidden", width: "100%"}}>
            <button onClick={() => fetchData()} className="button modal_send" style={{marginLeft: "10px"}}>
                Refresh Now!!
              </button>
              <label style={{float: "right"}}>Page will refresh in 1 min</label>
              

            </div>
            <div>
              <Example/>
            </div>
            
          </div>
            

        </TabPanel>
        <TabPanel>
          <BatchTable />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;