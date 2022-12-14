import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect } from 'react';
import Example from './Donut1';
import BatchTable from './BatchTable';
// import "./index.css"



const App = () => {
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    // clearTimer(getDeadTime());
    const interval = setInterval(() => {
      console.log("Interval: ", interval);
      setTimer('00:00:10');
      // if (Ref.current) clearInterval(Ref.current);
      let deadline = new Date();
      startTimer(deadline.setSeconds(deadline.getSeconds() +60));
      window.location.reload();
    }, 60*1000);
    // Ref.current = id;
  
    return () => clearInterval(interval);
  }, []);

  
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
            <button onClick={() => window.location.reload()} className="button modal_send" style={{marginLeft: "10px"}}>
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