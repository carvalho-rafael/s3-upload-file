import AWS from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import fs from  'fs'

async function uploadFile(fileName: any, filePath: number | fs.PathLike, mimeType: string) {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileContent,
        ContentType: mimeType
    } as PutObjectRequest;

    const data = await s3.upload(params).promise();
    return data.Location;
}

export {
  uploadFile
}
