export interface IAzureConfig {
  CLIENT_ID: string;
  TENANT_ID: string;
  AUDIENCE: string;
  TOKEN_VERSION: 1 | 2;
  SCOPES: Record<string, string>;
}
