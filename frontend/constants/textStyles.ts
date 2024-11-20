import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Colors } from "./Colors";
import {Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat';

export const useTextStyles = () => {
    // Bother with fonts later

    // const [fontsLoaded] = useFonts({
    //     Montserrat_Regular: Montserrat_400Regular, 
    //     Montserrat_SemiBold: Montserrat_600SemiBold, 
    //     Monserrate_Bold: Montserrat_700Bold, 
    // });

    return StyleSheet.create({
        view : {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#fff',
            padding: '10%', 
        }, 
        title: {
            fontSize: 30,
            fontWeight: 'bold', 
            color: Colors.light.text, 
            marginBottom: '10%', 
        }, 
        header: {
            fontSize: 18, 
            fontWeight: 'bold', 
            color: Colors.light.text, 
            marginBottom: '1%', 
            alignSelf: 'flex-start',
        }, 
        video: {
            width: '100%', 
            height: 200, 
        }, 
        rect: {
            borderColor: Colors.light.background, 
            borderWidth: 1.5, 
            width: '90%', 
            paddingHorizontal: '7%', 
            paddingVertical: '7%', 
            marginVertical: '5%', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
        }, 
        optionText: {
            fontSize: 16, 
            fontWeight: 'semibold', 
            color: Colors.light.text,
        }, 
        settings_icon: {
            color: Colors.light.text,
            marginTop: -4,
            marginRight: '3%', 
            fontSize: 25, 
        },
        body: {
            color: Colors.light.text,
            fontSize: 15,
        }, 
        toggle: {
            color: Colors.light.text, 
            transform: [{ scale: 0.65}],
            marginVertical: '-2%',
            marginRight: '-2%', 
        }, 
        warning: {
            paddingHorizontal: '5%',
            color: Colors.light.text,
            fontSize: 15, 
            fontWeight: 'bold',
        }, 
        unread: {
            paddingHorizontal: '3%', 
            fontSize: 20,
        }, 
        filtericon: {
            fontSize: 38,
            paddingLeft: '10%',
            color: Colors.light.text,
        }
    })
}