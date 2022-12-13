import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import Example from './Donut1';
import BatchTable from './BatchTable';



const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval: ", interval);
      window.location.reload();
    }, 60*1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Daily Healthcheck</Tab>
        <Tab>Batch Notification</Tab>
      </TabList>
      <TabPanel>
        <div>
          <div>
            <h1 style={{color: "lightblue"}}>BDX Healthcheck Dashboard</h1>
          </div>
          <div>
            <label>Page with refresh in 1 min</label>
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
  );
};

export default App;