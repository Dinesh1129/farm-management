import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,SafeAreaView } from "react-native";
import DatePicker from "react-native-date-picker";
import tw from 'twrnc'

const EndTime = ({setEndModalVisible,endmodalVisible,endtime,setEndtime,setEMins}) => {
    return (
        <DatePicker 
        modal
        mode="time"
        date={new Date()}
        open={endmodalVisible}
        onConfirm={(tim) => {
            setEndtime(tim)
            setEMins(tim)
            console.log(tim.toLocaleString())
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