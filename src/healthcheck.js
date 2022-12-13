import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import Example from './Donut1';
import BatchTable from './BatchTable';



const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Daily Healthcheck</Tab>
        <Tab>Batch Notification</Tab>
      </TabList>
      <TabPanel>
        <div>
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