import { PerformanceEvaluationInterface } from 'interfaces/performance-evaluation';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  working_hours?: number;
  created_at?: any;
  updated_at?: any;
  performance_evaluation?: PerformanceEvaluationInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    performance_evaluation?: number;
    team_member?: number;
  };
}

export interface EmployeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
