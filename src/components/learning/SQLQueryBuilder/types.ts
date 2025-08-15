export interface SQLCommand {
  id: string;
  content: string;
  audioSrc?: string;
  category?: 'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface QueryStep {
  id: string;
  order: number;
  command: SQLCommand;
  isCorrect: boolean;
  feedback?: string;
}

export interface SQLQueryBuilderProps {
  title?: string;
  instruction?: string;
  items?: SQLCommand[];
  correctOrder?: string[];
  onComplete?: (() => void) | { href: string };
  onIncorrectAttempt?: () => void;
  isLastLesson?: boolean;
  audioSrc?: string;
  speakText?: string;
  standard?: string;
  isFourthChapter?: boolean;
  showAdvancedFeatures?: boolean;
  enableQueryOptimization?: boolean;
  allowCustomQueries?: boolean;
}

export interface DatabaseSchema {
  tableName: string;
  columns: ColumnDefinition[];
  constraints: Constraint[];
}

export interface ColumnDefinition {
  name: string;
  dataType: string;
  isNullable: boolean;
  defaultValue?: string;
  constraints: string[];
}

export interface Constraint {
  name: string;
  type: 'PRIMARY KEY' | 'FOREIGN KEY' | 'UNIQUE' | 'CHECK' | 'NOT NULL';
  columns: string[];
  referenceTable?: string;
  referenceColumns?: string[];
}

export interface QueryExecutionResult {
  success: boolean;
  rowsAffected?: number;
  resultSet?: any[];
  executionTime?: number;
  errors?: string[];
  warnings?: string[];
}

