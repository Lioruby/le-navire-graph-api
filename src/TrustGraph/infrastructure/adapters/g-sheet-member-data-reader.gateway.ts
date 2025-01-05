import {
  IMemberDataReaderGateway,
  MemberData,
} from 'src/TrustGraph/application/ports/member-data-reader.gateway';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export class GSheetMemberDataReaderGateway implements IMemberDataReaderGateway {
  private doc: GoogleSpreadsheet;

  constructor(
    @Inject(ConfigService)
    configService: ConfigService,
  ) {
    const spreadsheetId = configService.get('GOOGLE_SHEET_ID');
    const privateKey = configService
      .get('GOOGLE_PRIVATE_KEY')
      .replace(/\\n/g, '\n');
    const email = configService.get('GOOGLE_EMAIL');
    const auth = new JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.doc = new GoogleSpreadsheet(spreadsheetId, auth);
  }

  async getData(): Promise<MemberData[]> {
    try {
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByTitle['Feuille 2'];
      const rows = await sheet.getRows();
      const data = this.parseCSVData(rows);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  parseCSVData(
    csvData: GoogleSpreadsheetRow<Record<string, any>>[],
  ): MemberData[] {
    const sheet = this.doc.sheetsByTitle['Feuille 2'];
    const headers = sheet.headerValues;

    const usernamesHeaders = csvData[1].toObject();

    return csvData.slice(2).map((row, i) => {
      const rowObject = row.toObject();

      return {
        id: rowObject[headers[6]]?.trim().toLowerCase().replace('@', '') || '',
        name: `${rowObject[headers[4]] || ''} ${
          rowObject[headers[5]] || ''
        }`.trim(),
        profilePictureUrl: rowObject[headers[7]] || null,
        scores: headers
          .flatMap((header, index) => {
            let score = parseInt(rowObject[headers[index + 8]]) ?? 0;
            if (isNaN(score)) {
              score = 0;
            }
            return {
              for: usernamesHeaders[headers[index + 8]]
                ?.trim()
                .toLowerCase()
                .replace('@', ''),
              score: score,
            };
          })
          .filter(
            (score) =>
              score.score !== 0 && score.for !== ' ' && score.for !== undefined,
          ),
      };
    });
  }
}
