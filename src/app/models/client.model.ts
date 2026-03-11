export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: string;
  occupation?: string;
  address?: string;
  caseSummary?: string;
  initialConsultationDate?: Date;
  lastConsultationDate?: Date;
  debt?: number;
  notes?: string;
  consultationFrequency?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: User;
}

export interface User {
  id?: number;
  name?: string;
} 