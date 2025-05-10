export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface SoftDelete {
  deletedAt?: string;
}

export interface AuditInfo {
  createdBy?: string;
  updatedBy?: string;
}

export type WithTimestamps<T> = T & Timestamps;
export type WithSoftDelete<T> = T & SoftDelete;
export type WithAudit<T> = T & AuditInfo;
