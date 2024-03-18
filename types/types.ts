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
    tip_activitate: "Corectiv" | "Preventiv" | null;
    locatie_specifica: string;
    reprezentant_anb: string;
    status: "DA" | "NU" | null;
}

export type IndustrialePDFData = {
    denumire_lucrare: string;
    aria: string;
    zona: string;
    tip_activitate: "Corectiv" | "Preventiv" | null;
    locaite_specifica: string;
    descriere: string;
    status: "DA" | "NU" | null;
    executant: string;
    reprezentant_anb: string;
    data: string;
    numar_fisa: string;
}

export type RaportImage = {
    url: string;
    name: string;
}