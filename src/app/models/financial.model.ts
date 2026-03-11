export interface FinancialRecord {
  id?: number;
  recordType: RecordType;
  amount: number;
  description: string;
  category?: string;
  paymentMethod?: string;
  recordDate: Date;
  notes?: string;
  clientId?: number;
  appointmentId?: number;
  createdByUserId?: number;
  clientName?: string;
  createdByUserName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum RecordType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export const RecordTypeLabels: Record<RecordType, string> = {
  [RecordType.INCOME]: 'Ingreso',
  [RecordType.EXPENSE]: 'Gasto'
}; 