import firebase,{RemoteMessage} from 'react-native-firebase';
import {ToastAndroid} from "react-native";
import Functions from "./Functions.js";

var token;
firebase.messaging().getToken().then(fcmToken => {
	console.log("getToken() ",fcmToken)
});

firebase.messaging().onMessage((message: RemoteMessage) => {
    console.log("messagex",message);
});	


export default async (result) => {
    // firebase.notifications().onNotification((notification: Notification) => {
    //     // Process your notification as required
    //     console.log("Notif background",notification);
    // });
    firebase.messaging().onMessage((message: RemoteMessage) => {
		result=message;console.log("RemoteMessage",message);
	})
	
}