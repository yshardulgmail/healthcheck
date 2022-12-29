import React, { useState, useEffect } from 'react';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import './index.css'
import Modal from './Modal';
import TimePicker from 'react-time-picker';
import { LoadingIndicatorBars } from './LoadingIndicator';
// import HCTimePicker from './TimePicker';
// import { nodes } from './data';

const nodes = [
	{
		id: "1",
		job_name: "First Job",
		app_name: "Facebook",
		category: "Don't Know",
		command: "command -to -run -job",
		file_location: "File Location",
		info: `This is one hell of a job.
		And this is some long and random description of it.
		No point in reading further.
		But I bet you will.`,
		splunk: "some random query",
		job_url: "https://wwww.facebook.com",
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
		job_before: "Third Job",
		job_after: "Second Job",
		sla: "09:34 PM",
		server: "CDMA",
		log_path: "/this/is/some/job1.log",
		script_path: "/this/is/some/job1.sh"
	},
	{
		id: "2",
		job_name: "Second Job",
		app_name: "Google",
		category: "Don't Know",
		command: "command -to -run -job",
		file_location: "File Location",
		info: `This is another one hell of a job.
		And this is some long and random description of it.
		No point in reading further.
		But I bet you will.`,
		splunk: "some random query",
		job_url: "https://wwww.google.com",
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
		job_before: "First Job",
		job_after: "Third Job",
		sla: "05:34 AM",
		server: "BAQS",
		log_path: "/this/is/some/job2.log",
		script_path: "/this/is/some/job2.sh"
	},
	{
		id: "3",
		job_name: "Third Job",
		app_name: "Microsoft",
		category: "Don't Know",
		command: "command -to -run -job",
		file_location: "File Location",
		info: `Do I need to say anything??`,
		splunk: "some random query",
		job_url: "https://wwww.microsoft.com",
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
		job_before: "Second Job",
		job_after: "First Job",
		sla: "12:34 PM",
		server: "BAQS",
		log_path: "/this/is/some/job3.log",
		script_path: "/this/is/some/job3.sh"
	},
];



