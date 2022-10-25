import React from "react";
import DatePicker from "react-native-date-picker";

const DatePick = ({modalVisible,setModalVisible,setDate}) => {

  return (
            <DatePicker 
            modal
            mode="date"
            date={new Date()}
            open={modalVisible}
            onConfirm={(dat) => {
                setDate(dat)
                console.log(dat)
                
                setModalVisible(false)
            }}
            onCancel={() => {
                setModalVisible(false)
            }}
            onPointerLeave={() => {
                setModalVisible(false)
            }}
            />
  );
};



export default DatePick;