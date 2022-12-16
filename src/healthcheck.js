import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import Example from './DailyHealthcheck';
import BatchTable from './BatchTable';
// import "./index.css"



const App = () => {
  const [tabIndex, setTabIndex] = useState(1);

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
  
  

  // useEffect(() => fetchdata(), []);

    // The state for our timer
    

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
              <Example tabIndex={tabIndex}/>
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