import * as React from 'react';
import TimePicker from "react-time-picker";


const HCTimePicker = React.forwardRef((props, ref) => {
    const id = props.dataId;
    // const [eta, setETA] = React.useState({});
    // React.useImperativeHandle(ref, () => ({getMyState: () => {return eta}}), [eta]);

    const onChangeTimer = (data) => {
		// console.log(data);
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
		const tempEta = {};
		tempEta[id] = finalTime;
        // console.log(tempEta);
		props.onTimeChange(tempEta);
	}

    return (<div>
    <TimePicker onChange={(value) => onChangeTimer(value)} disableClock={true} clearIcon={null} format={"hh:mm a"}/>
  </div>)
});

export default HCTimePicker;