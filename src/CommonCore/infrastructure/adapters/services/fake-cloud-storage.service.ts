import { ICloudStorageService } from 'src/CommonCore/application/ports/cloud-storage.service';

export class FakeCloudStorageService implements ICloudStorageService {
  async generateUploadUrl(
    fileName: string,
    fileSize: number,
    fileType: string,
  ): Promise<{
    presignedUrl: string;
    mediaUrl: string;
  }> {
    return {
      presignedUrl: 'https://fake-s',
      mediaUrl: 'https://fake-s',
    };
  }
}
