import { createContext, ReactNode, useEffect, useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserSession, CognitoUserAttribute, ISignUpResult } from "amazon-cognito-identity-js"

import UserPool from "../services/UserPool"

interface AuthContextData{
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  signInWithEmailPassword: (email:string, password:string) => Promise<object>
  createUserWithEmailAndPassword: (email:string, password:string) => Promise<object>
  handleChangePassword: (password:string, newPassword:string) => Promise<void>
  getUserSession: () => Promise<SessionPromise>
  user: User | undefined
}

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  id: string,
  name?: string | null,
  email: string | null,
  email_verified: boolean,
  avatar?: string | null,
  provider?: string | undefined
}

interface SessionPromise {
  cognitoUser:CognitoUser
  attributes: UserAttributes
  session:CognitoUserSession 
}

type UserAttributes = {
  email: string | null,
  email_verified: boolean,
  sub:string
}


export const authContext = createContext({} as AuthContextData)

export const AuthProvider = ({children} : AuthProviderProps) => {
  const [user, setUser]= useState<User>()
  // const history = useHistory()

  const signInWithGoogle = async () => {
        //[auth_signIn_google]
  }

  const getUserSessionAttributes = async (cognitoUser:CognitoUser) => {
    return await new Promise<UserAttributes>((resolve, reject) => {
      if(cognitoUser){
        cognitoUser.getUserAttributes((err, attributes) => {
          if(err) {
            reject(err)

          }else if(!attributes){
            reject("no attributes")    

          }else{
            const parsedAttributes = {} as any
            for (let attribute of attributes){
              const {Name, Value} = attribute;
              parsedAttributes[Name] = Value
            }

            resolve(parsedAttributes)
          }
        })
      }
    })
  }
  
  const getUserSession = async () => {    
    return await new Promise<SessionPromise>((resolve, reject) => { 
      const cognitoUser = UserPool.getCurrentUser()
      if(cognitoUser){
        console.log("user: ",cognitoUser)
        cognitoUser.getSession(async (err: Error | null, session:CognitoUserSession | null) => {
          if(err){
            reject(err)
          }else if(session){
            const attributes = await getUserSessionAttributes(cognitoUser)

            resolve({cognitoUser, attributes, session })
          }
        })

      }else{
        reject()
      }
    })
  }

  const signInWithEmailPassword = async (email:string, password:string) => {
    return await new Promise<CognitoUserSession>((resolve, reject) => { 
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool,
      })
  
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      })
  
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data)
          resolve(data)
        },
        onFailure: (err) => {
          reject(err)
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data)
          resolve(data)
        }
      })
    })
    
  }

  const createUserWithEmailAndPassword = async (email:string, password:string) => {
    return await new Promise<ISignUpResult>((resolve, reject) => {
      UserPool.signUp(email, password, [], [], (err, data)=> {
        if(err) {
          console.error(err)
          reject(err)
        }
        if(data) {
          console.log(data)
          resolve(data)
        }
      })
    })
  }

  const handleChangePassword = async (password:string, newPassword:string) => {
    const {cognitoUser} = await getUserSession()
    cognitoUser.changePassword(password, newPassword, (err, result) => {
      if(err) {
        console.error(err)
      }else{
        console.log(result)
      }
    })
  }

  const signOut = async () => {
     const cognitoUser = UserPool.getCurrentUser()
     if(cognitoUser){
       cognitoUser.signOut()
     }
  }

  useEffect(() => {
    (async () => {
      try {
        const {attributes} = await getUserSession()
        console.log(attributes)     //«««««LOG
        setUser({id: attributes.sub, email: attributes.email, email_verified: attributes.email_verified})
        
      } catch (err) {
        console.error("User not signed in", err)
      }
    })()

  },[])
    
    return (
      <authContext.Provider value={{signInWithGoogle, signOut, signInWithEmailPassword, createUserWithEmailAndPassword, handleChangePassword, user, getUserSession }}>
        {children}
      </authContext.Provider>
    )
}