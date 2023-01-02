import React, { useState, useEffect } from 'react';

import { LoadingIndicatorBars } from './LoadingIndicator';
import './index.css'
import Modal from './Modal';
import TimePicker from 'react-time-picker';
// import { nodes } from './data';

const key = 'Search';
const nodes = [
  {
    id: "1",
    batch: "Batch job 1",
    sla_slo: "12:04 PM",
    eta: "",
    status: ""
  },
  {
    id: "2",
    batch: "Batch job 2",
    sla_slo: "03:46 AM",
    eta: "",
    status: ""
  },
  {
    id: "3",
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
  const [jobsData, setJobsData] = React.useState([]);
  const recipients = React.useRef(null);
  const [modalData, setModalData] = useState(<></>);
  const [modalButton, setModalButton] = useState(<></>);
  const [modalTitle, setModalTitle] = useState("");
  const [modalStyle, setModalStyle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const mailHtml = [];

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  function fetchJobs() {
    fetch('/api/healthcheck/batchJobs', {
      method: 'GET',
      mode: 'no-cors'
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(data => { throw Error(data.message) });
        }
        return response.json();
      })
      .then((jobs) => {
        setJobsData(jobs);
        setIsLoading(false);
      })
      .catch((err) => {
        setModalData(<h4 style={{ color: "red" }}>{err.message}</h4>);
        setModalStyle({ height: "25%", width: "40%" });
        setModalTitle("Message");
        setShow(true);
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const onChangeTimer = (id, data) => {
    console.log(data);
    const timeSplit = data.split(":");
    let finalTime = data + " AM";
    if (Number(timeSplit[0]) === 0) {
      finalTime = "12:" + timeSplit[1] + " AM";
    }
    if (Number(timeSplit[0]) >= 12) {
      if (Number(timeSplit[0] - 12) < 10) {
        if (Number(timeSplit[0] - 12) === 0) {
          finalTime = "12:" + timeSplit[1] + " PM";
        }
        else {
          finalTime = "0" + String(Number(timeSplit[0]) - 12) + ":" + timeSplit[1] + " PM";
        }
      }
      else {
        finalTime = String(Number(timeSplit[0]) - 12) + ":" + timeSplit[1] + " PM";
      }

    }
    let tempEta = { ...eta };
    tempEta[id] = finalTime;
    setETA(tempEta);
  }

  const onChangeStatus = (id, value) => {
    console.log(status);
    let val = { ...status }
    val[id] = value;
    setStatus(val);
  }


  // data = {
  //   nodes: data.nodes.filter((item) => item.batch.toLowerCase().startsWith(search.toLowerCase())),
  // };

  console.log(data);
  const handleReview = () => {

    const tableData = <div className='table_container' style={{ paddingTop: "30px" }}>
      <table class="styled-table" >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Sr.No.</th>
            <th style={{ width: "25%" }}>Batch Name</th>
            <th>SLA/SLO</th>
            <th>ETA</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map(node => {
            let tempHtml = "<tr>";
            tempHtml = tempHtml.concat("<td style='width:5%'>", node.id, "</td>")
              .concat("<td style='width:30%'>", node.batch, "</td>")
              .concat("<td>", node.sla_slo, "</td>")
              .concat("<td>", eta[node.id] ? eta[node.id] : "Not Provided", "</td>")
              .concat("<td>", status[node.id] ? status[node.id] : "Not Provided", "</td>")
              .concat("</tr>");
            mailHtml.push(tempHtml);
            return <tr>
              <td style={{ width: "5%" }}>{node.id}</td>
              <td style={{ width: "25%" }}>{node.batch}</td>
              <td>{node.sla_slo}</td>
              <td>{eta[node.id]}</td>
              <td>{status[node.id]}</td>
            </tr>
          })}
        </tbody>
      </table>
      <br />
      <br />
      <div style={{ display: "inline-block", width: "100%" }}>
        <label style={{ fontWeight: "bold" }}>Recipients: </label>
        <input style={{ marginLeft: "15px", width: "75%" }} type="text" ref={recipients}></input>
      </div>
    </div>;

    setModalData(tableData);
    setModalButton(<button onClick={() => sendMail()} className="refresh_now" style={{ float: "right", width: "100px" }}>
      Send Mail
    </button>);
    setModalStyle({ width: "80%" });
    setModalTitle("Review Summary");
    setShow(true);
  }
  const sendMail = () => {
    console.log(recipients.current.value);
    fetch("/api/healthcheck/sendMail", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: mailHtml.join(""),
        to: recipients.current.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Error in updating!!")
        }
        return response.text();
      })
      .then((text) => {
        setShow(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  console.log(data);
  return (
    <div>
      <div className='table_container' style={{ paddingTop: "30px" }}>

        <table class="styled-table" >
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Sr.No.</th>
              <th>Batch Name</th>
              <th>SLA/SLO</th>
              <th>ETA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsData.length === 0
              ? <tr><td colSpan={8}><LoadingIndicatorBars /></td></tr>
              : jobsData.map((item) => (

                <tr key={item.id}>
                  <td style={{ width: "5%" }}>{item.id}</td>
                  <td>{item.batch}</td>
                  <td>{item.sla_slo}</td>
                  <td>
                    <div>
                      <TimePicker onChange={(value) => onChangeTimer(item.id, value)} disableClock={true} clearIcon={null} format={"hh:mm a"} />
                    </div>
                  </td>
                  <td>
                    <select className='status_select' onChange={(evt) => onChangeStatus(item.id, evt.target.value)}>
                      <option style={{ textAlign: "center" }}>-</option>
                      <option style={{ textAlign: "center" }}>Status1</option>
                      <option style={{ textAlign: "center" }}>Status2</option>
                      <option style={{ textAlign: "center" }}>Status3</option>
                    </select>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
        <br />
      </div>

      <br />
      <div style={{ float: "right", marginRight: "40px" }}>
        <button onClick={() => handleReview()} className="refresh_now" style={{ width: "80px" }} disabled={isLoading}>Review</button>
        <Modal
          title={modalTitle}
          onClose={() => setShow(false)}
          show={show}
          button={modalButton}
          style={modalStyle}
        >
          {modalData}

        </Modal>
      </div>
    </div>
  );
};

export default BatchTable;