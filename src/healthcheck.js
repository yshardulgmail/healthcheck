import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState, useEffect, useRef } from 'react';
import DailyHealthcheck from './DailyHealthcheck';
import BatchTable from './BatchTable';
import JobDetails from './JobDetails';
import Modal from './Modal';
import "./index.css"



const App = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [modalData, setModalData] = useState(<></>);
  const [modalButton, setModalButton] = useState(<></>);
  const [modalStyle, setModalStyle] = useState({});
  const [show, setShow] = useState(false);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const errorRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    const username = userRef.current.value;
    const password = passRef.current.value;
    if (username.trim() === "") {
      setErrorMsg("Please enter Username!!");
    }
    else if (password.trim() === "") {
      setErrorMsg("Please enter Password!!");
    }
    else {
      fetch('/api/healthcheck/checkUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then((response) => {
          if (response.ok === false) {
            if (response.status === 403) {
              throw Error("Authentication Failed!!!");
            }
            else {
              throw Error("Server Error!!!");
            }
          }
          return response.json()
        })
        .then((user) => {
          setLoggedIn(true);
          setLoggedInUser(username);
          setShow(false);
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMsg(err.message);
          errorRef.current.value = err.message;
        });
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
    console.log(e);
  }

  const showLogin = () => {
    if(!loggedIn) {
      const loginModal = <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <table className='login_table'>
            <tr>
              <td><label className='login_labels'>Username </label></td>
              <td><input type="text" name="login" className='login_texts' ref={userRef} /></td>
            </tr>
            <tr>
              <td><label className='login_labels'>Password </label></td>
              <td><input type="password" name="password"
                className='login_texts' onKeyDown={(e) => handleEnter(e)}
                ref={passRef}
              /> </td>
              {/* <label style={{color: "red", marginTop: "10px"}}>{errorMsg}</label></td> */}
            </tr>
            <tr>
              <td colSpan={2}><label style={{ color: "red" }}>{errorMsg}</label></td>
            </tr>
          </table>
        </div>
      </form>
      setModalData(loginModal);
      setModalButton(<div style={{ overflow: "hidden" }}>
        <button onClick={() => {setShow(false)}} className="refresh_now" style={{ float: "right", width: "100px", marginRight: "40px"}}>
            {"Cancel"}
          </button>
        <button onClick={handleLogin} className="refresh_now" style={{ float: "left", width: "100px" }}>
          {"Login"}
        </button>
        
      </div>);
      setModalStyle({ height: "42%", width: "30%" })
      setShow(true);
    }
    else{
      setLoggedIn(false);
      setTabIndex(1);
    }
  };

  const loggedOutClasses = loggedIn ? "react-tabs__tab-list" : "react-tabs__tab-list react-tabs__tab-list_logeed_out";

  return (
    <div className='tabs_container'>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} focusTabOnClick={false} className={loggedOutClasses}>
        <TabList>
          <Tab disabled><label style={{ color: "white", fontWeight: "bold", fontSize: "x-large" }}>Bank Technology Operations</label></Tab>
          <Tab>Daily Healthcheck</Tab>
          {loggedIn && <Tab>Batch Notification</Tab>}
          {loggedIn && <Tab>Job Details</Tab>}
          
          <Tab disabled>
            {loggedIn ? <label style={{cursor: "pointer"}} onClick={showLogin}>Logout</label>
                :<label style={{cursor: "pointer"}} onClick={showLogin}>Login</label>}
          </Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel>
          <div>
            <DailyHealthcheck tabIndex={tabIndex} loggedIn={loggedIn} />
          </div>
        </TabPanel>
        <TabPanel>
          <BatchTable />
        </TabPanel>
        <TabPanel>
          <JobDetails loggedInUser={loggedInUser} />
        </TabPanel>
      </Tabs>

      <br />
      <div style={{ float: "right", marginRight: "40px" }} >
        <Modal title="Login"
          show={show} button={modalButton} style={modalStyle}
          onClose={() => setShow(false)}>
          {modalData}
        </Modal>
      </div>
    </div>
  );
};

export default App;