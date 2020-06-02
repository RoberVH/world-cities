import { User, AuthorizationProvider } from '../config/types';


const USERNAME_KEY= 'username';
const LOGGED_KEY= 'logged'
const AUTHPROV_KEY= 'authProv'

export const getSessionUser: ()=> User | undefined =  () => {
        
      let logged:boolean;  
      let authprov;  
      const username= localStorage.getItem(USERNAME_KEY);
      if (username !== null) {
          let  loggedRetrieved= localStorage.getItem(LOGGED_KEY);
        if (loggedRetrieved !== null)  {
            logged= loggedRetrieved.toLowerCase() === 'true';
            authprov=  localStorage.getItem(AUTHPROV_KEY);
            if (authprov !== null) { 
                let convertedAuth=  AuthorizationProvider[(authprov as keyof typeof AuthorizationProvider)];
                 const user=  {
                    username:username,
                    logged:logged,
                   // authProv:authprov! as unknown as AuthorizationProvider
                   authProv: convertedAuth
                  }
                  return user;
            } 
          return undefined;
          } else return undefined;
      } else return undefined
     }

export const setSessionUser: (user:User) => void =  (user) => {
  localStorage.setItem(USERNAME_KEY, user.username);
  localStorage.setItem(LOGGED_KEY, String(user.logged));
  localStorage.setItem(AUTHPROV_KEY, String(user.authProv));
  
}

export const removeSessionUser: ()=> void = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(LOGGED_KEY);
  localStorage.removeItem(AUTHPROV_KEY);
}