import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,SafeAreaView } from "react-native";
import DatePicker from "react-native-date-picker";
import tw from 'twrnc'

const EndTime = ({setEndModalVisible,endmodalVisible,endtime,setEndtime}) => {
    return (
        <DatePicker 
        modal
        mode="time"
        date={endtime}
        open={endmodalVisible}
        onConfirm={(tim) => {
            setEndtime(tim)
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