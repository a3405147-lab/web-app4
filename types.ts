export interface Group {
  id: number;
  students: number[];
}

export enum GroupingMethod {
  RANDOM = 'RANDOM',
  SEQUENTIAL = 'SEQUENTIAL',
}

export interface GroupConfig {
  totalStudents: number;
  groupCount: number;
  method: GroupingMethod;
}