import React from "react";
import DatePicker from "react-native-date-picker";


const StartTime = ({setStartModalVisible,startmodalVisible,setStarttime}) => {
  
    return (
        <DatePicker 
        modal
        mode="time"
        date={new Date()}
        open={startmodalVisible}
        onConfirm={(tim) => {
            setStarttime(tim)
            setStartModalVisible(false)
        }}
        onCancel={() => {
            setStartModalVisible(false)
        }}
        onPointerLeave={() => {
            setStartModalVisible(false)
        }}
        />
);
  
}

export default StartTime