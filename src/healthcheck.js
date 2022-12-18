import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import DailyHealthcheck from './DailyHealthcheck';
import BatchTable from './BatchTable';
// import "./index.css"



const App = () => {
  const [tabIndex, setTabIndex] = useState(1);

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
              <DailyHealthcheck tabIndex={tabIndex}/>
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