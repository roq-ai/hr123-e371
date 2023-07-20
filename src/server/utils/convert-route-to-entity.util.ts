const mapping: Record<string, string> = {
  employees: 'employee',
  organizations: 'organization',
  'performance-evaluations': 'performance_evaluation',
  teams: 'team',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
