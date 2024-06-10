import { Icon } from "@iconify/react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Acasa",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Generator",
    path: "/generator",
    icon: <Icon icon="solar:document-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Industrial", path: "/generator/industrial" },
      { title: "Administrativ", path: "/generator/administrativ" },
      { title: "Caseta", path: "/generator/caseta" },
    ],
  },
  {
    title: "Descrieri",
    path: "/descrieri",
    icon: <Icon icon="mdi:text" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Lucrari", path: "/descrieri/lucrari" },
      { title: "Constatari", path: "/descrieri/constatari" },
      { title: "Materiale", path: "/descrieri/materiale" },
    ],
  },
  {
    title: "Setari",
    path: "/setari",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Cont", path: "/setari/cont" },
      { title: "Privacy", path: "/setari/privacy" },
    ],
  },
];
