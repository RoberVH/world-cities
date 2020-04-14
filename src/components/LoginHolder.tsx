import React from 'react';
//import {User, userSettter} from '../config/types';
import {User} from '../config/types';
import {signInWithGoogle, SignOutUser} from '../config/firebase';
import googleplusloginround from '../data/imgs/google-plusloginround.png';
import facebookloginround from '../data/imgs/facebookloginround.png';
import twitterloginround from '../data/imgs/twitterloginround.png';
import githubloginround from '../data/imgs/githubloginround.png';



  //const LoginButtons:React.FC<{setUser:React.Dispatch<React.SetStateAction<User | undefined>>}> = (setUser) => {
    //const LoginButtons:(setUser:React.Dispatch<React.SetStateAction<User | undefined>>)=>void = (setUser) => {
      const LoginButtons:(setUser:React.Dispatch<React.SetStateAction<User | undefined>>)=>JSX.Element = (setUser) => {
      
//  const LoginButtons:React.FC<React.Dispatch<React.SetStateAction<User | undefined>>>  = (setUser) => {
  const WidthResize="20";
  const HightResize="20";

  return (
    <span>
      <label>SignIn &nbsp;</label>
      <img style={{marginRight:"5px"}} id='en' title={'Google Login'} src={googleplusloginround} alt='Google Login'
           width={WidthResize} height={HightResize} 
           onClick={async (event:React.MouseEvent<HTMLElement>) => {
             const userLogged= await signInWithGoogle()
              if (userLogged) setUser({username:userLogged, logged:true})
              }
            }

      />
      <img style={{marginRight:"5px"}} id='en' title={'Facebook Login'} src={facebookloginround} alt='Facebook Login' 
      width={WidthResize} height={HightResize} onClick={(event:React.MouseEvent<HTMLElement>) => setUser({username:'Roberto', logged:true})}/>
      <img style={{marginRight:"5px"}} id='en' title={'Twitter Login'} src={twitterloginround} alt='Twitter Login' 
      width={WidthResize} height={HightResize} onClick={(event:React.MouseEvent<HTMLElement>) => console.log('Twitter Login')}/>
      <img style={{marginRight:"5px"}} id='en' title={'Github Login'} src={githubloginround} alt='Github Login' 
      width={WidthResize} height={HightResize} onClick={(event:React.MouseEvent<HTMLElement>) => console.log('Github Login')}/>
      </span>
  )
}

/****************************************************************************************************************
 * LoginHolder. Component that presents either the logged user or functionality links to log in
 * 
 *****************************************************************************************************************/


const LoginHolder:React.FC<{user:User | undefined, setUser:React.Dispatch<React.SetStateAction<User | undefined>>}> = ({user, setUser}) =>{
  
return (
 <div style={{width:"50%", display:"inline-block"}}>   
    {user && user.logged ? 
       <div><p>User logged: {user.username}</p>
        <button onClick={SignOutUser}>SignOut</button>
      </div>:
      <div>{LoginButtons(setUser)}</div>}
 </div>
 )
}
export default LoginHolder;
