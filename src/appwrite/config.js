import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client)
  }

  async createPost({ Title, Slug, Content, Featured_Image, Status, UserID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, Slug, {
        Title, Content, Featured_Image, Status, UserID
      }
      )
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error)
    }
  }

  async updatePost(Slug, { Title, Content, Featured_Image, Status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, Slug, {
        Title,
        Featured_Image,
        Content,
        Status
      }
      )

    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error)
    }
  }

  async deletePost(Slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, Slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error)
      return false;
    }
  }

  async getPost(Slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, Slug
      )
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error)
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal('Status', 'Active')]) { //Check for it
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, queries
      )
    } catch (error) {
      console.log("Appwrite serive :: getAllPosts :: error", error)
      return false;
    }
  }

  //File upload service

  async uploadFile(file) { //In parameter we not only have to give file name but also the file blob
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID, ID.unique(), file
      )
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error)
      return false;
    }
  }

  async deleteFile(fileId) { //In parameter we not only have to give file name but also the file blob
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketID, fileId
      )
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error)
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketID,
      fileId
    )
  }
}


const service = new Service();

export default service;