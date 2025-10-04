import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  route('rekap', 'routes/recap.tsx'),
  route('slip', 'routes/slips.tsx'),
] satisfies RouteConfig;
