export interface IObjectCommonInfo {
  readonly fileName: string;
  readonly fileMimeType: string;
  readonly fileExt: string;
  readonly schema: string[];
}

export interface IObjectMetadata extends IObjectCommonInfo {
  readonly s3Key: string;
}

export interface IObjectToSave {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly content: Record<string, any>[];
  readonly metadata: Record<keyof IObjectMetadata, any>;
}
