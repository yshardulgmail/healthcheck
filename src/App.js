import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import Example from './Donut1';
import ApplicationsTable from './Table';

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Health Check 1</Tab>
        <Tab>Health Check 2</Tab>
      </TabList>
      <TabPanel>
        <div>
          <div>
            <Example/>
          </div>
          <div>
            <ApplicationsTable />
          </div>
        </div>
          

      </TabPanel>
      <TabPanel></TabPanel>
    </Tabs>
  );
};

export default App;