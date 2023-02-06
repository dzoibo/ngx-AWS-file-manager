import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as AWS from 'aws-sdk';
import { Body } from 'aws-sdk/clients/s3';
import { CredentialsOptions } from 'aws-sdk/lib/credentials';

@Injectable({
  providedIn: 'root'
})

export class NgxFileManagerService {
  isConfigUpdate: boolean;
  $progress!: BehaviorSubject<number>;
  keyId!: string;
  secretId!: string;

  constructor() {
    this.$progress=new BehaviorSubject(0);
    this.isConfigUpdate=false;
  }

  /**
   * set the credentials that must be used foreach connexion to the bucked
   */
  setCredentials(keyId: string, secretId: string){
    this.keyId=keyId;
    this.secretId=secretId;

  }
  /**
      * use to confure file to make it ready to load bzy the browser
      */
     async uploadMedia(selectedFile: File,bucketName: string,region: string){
      const credentialRequest={
        accessKeyId:this.keyId,
        secretAccessKey: this.secretId,
      }
      const mediaStreamRequest = this.getFile(selectedFile);
      const [mediaStream]=await Promise.all([mediaStreamRequest]);
      await this.uploadToS3Bucket(selectedFile,bucketName,region,mediaStream,credentialRequest,progress=>{
        console.log(progress);
      });
}
      /**
       * upload the file online 
       */
async uploadToS3Bucket(selectedFile: File, bucketName: string,region: string, stream: Body, credential: CredentialsOptions,cd: { (progress: any): void; (arg0: Promise<number>): void; }){
    try{
        if (!this.isConfigUpdate) {
          AWS.config.update(({ region: region}));
            this.isConfigUpdate = true;
        }
        let s3 = new AWS.S3({
          apiVersion: '2006-03-01',
            region: region,
            credentials: new AWS.Credentials({
                accessKeyId: credential.accessKeyId,// access id creaded in your aws account
                secretAccessKey: credential.secretAccessKey,// secret key created in your account
            })
        });
        await s3.upload({
            Bucket: bucketName,
            Key: selectedFile.name,// name of the bucket file online
            ContentType: selectedFile.type,// here we provide the type of our file
            Body: stream //the file as a media stream
        }).on("httpUploadProgress",  progress => {
            cd(this.getUploadingProgress(progress.loaded, progress.total));
        }).promise();
    }
    catch (error) {
        console.log('Error to upload the file',error);
    }
 }
 /**
  * get the progress of the upload
  */
async getUploadingProgress(uploadSize: number,totalSize: number){
  let uploadProgress = (uploadSize / totalSize) * 100;
  this.$progress.next(Number(uploadProgress.toFixed(0)));
  return this.$progress.value;
}

/**
* return the file as a promise of media stream to make it easy to handle during uploading
*/
async getFile(file: File){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=(e)=>{
      resolve(e.target?.result);
    };
    reader.onerror=()=>{
      reject(false);
    };
    reader.readAsArrayBuffer(file);
  });
 }
}
