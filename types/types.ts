export type formData = {
    titlu_lucrare: string;
    muncitori: number;
    randuri: number;
    pasi: string[];
    detalii: string;
}

export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
}

export type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
}

export type fisaIndustrialType = {
    denumire_lucrare: string;
    numar_fisa: string;
    randuri: number;
    pasi: string[];
    detalii: string;
    aria: string;
    zona: string;
    executant: string;
    data: string;
    tip_activitate: "Corectiv" | "Preventiv";
    locatie_specifica: string;
    reprezentant_anb: string;
    status: "DA" | "NU";
}