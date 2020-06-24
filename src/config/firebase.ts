/**
 *  firebase.ts.- Configuration file for Firebase Authentication and DB cloud services
 *                 In this App, it's used to authenticate user through third-party service,
 *                 Social Media authorization methods are Google, Facebook, Twitter and Github
 *                 Other services are available, some of them can be added to this App. Go to Firebase
 *                 to configure them as long as they are available, then add it to signInWithProv
 *                  method in this file,  and then in LoginHolder component add
 *                 an entry to authorization providers array
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthorizationProvider } from "./types";

//const SERVICE_NAME_FIELD = 'apiname';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_API_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
auth.languageCode='sp'                              //Aqui cambiar el lenguaje!!!!!



export let provider: firebase.auth.AuthProvider;
const bdFireBase= firebase.firestore();
const apiDBCollection = bdFireBase.collection('apikeys');

/**
 * getAPIKEY- Get an API Key for service (ServiceName) from Firebase Cloud Firestore DB 
 */
export const getAPIKEY:(serviceName:string) => any = async(serviceName) => {
    try {
        
        //console.log('serviceName',serviceName)
        const apiResults = await apiDBCollection.doc(serviceName).get();
        //const apiResults= await apikeysRef.get(); 
        if (apiResults && apiResults.exists) {
          /*  const obj = apiResults.data()
           console.log('!',serviceName,' regreso',obj!.key,obj!.url);*/
            return apiResults.data();
          } else { 
            console.log('NO se pudo recuperar api key')
            return null
        }
    } catch (error) {
        console.log ('Error obteniendo API key:', error);
        return null
    }
}

/**
 *  signInWithProv - Create authz object, to manage third-party authz process
 * 
 */
export const signInWithProv:(selectedProvider:AuthorizationProvider) => Promise<string | null> = async (selectedProvider:AuthorizationProvider) => {
    try {
        switch (selectedProvider) {
            case AuthorizationProvider.Google:
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case AuthorizationProvider.Facebook:
                provider = new firebase.auth.FacebookAuthProvider();
                break;  
            case AuthorizationProvider.Twitter:
                provider = new firebase.auth.TwitterAuthProvider();
                break;
            case AuthorizationProvider.Github:
                provider = new firebase.auth.GithubAuthProvider();
                break;
    
        }
        const signInResult= await auth.signInWithPopup(provider);
        return signInResult.user!.displayName;
    } catch (error) {
        alert(`Error en Signin: ${error.message}`);
        return null
    }
  };

    export const listenerAuthState =  auth.onAuthStateChanged(userAuth => {
    if (userAuth) {
        return true

    } else {
        console.log('Debe registrarse para acceder');
        return false
    }
})


export const SignOutUser = () :  void => {
    try {
   //if (checkAuth()) {
    if (auth.currentUser) {
            auth.signOut()   
        }
    } catch (error) {
        console.log('SignOut Error', error)
        return 
    }
}

