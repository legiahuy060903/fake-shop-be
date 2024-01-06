import { ConfigService } from '@nestjs/config';
// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {

    constructor(private configService: ConfigService) {
        cloudinary.config({
            cloud_name: configService.get<string>('CLOUDINARY_NAME'),
            api_key: configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: this.configService.get<string>("CLOUDINARY_API_FORDER") },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }
    async deleteImage(url:string){
        const public_id = this.configService.get<string>("CLOUDINARY_API_FORDER") + "/"+ url.split("/").at(-1).split(".")[0];
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            cloudinary.uploader.destroy(public_id, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
        })
    }
    
    async uploadFiles(images: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
        const uploadPromises = images.map((image) => this.uploadFile(image));
        return Promise.all(uploadPromises);
    }
    
} 
       


 // return new Promise<CloudinaryResponse>((resolve, reject) => {
        //     const uploadStream = cloudinary.uploader.upload_stream({ folder: this.configService.get<string>("CLOUDINARY_API_FORDER") },
        //         (error, result) => {
        //             if (error) return reject(error);
        //             resolve(result);
        //         },
        //     );
        //     console.log(1)
            
        //     // streamifier.createReadStream(file.buffer).pipe(uploadStream);
        // })