import React from 'react';
import {User, AuthorizationProvider} from '../config/types';

import {signInWithProv, SignOutUser} from '../config/firebase';
import googleplusloginround from '../data/imgs/google-plusloginround.png';
import facebookloginround from '../data/imgs/facebookloginround.png';
import twitterloginround from '../data/imgs/twitterloginround.png';
import githubloginround from '../data/imgs/githubloginround.png';
import { setSessionUser, removeSessionUser } from '../utils/useMaintainSession';



const WIDTH_RESIZE="20";
const HIGH_RESIZE="20";

const  ProvAuthzIcons = new Map()  // to dinamically display autz provider icon in this module
ProvAuthzIcons.set(AuthorizationProvider.Google,googleplusloginround);
ProvAuthzIcons.set(AuthorizationProvider.Facebook,facebookloginround);
ProvAuthzIcons.set(AuthorizationProvider.Twitter,twitterloginround);
ProvAuthzIcons.set(AuthorizationProvider.Github,githubloginround);

/****************************************************************************************************************
* SignOut & clears out state user variable
/****************************************************************************************************************/

const signOut = (setUser:React.Dispatch<React.SetStateAction<User | undefined>>) => {
  SignOutUser()
  setUser(undefined)
  removeSessionUser();
}


/****************************************************************************************************
 * handleClickLogin .- Function to call signIn method and set user state & session variables
 *****************************************************************************************************/

const handleClickLogin: (authProv:AuthorizationProvider, setUser: (user:User) => void) => void = async (authProv,setUser) =>
{
    const userDisplayName= await signInWithProv(authProv)
    if (userDisplayName) {
    const userLogged:User = {username:userDisplayName, logged:true, authProv:authProv};
    setUser(userLogged);
    setSessionUser(userLogged)
  }
   }

/****************************************************************************************************************
 * LoginButtons. Component that presents Authz providers options, call the choose login and updates user state variable 
 *               to the username retrieve, the boolean logged var & authz provider  var
 *****************************************************************************************************************/

//const LoginButtons:(setUser:React.Dispatch<React.SetStateAction<User | undefined>>)=>JSX.Element = (setUser) => {
  const LoginButtons:(setUser:(user:User) => void)=>JSX.Element = (setUser) => {
  return (
    <span>
      <label>SignIn &nbsp;</label>
      <img style={{marginRight:"5px"}} id='googlelogin' title={'Google Login'} src={googleplusloginround} alt='Google Login'
           width={WIDTH_RESIZE} height={HIGH_RESIZE} 
           onClick={async (event:React.MouseEvent<HTMLElement>) => {
             const userDisplayName= await signInWithProv(AuthorizationProvider.Google)
              if (userDisplayName) {
                  const userLogged:User = {username:userDisplayName, logged:true, authProv:AuthorizationProvider.Google};
                  setUser(userLogged);
                  setSessionUser(userLogged)
                }
              }
            }
      />

      <img style={{marginRight:"5px"}} id='en' title={'Facebook Login'} src={facebookloginround} alt='Facebook Login' 
      width={WIDTH_RESIZE} height={HIGH_RESIZE} 
      onClick={(event:React.MouseEvent<HTMLElement>) => {handleClickLogin(AuthorizationProvider.Facebook, setUser)}}/>
      
      
      <img style={{marginRight:"5px"}} id='en' title={'Twitter Login'} src={twitterloginround} alt='Twitter Login' 
      width={WIDTH_RESIZE} height={HIGH_RESIZE} 
      onClick={(event:React.MouseEvent<HTMLElement>) => {handleClickLogin(AuthorizationProvider.Twitter, setUser)}}/>

      <img style={{marginRight:"5px"}} id='en' title={'Github Login'} src={githubloginround} alt='Github Login' 
      width={WIDTH_RESIZE} height={HIGH_RESIZE} 
      onClick={(event:React.MouseEvent<HTMLElement>) =>{handleClickLogin(AuthorizationProvider.Github, setUser)}}/>
   </span>
  )
}

/****************************************************************************************************************
 * LoginHolder. Component that presents either the logged user or functionality links to log in
 * 
 *****************************************************************************************************************/

const LoginHolder:React.FC<{user:User | undefined, setUser:React.Dispatch<React.SetStateAction<User | undefined>>}> = 
      ({user, setUser}) =>{
  return (
          <div style={{width:"50%", display:"inline-block"}}>   
              {user && user.logged ? 
                <div>
                    <p>User: {user.username} through: 
                    <img src={ProvAuthzIcons.get(user.authProv)} alt='Authorization Proxy' title='Authorization Proxy' 
                    width={WIDTH_RESIZE} height={HIGH_RESIZE} /> </p> 
                    <button onClick={() => signOut(setUser)}>SignOut</button>
                </div>:
                <div>{LoginButtons(setUser)}</div>}
          </div>
 )
}
export default LoginHolder;
