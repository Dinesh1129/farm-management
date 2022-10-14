import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,SafeAreaView } from "react-native";
import DatePicker from "react-native-date-picker";
import tw from 'twrnc'

const DatePick = ({modalVisible,setModalVisible,date,setDate}) => {

  return (
    
   
        
        
            <DatePicker 
            modal
            mode="date"
            date={new Date()}
            open={modalVisible}
            onConfirm={(dat) => {
                setDate(dat)
                console.log(dat.toLocaleString())
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