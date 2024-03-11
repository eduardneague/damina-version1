import { Icon } from '@iconify/react';
import { SideNavItem } from '@/types/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Acasa',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Fise',
    path: '/fise',
    icon: <Icon icon="solar:document-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Industrial', path: '/fise/industrial' },
      { title: 'Administrativ', path: '/fise/administrativ' },
      { title: 'Caseta', path: '/fise/caseta' },
    ],
  },
  {
    title: 'Raport',
    path: '/raport',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Industrial', path: '/raport/industrial' },
      { title: 'Administrativ', path: '/raport/administrativ' },
      { title: 'Caseta', path: '/raport/caseta' },
    ],
  },
  {
    title: 'Descrieri',
    path: '/descrieri',
    icon: <Icon icon="mdi:text" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Lucrari', path: '/descrieri/lucrari' },
      { title: 'Constatari', path: '/descrieri/constatari' },
    ],
  },
  {
    title: 'Setari',
    path: '/setari',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Cont', path: '/setari/cont' },
      { title: 'Privacy', path: '/setari/privacy' },
    ],
  },
  {
    title: 'Ajutor',
    path: '/ajutor',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];