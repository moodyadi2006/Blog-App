import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() { //We have created a constructor so that whenever a user comes a new client and new account setup automatically 
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name) //This will create the user Account
      if (userAccount) {
        //Call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error)
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error)
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error)
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions(); //It will logout from all the devices
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error)
    }
  }
}


//If anyone uses this class then they have to first make an object then can use its function
//To reduce their work I have created a object here with this class now anyone can directly use class methods

const authService = new AuthService();//Object is created

export default authService;