import styles from './datePicker.module.css'
import {useRef} from "react";
const DatePicker = ({onDateChange}) => {
	let timeRef = useRef()
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;
	const onDateChangeHandler = () => {
		console.log(timeRef.current.value)
		onDateChange(timeRef.current.value)
	}
  return (
	  <div className={styles.container}>
		  <input type="datetime-local" id="startDate" disabled={true} value={today}/>
		  <input type="datetime-local" id="endDate" ref={timeRef} onChange={onDateChangeHandler} min={today}/>
	  </div>
  )
}
export default DatePicker