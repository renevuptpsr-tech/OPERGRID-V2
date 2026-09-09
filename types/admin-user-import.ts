export type UserImportAction =
  | "CREATE_USER"
  | "PROVISION"
  | "ADD_ACCESS"
  | "UPDATE_ACCESS"
  | "NO_CHANGE";


export type UserImportSeverity =
  | "READY"
  | "WARNING"
  | "ERROR";


export type UserImportAssignmentPreview = {
  rowNumber: number;

  roleName: string;

  roleCode:
    | string
    | null;

  roleScopeLevel:
    | string
    | null;

  scopeName:
    | string
    | null;

  scopeFunctlocId:
    | string
    | null;

  primary: boolean;

  includeChildren: boolean;

  validFrom:
    | string
    | null;

  validUntil:
    | string
    | null;

  notes:
    | string
    | null;

  alreadyExists: boolean;

  errors:
    string[];

  warnings:
    string[];
};


export type UserImportPreviewRow = {
  rowNumber: number;

  email: string;

  fullName: string;

  displayName:
    | string
    | null;

  employeeId:
    | string
    | null;

  jobName:
    | string
    | null;

  jobId:
    | string
    | null;

  organizationName:
    | string
    | null;

  organizationId:
    | string
    | null;

  userRelationship: string;

  accountStatus: string;

  phoneNumber:
    | string
    | null;

  telegramUsername:
    | string
    | null;

  telegramUserId:
    | string
    | null;

  authUserId:
    | string
    | null;

  hasAuthAccount: boolean;

  hasProfile: boolean;

  activeAssignmentCount: number;

  action:
    UserImportAction;

  severity:
    UserImportSeverity;

  errors:
    string[];

  warnings:
    string[];

  assignments:
    UserImportAssignmentPreview[];
};


export type UserImportPreviewSummary = {
  totalUsers: number;

  readyUsers: number;

  warningUsers: number;

  errorUsers: number;

  createUsers: number;

  provisionUsers: number;

  accessUsers: number;

  noChangeUsers: number;

  totalAssignments: number;
};


export type UserImportPreviewResult = {
  fileName: string;

  generatedAt: string;

  summary:
    UserImportPreviewSummary;

  globalErrors:
    string[];

  rows:
    UserImportPreviewRow[];
};