const JobDetails = (props) => {
	const [modalData, setModalData] = useState(<></>);
	const [modalButton, setModalButton] = useState(<></>);
	const [search, setSearch] = useState('');
	const [eta, setETA] = useState('');
	const [show, setShow] = useState(false);
	const [jobsData, setJobsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	
	const handleSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

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

	function fetchJobs() {
        fetch('/api/healthcheck/jobs', {
          method: 'GET',
          mode: 'no-cors'
        })
        .then((response) => response.json())
        .then((jobs) => {
			setJobsData(jobs);
            setIsLoading(false) 
        })
        .catch((err) => {
            console.log(err.message);
        });       
    }
    
    useEffect(() => {
        fetchJobs();
    }, []); 

	const data = jobsData.filter((item) => item.job_name.toLowerCase().startsWith(search.toLowerCase()));

	const saveJobDetails = (e, jobId="new", delJob=false) => {
		e.preventDefault();
		console.log(jobId);
		const saveJobData = {};
		let method = "POST";
		let url = '/api/healthcheck/jobs';
		
		console.log(saveJobData);
		if(delJob) {
			method = "DELETE";
			saveJobData["id"] = jobId;
			url += "/" + jobId;
		}
		else {
			if(jobId !== "new") {
				method = "PUT";
				saveJobData["id"] = jobId;
				url += "/" + jobId;
			}
			Object.keys(jobsData[0]).map(field => {
				if(!["id"].includes(field)) {
					saveJobData[field] = e.target[field].value;
				}
			});	
		}
		
		fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(saveJobData)
		})
		.then((response) => {
			if(!response.ok) {
				throw Error("Error in updating!!")
			}
			return response.text();
		})
		.then((text) => {
			fetchJobs();
			setShow(false);
			setIsLoading(false);
		})
		.catch((err) => {
			alert(err.message);
		});
	};

	const handleDelete = (e, jobId) => {
		setIsLoading(true);
		saveJobDetails(e, jobId, true);
	};

	const handleNew = () => {
		const editData = <form onSubmit={(e) => saveJobDetails(e)}>
			<table className='modal-table'>
				<tr><th>Job Name:</th><td><input type="text" name="job_name" /></td></tr>
				<tr><th>Predecessor Job Name:</th><td><input type="text" name="job_before" /></td></tr>
				<tr><th>Successor Job Name:</th><td><input type="text" name="job_after" /></td></tr>
				<tr><th>SLA:</th><td><input type="text" name="sla" /></td></tr>
				<tr><th>Server:</th><td><input type="text" name="server" /></td></tr>
				<tr><th>Log Path:</th><td><input type="text" name="log_path" /></td></tr>
				<tr><th>Script Path:</th><td><input type="text" name="script_path" /></td></tr>
				<tr><th>Application Name:</th><td><input type="text" name="app_name" /></td></tr>
				<tr><th>Category:</th><td><input type="text" name="category" /></td></tr>
				<tr><th>Command:</th><td><input type="text" name="command" /></td></tr>
				<tr><th>File Location:</th><td><input type="text" name="file_location" /></td></tr>
				<tr><th>Information:</th><td><textarea name="info" /></td></tr>
				<tr><th>Splunk Query:</th><td><input type="text" name="splunk" /></td></tr>
				<tr><th>Job URL:</th><td><input type="text" name="job_url" /></td></tr>
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
		const jobDetails = jobsData.filter(node => node.id === jobId)[0]
		const editData = <form onSubmit={(e) => saveJobDetails(e, jobId)}>
			<table className='modal-table'>
				<tr><th>Job Name:</th><td><input type="text" name="job_name" defaultValue={jobDetails.job_name} /></td></tr>
				<tr><th>Predecessor Job Name:</th><td><input type="text" name="job_before" defaultValue={jobDetails.job_before} /></td></tr>
				<tr><th>Successor Job Name:</th><td><input type="text" name="job_after" defaultValue={jobDetails.job_after} /></td></tr>
				{/* <tr><th>SLA:</th><td><div>
                      <TimePicker 
					  		onChange={(value) => onChangeTimer(jobDetails.jobId, value)} 
							disableClock={true} 
							clearIcon={null} 
							format={"hh:mm a"}
							value={jobDetails.sla}
						/>
                    </div></td></tr> */}
				<tr><th>SLA:</th><td><input type="text" name="sla" defaultValue={jobDetails.sla} /></td></tr>
				<tr><th>Server:</th><td><input type="text" name="server" defaultValue={jobDetails.server} /></td></tr>
				<tr><th>Log Path:</th><td><input type="text" name="log_path" defaultValue={jobDetails.log_path} /></td></tr>
				<tr><th>Script Path:</th><td><input type="text" name="script_path" defaultValue={jobDetails.script_path} /></td></tr>
				<tr><th>Application Name:</th><td><input type="text" name="app_name" defaultValue={jobDetails.app_name} /></td></tr>
				<tr><th>Category:</th><td><input type="text" name="category" defaultValue={jobDetails.category} /></td></tr>
				<tr><th>Command:</th><td><input type="text" name="command" defaultValue={jobDetails.command} /></td></tr>
				<tr><th>File Location:</th><td><input type="text" name="file_location" defaultValue={jobDetails.file_location} /></td></tr>
				<tr><th>Information:</th><td><textarea name="info" defaultValue={jobDetails.info} /></td></tr>
				<tr><th>Splunk Query:</th><td><input type="text" name="splunk" defaultValue={jobDetails.splunk} /></td></tr>
				<tr><th>Job URL:</th><td><input type="text" name="job_url" defaultValue={jobDetails.job_url} /></td></tr>
			</table>
			<input type="submit" value="Save Job Details" className="refresh_now" style={{ float: "right", width: "150px" }} />
		</form>
		setModalData(editData);
		setModalButton(<button onClick={() => setShow(false)} className="refresh_now" style={{ float: "right", width: "100px" }}>
			{"Close"}
		</button>);
		setShow(true);
	};

	const showJobDetails = (jobId) => {
		const jobDetails = jobsData.filter(node => node.id === jobId)[0];
		const jobDesc = <table className='modal-table'><tbody>
			<tr><th>App:</th><td>{jobDetails.app_name}</td></tr>
			<tr><th>Category:</th><td>{jobDetails.category}</td></tr>
			<tr><th>Script:</th><td>{jobDetails.script_path}</td></tr>
			<tr><th>Command:</th><td>{jobDetails.command}</td></tr>
			<tr><th>File Location:</th><td>{jobDetails.file_location}</td></tr>
			<tr><th>Log Path:</th><td>{jobDetails.log_path}</td></tr>
			<tr><th>Information:</th><td>{jobDetails.info}</td></tr>
			<tr><th>Splunk Query:</th><td>{jobDetails.splunk}</td></tr>
			<tr><th>Job Details Link:</th><td><a href={jobDetails.jobLink} target="_blank">{jobDetails.job_name}</a></td></tr>
		</tbody></table>

		setModalButton(<button onClick={() => setShow(false)} className="refresh_now" style={{ float: "right", width: "100px" }}>
			{"Close"}
		</button>);
		setModalData(jobDesc);
		setShow(true);
	}

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
					<div style={{ overflow: "hidden", width: "11%" }}>
						<button onClick={() => handleNew()}
							className="refresh_now"
							style={{ float: "right", width: "100px" }}>
							Add new Job
						</button>
					</div>
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
							<th style={{ width: "10px" }}>Edit</th>
						</tr>
					</thead>
					<tbody>
						{data.length === 0 
						? <tr><td colSpan={8}><LoadingIndicatorBars /></td></tr>
						: data.map((node) => (
							<tr key={node.id}>
								<td style={{ width: "10%" }}><a href="javascript:;" onClick={(e) => showJobDetails(node.id)}>{node.job_name}</a></td>
								<td style={{ width: "10%", textAlign: "center" }}>{node.job_before}</td>
								<td style={{ width: "10%" }}>{node.job_after}</td>
								{/* <td><HCTimePicker dataId={node.id} ref={timeRef} onTimeChange={(newTime) => console.log(newTime)}/></td> */}
								<td>{node.sla}</td>
								<td>{node.server}</td>
								<td style={{ width: "20%" }}>{node.log_path}</td>
								<td style={{ width: "20%" }}>{node.script_path}</td>
								<th style={{ width: "10%" }}>
									<div style={{ overflow: "hidden", display: "inline-flex" }}>
										<button onClick={() => handleEdit(node.id)}
											className="refresh_now"
											style={{ width: "50px", float: "left", marginLeft: "0px" }}>
											Edit
										</button>
										<button onClick={(e) => handleDelete(e, node.id)}
											className="refresh_now"
											style={{ width: "50px", float: "left", marginLeft: "0px", marginRight: "0px" }}
											disabled={isLoading}>
											Delete
										</button>
									</div>
								</th>
							</tr>
						))}

					</tbody>
				</table>
				<br />

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