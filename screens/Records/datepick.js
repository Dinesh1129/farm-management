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
                dat.setHours(0,0,0)
                setDate(dat)
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