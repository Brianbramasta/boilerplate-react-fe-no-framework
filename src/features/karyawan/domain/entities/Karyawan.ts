export type KaryawanStatus = 'active' | 'inactive' | 'terminated';

export interface Karyawan {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  department: string;
  role: string;
  joinDate: Date;
  status: KaryawanStatus;
}
