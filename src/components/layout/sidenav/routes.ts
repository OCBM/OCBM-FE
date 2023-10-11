import { AddUserIcon, MachineIcon, MasteryIcon, PlantIcon, ReportsIcon, SetStandardIcon } from '@/assets/icons';
import { SITEMAP } from '@/utils/sitemap';

export const sideNavRoutes = [
  {
    icon: PlantIcon,
    title: 'Plant',
    path: SITEMAP.plant.index,
    key: SITEMAP.plant.index,
  },
  {
    icon: MachineIcon,
    title: 'Machines',
    path: SITEMAP.machines.index,
    key: SITEMAP.machines.index,
  },
  {
    icon: MasteryIcon,
    title: 'Mastery',
    path: SITEMAP.mastery.index,
    key: SITEMAP.mastery.index,
  },
  {
    icon: SetStandardIcon,
    title: 'Set Standards',
    path: SITEMAP.setStandards.index,
    key: SITEMAP.setStandards.index,
  },
  {
    icon: ReportsIcon,
    title: 'Reports',
    path: SITEMAP.reports.index,
    key: SITEMAP.reports.index,
  },
  {
    icon: AddUserIcon,
    title: 'Add user',
    path: SITEMAP.users.index,
    key: SITEMAP.users.index,
  },
];
