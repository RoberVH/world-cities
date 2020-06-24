/**
 *        LoginHolder component. Allows user to log in through third party App: Google, Facebook, Twitter or Github
 *        Uses Firebase service.
 *        No user data is store apart from email as Firebase service is used to log in, and that service stores them
 *        No facebook, twitter, Github or google user profile other data is requested now stored
 *        Once the session is established, is maintained via browser session store mechanism and is preserved through 
 *        reopenings and refresehs until user logs out
 */
import React from 'react';
import {User, AuthorizationProvider} from '../config/types';
import NavDropdown from "react-bootstrap/NavDropdown";
import {signInWithProv, SignOutUser} from '../config/firebase';
import googleplusloginround from '../data/imgs/google-plusloginround.png';
import facebookloginround from '../data/imgs/facebookloginround.png';
import twitterloginround from '../data/imgs/twitterloginround.png';
import githubloginround from '../data/imgs/githubloginround.png';
import { setSessionUser, removeSessionUser } from '../utils/useMaintainSession';
import exitIcon from '../data/imgs/exit.png'


/*
 *    Constants definitions for all methods of LoginHolder component 
 */
const WIDTH_RESIZE="20";
const HIGH_RESIZE="20";

const  ProvAuthzIcons = new Map()  // to dinamically display autz provider icon in this module
ProvAuthzIcons.set(AuthorizationProvider.Google,googleplusloginround);
ProvAuthzIcons.set(AuthorizationProvider.Facebook,facebookloginround);
ProvAuthzIcons.set(AuthorizationProvider.Twitter,twitterloginround);
ProvAuthzIcons.set(AuthorizationProvider.Github,githubloginround);

const loginProviderMethod = [
  {title:'Google Login', alt:'Google Login', authzProv:AuthorizationProvider.Google,authzIcon: googleplusloginround, key:'googleKey'},
  {title:'Facebook Login', alt:'Facebook Login', authzProv:AuthorizationProvider.Facebook,authzIcon: facebookloginround,key:'facebookKey'},
  {title:'Twitter Login', alt:'Twitter Login', authzProv:AuthorizationProvider.Twitter,authzIcon: twitterloginround,key:'twitterKey'},
  {title:'Github Login', alt:'Github Login', authzProv:AuthorizationProvider.Github,authzIcon: githubloginround,key:'githubKey'}
]

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
 * LoginButtons. Component that presents Authz providers options, receives a user state object along with its set method
 *              It calls the choose login, updates user state variable to the username retrieved, and saves it to
 *              browser session
 *****************************************************************************************************************/

  const LoginButtons:(setUser:(user:User) => void)=>JSX.Element = (setUser) => {
    const iconLoginStyle= {marginRight:"5px", cursor:'pointer'}

  return (
    <span >
     <label style={{marginRight:'8px'}}>Sign In </label>
       {loginProviderMethod.map((item) => {
         return (
            <img style={iconLoginStyle} key={item.key} title={item.title} src={item.authzIcon} alt={item.title}
            width={WIDTH_RESIZE} height={HIGH_RESIZE} 
            onClick={(event:React.MouseEvent<HTMLElement>) => {handleClickLogin(item.authzProv, setUser)}}/>
          )
        })
        }

   </span>
  )
}

/****************************************************************************************************************
 * LoginHolder. Component that presents either the logged user or functionality links to log in
 * 
 *****************************************************************************************************************/

const LoginHolder:React.FC<{user:User | undefined, setUser:React.Dispatch<React.SetStateAction<User | undefined>>,
      labelColor:string}> = ({user, setUser, labelColor}) => { 
  const loginHolderborder= {color: labelColor, display:"inline-block", 
         border:`1px solid ${labelColor}`, borderRadius: "15px", padding:"5px 2px 1px 5px"};
 
  return (  
          <div style={loginHolderborder}>
              {user && user.logged ? 
                <span >
                  <NavDropdown  id="nav-dropdown" 
                    title= {
                      <span style={{color: labelColor}}>
                          <img style={{marginRight: '3px'}} src={ProvAuthzIcons.get(user.authProv)} alt='Authorization Proxy' title='Authorization Proxy' 
                        width={WIDTH_RESIZE} height={HIGH_RESIZE} /> 
                        <span > {user.username} </span>
                      </span> 
                        }>
                      <NavDropdown.Item className="navdropdown">
                       <span>
                        <button style= {{ background:'none',border:'none',margin: '1px', padding: 0,cursor:'pointer'}}
                                onClick={()=>signOut(setUser)}>
                          <img src= {exitIcon} alt='SignOut' height='19x' width='19px'></img> LogOut
                        </button>
                      </span> 
                      </NavDropdown.Item>
                    </NavDropdown>
                </span>:
                <span>{LoginButtons(setUser)}</span>}
          </div>
 )
}
export default LoginHolder;
