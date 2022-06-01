declare interface IObject {
  id: string;
  name: string;
  description: string;
  tags: string[] | null;
  metadata: Record<string, any> | null;
  versionNumber: number | null;
  createdBy: string | null;
  createdAt: Date;
  updatedBy: string | null;
  updatedAt: Date;
  content: Record<string, any>[] | null;
}

declare interface IObjectCreate {
  name: string;
  description: string;
}
declare interface IObjectUpdate extends IObjectCreate {}
