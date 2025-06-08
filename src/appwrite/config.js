import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authService from "./auth";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    console.log("Appwrite URL:", conf.appwriteUrl);
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }


  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const user = await authService.getCurrentuser()
      console.log("User :: ", user)
      if (!user) {
        throw new Error("User not authenticatedx or logged in");
      }
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId: userId || user.$id
        }
      )
    } catch (error) {
      console.log("Create Post :: Error :: ", error)
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log("Update Post :: Error ::", error)
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )

      return true;
    } catch (error) {
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Get Post :: Error :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("getPosts:: Error", error);
    }
  }

  // file upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Upload File :: error :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true;
    } catch (error) {
      console.log("Delete File :: error :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service();
export default service;