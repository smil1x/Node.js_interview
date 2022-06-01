import { Inject, Injectable } from '@nestjs/common';
import { composeCommonFileInfo, addContentIdField } from '../../core/utils';
import { camelCase } from 'lodash';
import * as Buffer from 'buffer';
import { WorkBook, WorkSheet } from 'xlsx';
import { IObjectCommonInfo } from '../object.interface';
import { XLSX_PACKAGE_TOKEN } from '../../core/constants';

@Injectable()
export class ParserService {
  constructor(@Inject(XLSX_PACKAGE_TOKEN) private readonly xlsx) {}

  readWorkBook(fileBuffer: Buffer): WorkSheet {
    const workBook: WorkBook = this.xlsx.read(fileBuffer, {
      type: 'buffer',
      raw: true,
    });
    return workBook.Sheets[workBook.SheetNames[0]];
  }

  formatColumnNamesToCamelCase(workBookSheet: WorkSheet): string[] {
    const columnRowRange = this.xlsx.utils.decode_range(workBookSheet['!ref']);

    const formattedColumnHeaders = [];
    for (let columnCell = columnRowRange.s.c; columnCell <= columnRowRange.e.c; columnCell += 1) {
      const cellAddress = this.xlsx.utils.encode_cell({
        r: columnRowRange.s.r,
        c: columnCell,
      });
      const cell = workBookSheet[cellAddress];
      if (!cell) continue;
      formattedColumnHeaders.push(camelCase(cell.v));
    }
    return formattedColumnHeaders;
  }

  /**
   * Return generated array of objects and common file information.
   * Method sheet_to_json of xlsx package: parse xlsx, xls, csv, tsv, txt to JSON:
   *   - option defval - set default value for null/undefined cells value
   *   - option range - skip first raw in the data output, because we provide custom headers
   */
  parseFileToJson(file: Express.Multer.File, fileName: string) {
    const workBookSheet = this.readWorkBook(file.buffer);
    const formattedColumnsHeaders = this.formatColumnNamesToCamelCase(workBookSheet);

    const commonFileInfo: IObjectCommonInfo = composeCommonFileInfo(
      fileName,
      file.mimetype,
      file.originalname,
      formattedColumnsHeaders,
    );

    const parsedFile = this.xlsx.utils.sheet_to_json(workBookSheet, {
      defval: '',
      header: formattedColumnsHeaders,
      range: 1,
    });

    const formattedParsedFile = addContentIdField(parsedFile, commonFileInfo.fileName);

    return {
      commonFileInfo,
      parsedFile: formattedParsedFile,
    };
  }
}
