import { HttpException, HttpStatus } from '@nestjs/common';
import mime = require('mime');
import { Express, Request } from 'express';
import { ALLOWED_FILE_TYPES, DEFAULT_PAGE_NUMBER } from '../constants';
import { formatString, getExtensionFromName } from '@app/common';

export const getSkipParameter = (page: number, pageSize: number): number => {
  return (page - DEFAULT_PAGE_NUMBER) * pageSize;
};

export function fileFilter(req: Request, file: Express.Multer.File, cb: any) {
  const fileTypes = Object.values(ALLOWED_FILE_TYPES).join('|');
  if (!file.originalname.match(new RegExp(`\\.(${fileTypes})$`))) {
    cb(new HttpException(`Only ${fileTypes} file is allowed`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
}

export const composeCommonFileInfo = (fileName: string, fileMimetype, fileOriginalName, headers: string[]) => {
  const matchCsvTsvExt = fileOriginalName.match(
    new RegExp(`\\.(${ALLOWED_FILE_TYPES.csv}|${ALLOWED_FILE_TYPES.tsv})$`),
  );

  return {
    fileName: formatString(fileName),
    fileMimeType: matchCsvTsvExt ? mime.getType(getExtensionFromName(fileOriginalName)) : fileMimetype,
    fileExt: matchCsvTsvExt ? getExtensionFromName(fileOriginalName) : mime.getExtension(fileMimetype),
    schema: headers,
  };
};

export const addContentIdField = (parsedFile: Record<string, any>[], fileName: string) => {
  return parsedFile.map((item, idx) => ({
    ...item,
    [`${fileName}_contentId`]: idx + 1,
  }));
};
