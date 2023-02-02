import React from 'react';
import { Modal, Text, Pressable, View,ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-paper'
import tw from 'twrnc'

const FileNameModal = ({modalVisible,setModalVisible,setFilename,fileName,onSave}) => {
    const onSubmit = () => {
        if(fileName.trim()==''){
            ToastAndroid.show('Please enter filename to save')
            return
        }
        onSave()
    }
  return (
    <View style={tw `flex flex-row justify-center items-center`}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={tw `absolute top-50 h-[130px] w-9/12 p-3 w-max bg-white self-center rounded-lg`}>
          <View style={tw `h-max w-full flex flex-col justify-between`}>
            <TextInput
                mode='outlined' 
                label={'FileName'}
                placeholder={'Filename'}
                keyboardType={'default'}
                value={fileName}
                onChangeText={setFilename}
            />
            <Pressable
              style={tw `h-max w-max my-2 p-2 bg-[#5203fc] text-sm font-normal text-capitalize`}
              onPress={() => onSubmit()}>
              <Text style={tw `text-md text-white text-center`}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default FileNameModal;