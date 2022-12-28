import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import './index.css'
import Modal from './Modal';
import TimePicker from 'react-time-picker';
// import HCTimePicker from './TimePicker';
// import { nodes } from './data';

const nodes = [
	{
		id: '0',
		srno: "1",
		jobName: "First Job",
		appName: "Facebook",
		category: "Don't Know",
		command: "command -to -run -job",
		fileLoc: "File Location",
		info: `This is one hell of a job.
		And this is some long and random description of it.
		No point in reading further.
		But I bet you will.`,
		splunk: "some random query",
		jobUrl: "https://wwww.facebook.com",
		// jobDesc: <table className='modal-table'><tbody>
		// 	<tr><th>App:</th><td>Facebook</td></tr>
		// 	<tr><th>Category:</th><td>Don't know</td></tr>
		// 	<tr><th>Script:</th><td>/some/script/path</td></tr>
		// 	<tr><th>Command:</th><td>Command -to -run -job</td></tr>
		// 	<tr><th>File Location:</th><td>The File Location</td></tr>
		// 	<tr><th>Log Path:</th><td>Log Path</td></tr>
		// 	<tr><th>Information:</th><td>This is one hell of a job.
		// 		And this is some long and random description of it.
		// 		No point in reading further.
		// 		But I bet you will.</td></tr>
		// 	<tr><th>Splunk Query:</th><td>Some random query</td></tr>
		// 	<tr><th>Job Details Link:</th><td><a href="https://www.google.com" target="_blank">First Job</a></td></tr>
		// </tbody></table>,
		jobBefore: "Third Job",
		jobAfter: "Second Job",
		sla: "09:34 PM",
		server: "CDMA",
		logPath: "/this/is/some/job1.log",
		scriptPath: "/this/is/some/job1.sh"
	},
	{
		id: '1',
		srno: "2",
		jobName: "Second Job",
		appName: "Google",
		category: "Don't Know",
		command: "command -to -run -job",
		fileLoc: "File Location",
		info: `This is another one hell of a job.
		And this is some long and random description of it.
		No point in reading further.
		But I bet you will.`,
		splunk: "some random query",
		jobUrl: "https://wwww.google.com",
		// jobDesc: <table className='modal-table'><tbody>
		// 	<tr><th>App:</th><td>Facebook</td></tr>
		// 	<tr><th>Category:</th><td>Don't know</td></tr>
		// 	<tr><th>Script:</th><td>/some/script/path</td></tr>
		// 	<tr><th>Command:</th><td>Command -to -run -job</td></tr>
		// 	<tr><th>File Location:</th><td>The File Location</td></tr>
		// 	<tr><th>Log Path:</th><td>Log Path</td></tr>
		// 	<tr><th>Information:</th><td>This is one hell of a job. And yes, you guessed it.
		// 		This is some long and random description of it.
		// 		No point in reading further.
		// 		But I bet you will.</td></tr>
		// 	<tr><th>Splunk Query:</th><td>Some random query</td></tr>
		// 	<tr><th>Job Details Link:</th><td><a href="https://www.facebook.com" target="_blank">Second Job</a></td></tr>
		// </tbody></table>,
		jobBefore: "First Job",
		jobAfter: "Third Job",
		sla: "05:34 AM",
		server: "BAQS",
		logPath: "/this/is/some/job2.log",
		scriptPath: "/this/is/some/job2.sh"
	},
	{
		id: '2',
		srno: "3",
		jobName: "Third Job",
		appName: "Microsoft",
		category: "Don't Know",
		command: "command -to -run -job",
		fileLoc: "File Location",
		info: `Do I need to say anything??`,
		splunk: "some random query",
		jobUrl: "https://wwww.microsoft.com",
		// jobDesc: <table className='modal-table'><tbody>
		// 	<tr><th>App:</th><td>Facebook</td></tr>
		// 	<tr><th>Category:</th><td>Don't know</td></tr>
		// 	<tr><th>Script:</th><td>/some/script/path</td></tr>
		// 	<tr><th>Command:</th><td>Command -to -run -job</td></tr>
		// 	<tr><th>File Location:</th><td>The File Location</td></tr>
		// 	<tr><th>Log Path:</th><td>Log Path</td></tr>
		// 	<tr><th>Information:</th><td>Do I need to say anything??</td></tr>
		// 	<tr><th>Splunk Query:</th><td>Some random query</td></tr>
		// 	<tr><th>Job Details Link:</th><td><a href="https://www.facebook.com" target="_blank">Third Job</a></td></tr>
		// </tbody></table>,
		jobBefore: "Second Job",
		jobAfter: "First Job",
		sla: "12:34 PM",
		server: "BAQS",
		logPath: "/this/is/some/job3.log",
		scriptPath: "/this/is/some/job3.sh"
	},
];



