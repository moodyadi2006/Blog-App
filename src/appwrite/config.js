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

  async createPost({ title, slug, content, FeaturedImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, slug, {
        title, content, FeaturedImage, status, userId
      }
      )
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error)
    }
  }

  async updatePost(slug, { title, content, FeaturedImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, slug, {
        title,
        FeaturedImage,
        content,
        status
      }
      )

    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error)
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error)
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, slug
      )
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error)
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal('status', 'active')]) { //Check for it
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID, conf.appwriteCollectionID, queries
      )
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error", error)
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
      console.log("Appwrite service :: uploadFile :: error", error)
      return false;
    }
  }

  async deleteFile(fileId) { //In parameter we not only have to give file name but also the file blob
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketID, fileId
      )
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error)
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