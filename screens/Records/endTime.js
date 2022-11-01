import React from "react";
import DatePicker from "react-native-date-picker";

const EndTime = ({setEndModalVisible,endmodalVisible,setEndtime}) => {
    return (
        <DatePicker 
        modal
        mode="time"
        date={new Date()}
        open={endmodalVisible}
        onConfirm={(tim) => {
            setEndtime(tim)
            
            
            setEndModalVisible(false)
        }}
        onCancel={() => {
            setEndModalVisible(false)
        }}
        onPointerLeave={() => {
            setEndModalVisible(false)
        }}
        />
    )
}

export default EndTime