export const I_CLOUD_STORAGE_SERVICE = Symbol('I_CLOUD_STORAGE_SERVICE');

export interface ICloudStorageService {
  generateUploadUrl(
    fileName: string,
    fileSize: number,
    fileType: string,
  ): Promise<{
    presignedUrl: string;
    mediaUrl: string;
  }>;
}