const JobDetails = (props) => {
	let data = { nodes };
	const [modalData, setModalData] = React.useState(<></>);
	const [modalButton, setModalButton] = React.useState(<></>);
	const [search, setSearch] = React.useState('');
	const timeRef = React.createRef();
	const [eta, setETA] = React.useState('');
	const [show, setShow] = React.useState(false);
	const headerDisplay = show && "display: none"
	const chakraTheme = getTheme(DEFAULT_OPTIONS);
	//   const theme = useTheme(chakraTheme);
	const cust_theme = {
		...chakraTheme,
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
		tempEta[srno] = finalTime;
		setETA(tempEta);
	}

	data = {
		nodes: data.nodes.filter((item) => item.jobName.toLowerCase().startsWith(search.toLowerCase())),
	};

	const saveJobDetails = (e) => {
		e.preventDefault();

		console.log(e.target.jobName.value);
	};

	const handleNew = () => {
		const editData = <form onSubmit={(e) => saveJobDetails(e)}>
			<table className='modal-table'>
				<tr><th>Job Name:</th><td><input type="text" name="jobName" /></td></tr>
				<tr><th>Predecessor Job Name:</th><td><input type="text" name="jobBefore" /></td></tr>
				<tr><th>Successor Job Name:</th><td><input type="text" name="jobAfter" /></td></tr>
				<tr><th>SLA:</th><td><input type="text" name="sla" /></td></tr>
				<tr><th>Server:</th><td><input type="text" name="server" /></td></tr>
				<tr><th>Log Path:</th><td><input type="text" name="logPath" /></td></tr>
				<tr><th>Script Path:</th><td><input type="text" name="scriptPath" /></td></tr>
				<tr><th>Application Name:</th><td><input type="text" name="appName" /></td></tr>
				<tr><th>Category:</th><td><input type="text" name="category" /></td></tr>
				<tr><th>Command:</th><td><input type="text" name="command" /></td></tr>
				<tr><th>File Location:</th><td><input type="text" name="fileLoc" /></td></tr>
				<tr><th>Information:</th><td><input type="text" name="info" /></td></tr>
				<tr><th>Splunk Query:</th><td><input type="text" name="splunk" /></td></tr>
				<tr><th>Job URL:</th><td><input type="text" name="jobUrl" /></td></tr>
			</table>
			<input type="submit" value="Save Job Details" className="refresh_now" style={{ float: "right", width: "150px" }} />
		</form>
		setModalData(editData);
		setModalButton(<button onClick={() => setShow(false)} className="refresh_now" style={{ float: "right", width: "100px" }}>
			{"Close"}
		</button>);
		setShow(true);
	};

	const handleEdit = (jobId) => {
		const jobDetails = nodes.filter(node => node.id === jobId)[0]
		const editData = <form onSubmit={(e) => saveJobDetails(e, jobId)}>
			<table className='modal-table'>
				<tr><th>Job Name:</th><td><input type="text" name="jobName" defaultValue={jobDetails.jobName} /></td></tr>
				<tr><th>Predecessor Job Name:</th><td><input type="text" name="jobBefore" defaultValue={jobDetails.jobBefore} /></td></tr>
				<tr><th>Successor Job Name:</th><td><input type="text" name="jobAfter" defaultValue={jobDetails.jobAfter} /></td></tr>
				{/* <tr><th>SLA:</th><td><div>
                      <TimePicker onChange={(value) => onChangeTimer(jobDetails.jobId, value)} disableClock={true} clearIcon={null} format={"hh:mm a"}/>
                    </div></td></tr> */}
				<tr><th>SLA:</th><td><input type="text" name="sla" defaultValue={jobDetails.sla} /></td></tr>
				<tr><th>Server:</th><td><input type="text" name="server" defaultValue={jobDetails.server} /></td></tr>
				<tr><th>Log Path:</th><td><input type="text" name="logPath" defaultValue={jobDetails.logPath} /></td></tr>
				<tr><th>Script Path:</th><td><input type="text" name="scriptPath" defaultValue={jobDetails.scriptPath} /></td></tr>
				<tr><th>Application Name:</th><td><input type="text" name="appName" defaultValue={jobDetails.appName} /></td></tr>
				<tr><th>Category:</th><td><input type="text" name="category" defaultValue={jobDetails.category} /></td></tr>
				<tr><th>Command:</th><td><input type="text" name="command" defaultValue={jobDetails.command} /></td></tr>
				<tr><th>File Location:</th><td><input type="text" name="fileLoc" defaultValue={jobDetails.fileLoc} /></td></tr>
				<tr><th>Information:</th><td><input type="text" name="info" defaultValue={jobDetails.info} /></td></tr>
				<tr><th>Splunk Query:</th><td><input type="text" name="splunk" defaultValue={jobDetails.splunk} /></td></tr>
				<tr><th>Job URL:</th><td><input type="text" name="jobUrl" defaultValue={jobDetails.jobUrl} /></td></tr>
			</table>
			<input type="submit" value="Save Job Details" className="refresh_now" style={{ float: "right", width: "150px" }} />
		</form>
		setModalData(editData);
		setModalButton(<button onClick={() => setShow(false)} className="refresh_now" style={{ float: "right", width: "100px" }}>
			{"Close"}
		</button>);
		setShow(true);
	};

	//   const COLUMNS = [
	//     { label: 'Application Name', renderCell: (item) => <a href={item.appUrl}>{item.appName}</a> },
	//     { label: 'Up Time', renderCell: (item) => item.upTime },
	//     { label: 'Down Time', renderCell: (item) => item.downTime },
	//   ];
	// const COLUMNS = [
	//   { label: 'Sr. No.', renderCell: (item) => item.srno },
	//   { label: 'Batch Name', renderCell: (item) => item.batch },
	//   { label: 'SLA/SLO', renderCell: (item) => item.sla_slo },
	//   { label: 'ETA', renderCell: (item) => (
	//     <div>
	//       <TimePicker onChange={(value) => onChangeTimer(item.srno, value)} disableClock={true} format={"h:m a"}/>
	//     </div>) },
	//   { label: 'Status', renderCell: (item) => (
	//     <select onChange={(evt) => onChangeStatus(item.srno, evt.target.value)}>
	//       <option>-</option>
	//       <option>Status1</option>
	//       <option>Status2</option>
	//       <option>Status3</option>
	//     </select>) },
	// ];
	const showJobDetails = (jobId) => {
		const jobDetails = nodes.filter(node => node.id === jobId)[0]
		const jobDesc = <table className='modal-table'><tbody>
		 	<tr><th>App:</th><td>{jobDetails.appName}</td></tr>
		 	<tr><th>Category:</th><td>{jobDetails.category}</td></tr>
		 	<tr><th>Script:</th><td>{jobDetails.scriptPath}</td></tr>
		 	<tr><th>Command:</th><td>{jobDetails.command}</td></tr>
		 	<tr><th>File Location:</th><td>{jobDetails.fileLoc}</td></tr>
		 	<tr><th>Log Path:</th><td>{jobDetails.logPath}</td></tr>
		 	<tr><th>Information:</th><td>{jobDetails.info}</td></tr>
		 	<tr><th>Splunk Query:</th><td>{jobDetails.splunk}</td></tr>
		 	<tr><th>Job Details Link:</th><td><a href={jobDetails.jobLink} target="_blank">{jobDetails.jobName}</a></td></tr>
		 </tbody></table>

		setModalButton(<button onClick={() => setShow(false)} className="refresh_now" style={{ float: "right", width: "100px" }}>
			{"Close"}
		</button>);
		setModalData(jobDesc);
		setShow(true);
	}

	// const tableData = <table border={1} cellPadding={"5px"}>
	// 	<tr>
	// 		<th>Sr.No.</th>
	// 		<th>Job Name</th>
	// 		<th>Predecessor Job</th>
	// 		<th>Successor Job</th>
	// 		<th>SLA</th>
	// 		<th>Server</th>
	// 		<th>Log Path</th>
	// 		<th>Script Path</th>
	// 	</tr>
	// 	{nodes.map(node =>
	// 		<tr>
	// 			<td>{node.srno}</td>
	// 			<td><a onClick={() => showJobDetails(node.jobDesc)}>{node.jobName}</a></td>
	// 			<td>{node.jobBefore}</td>
	// 			<td>{node.jobAfter}</td>
	// 			<td>{node.sla}</td>
	// 			<td>{node.server}</td>
	// 			<td>{node.logPath}</td>
	// 			<td>{node.scriptPath}</td>
	// 		</tr>
	// 	)}
	// </table>;
	console.log(data);
	return (
		<div style={{ marginTop: "25px" }}>
			<Stack spacing={10}>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<FaSearch style={{ color: '#4a5568' }} />}
					/>
					<Input className="search_input" placeholder="Search Job" value={search} onChange={handleSearch} />
				</InputGroup>
			</Stack>
			<div className='table_container' style={{ paddingTop: "10px" }}>

				<table class="styled-table" >
					<thead>
						<tr>
							<th style={{ width: "10%" }}>Job Name</th>
							<th style={{ width: "10%", textAlign: "center" }}>Predecessor Job</th>
							<th style={{ width: "10%" }}>Successor Job</th>
							<th>SLA</th>
							<th>Server</th>
							<th style={{ width: "20%" }}>Log Path</th>
							<th style={{ width: "20%" }}>Script Path</th>
							<th style={{ width: "5px" }}>Edit</th>
						</tr>
					</thead>
					<tbody>
						{data.nodes.map((node) => (

							<tr key={node.id}>
								<td style={{ width: "10%" }}><a href="javascript:;" onClick={(e) => showJobDetails(node.id)}>{node.jobName}</a></td>
								<td style={{ width: "10%", textAlign: "center" }}>{node.jobBefore}</td>
								<td style={{ width: "10%" }}>{node.jobAfter}</td>
								{/* <td><HCTimePicker dataId={node.id} ref={timeRef} onTimeChange={(newTime) => console.log(newTime)}/></td> */}
								<td>{node.sla}</td>
								<td>{node.server}</td>
								<td style={{ width: "20%" }}>{node.logPath}</td>
								<td style={{ width: "20%" }}>{node.scriptPath}</td>
								<th style={{ width: "5px" }}><button onClick={() => handleEdit(node.id)} className="refresh_now" style={{ width: "50px", float: "inherit" }}>Edit</button></th>
							</tr>
						))}

					</tbody>
				</table>
				<br />
				<button onClick={() => handleNew()} className="refresh_now" style={{ float: "right", width: "100px" }}>
			Add new Job
		</button>
			</div>

			<br />
			<div style={{ float: "right", marginRight: "40px" }}>
				<Modal title="Job Details" onClose={() => setShow(false)} show={show} button={modalButton}>
					<br />

					{modalData}
					<br />
					<br />
				</Modal>
			</div>
		</div>
	);
};

export default JobDetails;