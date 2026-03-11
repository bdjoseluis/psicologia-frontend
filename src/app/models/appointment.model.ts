export interface Appointment {
  id?: number;
  appointmentDate: Date;
  durationMinutes?: number;
  status: AppointmentStatus;
  sessionType?: string;
  price?: number;
  notes?: string;
  clientId?: number;
  userId?: number;
  clientName?: string;
  userName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export const AppointmentStatusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.SCHEDULED]: 'Programada',
  [AppointmentStatus.CONFIRMED]: 'Confirmada',
  [AppointmentStatus.COMPLETED]: 'Completada',
  [AppointmentStatus.CANCELLED]: 'Cancelada',
  [AppointmentStatus.NO_SHOW]: 'No se presentó'
}; 