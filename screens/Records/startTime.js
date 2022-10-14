import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,SafeAreaView } from "react-native";
import DatePicker from "react-native-date-picker";
import tw from 'twrnc'

const StartTime = ({setStartModalVisible,startmodalVisible,setStarttime,starttime,setSMins}) => {
  
    return (
        <DatePicker 
        modal
        mode="time"
        date={new Date()}
        open={startmodalVisible}
        onConfirm={(tim) => {
            setStarttime(tim)
            setSMins(tim)
            console.log(tim.toLocaleString())
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