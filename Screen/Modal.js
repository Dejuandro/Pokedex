import React, { useContext,useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Modal, ScrollView, StatusBar,Platform } from 'react-native';
import { TextInput, RadioButton, Checkbox } from 'react-native-paper';


const ModaFullCustom = (props) => {
    const toastRef = useRef();

    const { isVisible, title, subtitle, body, closeModal,submittitle, submitfunction, EnableSubmit,bgColor } = props

    return (
        // <View
        //     style={styles.container}>
       <SafeAreaView>
         <StatusBar
        animated={true}
        backgroundColor={bgColor} barStyle="light-content" />
         <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{backgroundColor:bgColor, marginTop:Platform.OS=="ios"?50:0}]}>
                    <View style={styles.modalTitleContainer}>
                        <Text style={styles.modalHead}>{title}</Text>
                        <TouchableOpacity onPress={() => { closeModal() }}>
                            <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.modalSubHead}>{subtitle}</Text> */}
                    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyModal}>
                        {body}
                    </View>
                    </ScrollView>
                   {EnableSubmit?
                    <TouchableOpacity onPress={()=>{submitfunction()}} style={styles.SubmitButton}>
                    <Text style={styles.submitTitle}>{submittitle}</Text>
                </TouchableOpacity>:null}
                </View>
            </View>
        </Modal>
       </SafeAreaView>
        // </View>
    )
}
export default ModaFullCustom;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.5)"
        //   marginTop: 22
    },
    modalView: {
        backgroundColor: "#fff",
        // borderRadius: 10,
        width: '100%',
        height:'100%',
        // alignItems: "center",
        justifyContent:'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding:20,
    },
    modalHead: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
    modalSubHead: {
        fontSize: 14,
    },
    bodyModal: {
        // padding: 20,
        width: '100%',
        // alignSelf:'center',
        // alignItems:'center',
        // elevation:2
    },
    SubmitButton:{
        borderColor:'green',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        alignSelf:'center',
        minWidth:100,
        alignItems:'center',
        marginBottom:20,
        width:'90%'
    },
    submitTitle:{
        color:"green",
        fontWeight:'bold',
        fontSize:15
    }
})