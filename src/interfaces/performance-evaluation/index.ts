import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceEvaluationInterface {
  id?: string;
  employee_id?: string;
  rating?: number;
  comments?: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface PerformanceEvaluationGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
  comments?: string;
}
