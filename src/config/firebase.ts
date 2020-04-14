/**
 *  firebase.ts.- Configuration file for Firebase Authenticatuin and DB cloud services
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPfXx-6cp9qVIQT1o-r1QlYPRLZjVywEI",
    authDomain: "react-visiting-cities.firebaseapp.com",
    databaseURL: "https://react-visiting-cities.firebaseio.com",
    projectId: "react-visiting-cities",
    storageBucket: "react-visiting-cities.appspot.com",
    messagingSenderId: "985009873707",
    appId: "1:985009873707:web:c8933a33c6e7052eb35b6e"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
auth.languageCode='sp'                              //Aqui cambiar el lenguaje!!!!!

export const provider = new firebase.auth.GoogleAuthProvider();

console.log('Provider',provider);

export const signInWithGoogle:() => Promise<string | null> = async () => {
    try {
        const signInResult= await auth.signInWithPopup(provider); 
        return signInResult.user!.displayName;
    } catch (error) {
        console.log('Error en Signin:',error);
        return null
    }
  };

export const checkAuth= () => auth.onAuthStateChanged(userAuth => {
    if (userAuth) {
        console.log('Usuario:',userAuth);
        console.log('Usuario.DisplayName:',auth.currentUser?.displayName)
        return true

    } else {
        console.log('Debe registrarse para acceder');
        return false
    }
})
export const SignOutUser = () => {
    if (checkAuth()) auth.signOut()
}

// // Creates the provider object.
// var providerj = new firebase.auth.FacebookAuthProvider();
// // You can add additional scopes to the provider:
// provider.addScope('email');
// provider.addScope('user_friends');
// // Sign in with popup:
// auth.signInWithPopup(provider).then(function(result) {
//   // The firebase.User instance:
//   var user = result.user;
//   // The Facebook firebase.auth.AuthCredential containing the Facebook
//   // access token:
//   var credential = result.credential;
// }, function(error) {
//   // The provider's account email, can be used in case of
//   // auth/account-exists-with-different-credential to fetch the providers
//   // linked to the email:
//   var email = error.email;
//   // The provider's credential:
//   var credential = error.credential;
//   // In case of auth/account-exists-with-different-credential error,
//   // you can fetch the providers using this:
//   if (error.code === 'auth/account-exists-with-different-credential') {
//     auth.fetchSignInMethodsForEmail(email).then(function(providers) {
//       // The returned 'providers' is a list of the available providers
//       // linked to the email address. Please refer to the guide for a more
//       // complete explanation on how to recover from this error.
//     });
//   }