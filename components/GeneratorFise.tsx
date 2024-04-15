import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import {
  IndustrialePDFData,
  CasetaPDFData,
  AdministrativPDFData,
  RaportImage,
} from "@/types/types";
import { FileX } from "lucide-react";

interface FisaIndustrialProps {
  data: IndustrialePDFData;
}

interface FisaAdministrativProps {
  data: AdministrativPDFData;
}

interface FisaCasetaProps {
  data: CasetaPDFData;
}

interface RaportIndustrialProps {
  data: IndustrialePDFData;
  imagini: RaportImage[];
}

interface RaportAdministrativProps {
  data: AdministrativPDFData;
  imagini: RaportImage[];
}

interface RaportCasetaProps {
  data: CasetaPDFData;
  imagini: RaportImage[];
}

// Font.register({ family: "Times-Roman New Roman", src: "" });

const industrialeStyles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
  headerNrAndDate: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
    textAlign: "center",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "0.5px",
    borderColor: "black",
    borderRadius: "20px",
    height: "90%",
    width: "90%",
    padding: "18px",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  topBarText: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
  },
  linkStyle: {
    color: "rgb(0, 112, 192)",
  },
  logo: {
    width: "90rem",
    height: "30rem",
  },
  middleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  justifyBetweenContainer: {
    display: "flex",
    flexDirection: "row",
    width: "500px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "25px",
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: "13px",
    color: "black",
  },
  notBold: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
  },
  bottomColumnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  blueBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Bold",
    fontSize: "13px",
  },
  blueNotBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Roman",
    fontSize: "13px",
  },
  topPart: {
    display: "flex",
    flexDirection: "column",
    height: "15%",
    width: "100%",
  },
  middlePart: {
    display: "flex",
    flexDirection: "column",
    height: "65%",
    width: "100%",
  },
  bottomPart: {
    display: "flex",
    flexDirection: "column",
    height: "20%",
    width: "100%",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  footerText: {
    color: "rgb(0, 112, 192, 0.5)",
    fontFamily: "Times-Bold",
    fontSize: "13px",
  },
  descriereText: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
    textAlign: "justify",
    lineHeight: "1.5px",
  },
});

const administrativStyles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Helvetica-Bold",
    color: "black",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  },
  secondHeaderTitle: {
    fontFamily: "Times-BoldItalic",
    color: "rgb(0, 112, 192)",
    fontSize: "13px",
  },
  headerContainer: {
    display: "flex",
    gap: "4px",
  },
  headerNrAndDate: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
    textAlign: "center",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    border: "0.5px",
    borderColor: "black",
    borderRadius: "20px",
    height: "90%",
    width: "90%",
    paddingLeft: "18px",
    paddingRight: "18px",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
  },
  topBarText: {
    fontFamily: "Times-Roman",
    color: "gray",
    fontSize: "12px",
    marginTop: "5px",
  },
  linkStyle: {
    color: "gray",
  },
  logo: {
    width: "90rem",
    height: "30rem",
  },
  justifyBetweenContainer: {
    display: "flex",
    flexDirection: "row",
    width: "500px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "25px",
  },
  justifyBetweenContainerFooter: {
    display: "flex",
    flexDirection: "row",
    width: "500px",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: "13px",
    color: "black",
  },
  notBold: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
  },
  bottomColumnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  blueBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Bold",
    fontSize: "13px",
  },
  blueNotBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Roman",
    fontSize: "13px",
  },
  topPart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "15%",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  footerText: {
    color: "gray",
    fontFamily: "Times-BoldItalic",
    fontSize: "11px",
    textAlign: "center",
  },
  descriereText: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
    textAlign: "justify",
    lineHeight: "1.5px",
  },
  logoText: {
    fontSize: "18px",
    color: "rgb(0, 176, 80)",
    fontFamily: "Helvetica-BoldOblique",
    marginTop: "5px",
  },
  middlePart: {
    display: "flex",
    height: "60%",
    width: "100%",
    flexDirection: "column",
  },
  bottomPart: {
    display: "flex",
    height: "25%",
    width: "100%",
    marginTop: "30px",
  },
  blueAdministrativ: {
    color: "rgb(0, 32, 96)",
    fontFamily: "Times-Bold",
    fontSize: "13px",
  },
});

const casetaStyles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
  headerNrAndDate: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
    textAlign: "center",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "0.5px",
    borderColor: "black",
    borderRadius: "20px",
    height: "90%",
    width: "90%",
    paddingLeft: "18px",
    paddingRight: "18px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  topBarText: {
    fontFamily: "Times-Roman",
    color: "rgb(0, 112, 192)",
    fontSize: "14px",
  },
  linkStyle: {
    color: "rgb(0, 112, 192)",
  },
  logo: {
    width: "90rem",
    height: "30rem",
  },
  justifyBetweenContainer: {
    display: "flex",
    flexDirection: "row",
    width: "500px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "25px",
  },
  justifyBetweenContainerFooter: {
    display: "flex",
    flexDirection: "row",
    width: "500px",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: "13px",
    color: "black",
  },
  notBold: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
  },
  bottomColumnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  blueBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Bold",
    fontSize: "13px",
  },
  blueNotBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Roman",
    fontSize: "13px",
  },
  topPart: {
    display: "flex",
    flexDirection: "column",
    height: "15%",
    witdh: "100%",
  },
  middlePart: {
    display: "flex",
    flexDirection: "column",
    height: "65%",
    witdh: "100%",
  },
  bottomPart: {
    display: "flex",
    flexDirection: "column",
    height: "20%",
    witdh: "100%",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  footerText: {
    color: "rgb(0, 112, 192, 0.5)",
    fontFamily: "Times-BoldItalic",
    fontSize: "11px",
  },
  descriereText: {
    fontFamily: "Times-Roman",
    fontSize: "13px",
    color: "black",
    textAlign: "justify",
    lineHeight: "1.5px",
  },
});

const raportCasetaStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "90%",
    width: "90%",
    padding: "20px",
    gap: "10px",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: "12px",
    color: "black",
  },
  notBold: {
    fontFamily: "Times-Roman",
    fontSize: "12px",
    color: "black",
  },
  imageFlexBox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "100%",
  },
  displayedImage: {
    border: "2px",
    borderColor: "black",
    borderStyle: "solid",
    objectFit: "cover",
    objectPosition: "center",
    width: "160px",
    height: "280px",
  },
});

const raportIndustrialeStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "90%",
    width: "90%",
    padding: "20px",
    gap: "10px",
  },
  pageBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontFamily: "Times-Bold",
    fontSize: "12px",
    color: "black",
  },
  notBold: {
    fontFamily: "Times-Roman",
    fontSize: "12px",
    color: "black",
  },
  imageFlexBox: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: "100%",
  },
  displayedImage: {
    border: "2px",
    borderColor: "black",
    borderStyle: "solid",
    objectFit: "cover",
    objectPosition: "center",
    width: "160px",
    height: "280px",
  },
});

export const FisaIndustrial = ({ data }: FisaIndustrialProps) => {
  // console.log(data); // check test
  return (
    <>
      <Document>
        <Page style={industrialeStyles.pageBody} size="A4">
          <View style={industrialeStyles.mainContainer}>
            <View style={industrialeStyles.topPart}>
              <View style={industrialeStyles.topBar}>
                <Image src="/DAMINA_LOGO.png" style={industrialeStyles.logo} />
                <Text style={industrialeStyles.topBarText}>
                  E-mail:{" "}
                  <Link
                    style={industrialeStyles.linkStyle}
                    src="mail:mentenanta@damina.ro"
                  >
                    mentenanta@damina.ro
                  </Link>
                  ; Telefon:{" "}
                  <Link
                    style={industrialeStyles.linkStyle}
                    src="tel:+40743200391"
                  >
                    0743.200.391
                  </Link>
                </Text>
              </View>
              <View style={industrialeStyles.headerContainer}>
                <Text style={industrialeStyles.headerTitle}>
                  FISA DE LUCRU PENTRU CONSTRUCTII INDUSTRIALE
                </Text>
                <br />
                <Text style={industrialeStyles.headerNrAndDate}>
                  Nr {data.numar_fisa.length == 0 ? "..." : data.numar_fisa} din{" "}
                  {data.data.length == 0 ? "..." : data.data}
                </Text>
              </View>
            </View>
            {/*  */}
            <View style={industrialeStyles.middlePart}>
              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
                  <Text style={industrialeStyles.bold}>
                    Locatia (Aria):
                    <Text style={industrialeStyles.notBold}> {data.aria}</Text>
                  </Text>
                  <Text style={industrialeStyles.bold}>
                    Zona:
                    <Text style={industrialeStyles.notBold}>
                      {" "}
                      {data.zona} {data.locaite_specifica}{" "}
                    </Text>
                  </Text>
                  <Text style={industrialeStyles.bold}>
                    Tip Activitate:
                    <Text style={industrialeStyles.notBold}>
                      {" "}
                      {data.tip_activitate}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
                  <Text style={industrialeStyles.bold}>
                    Denumirea lucrarii:
                    <Text style={industrialeStyles.notBold}>
                      {" "}
                      {data.denumire_lucrare}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
                  <Text style={industrialeStyles.bold}>
                    Descrierea activitatii:
                    <Text style={industrialeStyles.descriereText}>
                      {" "}
                      {data.descriere}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
                  <Text style={industrialeStyles.bold}>
                    Lucrare finalizata:
                    <Text style={industrialeStyles.notBold}>
                      {" "}
                      {data.status}
                    </Text>
                  </Text>
                </View>
              </View>
              {/*  */}
            </View>
            <View style={industrialeStyles.bottomPart}>
              <View style={industrialeStyles.justifyBetweenContainer}>
                <View style={industrialeStyles.bottomColumnContainer}>
                  <Text style={industrialeStyles.blueBold}>Executant:</Text>

                  <Text style={industrialeStyles.bold}>
                    Nume:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      {data.executant}
                    </Text>
                  </Text>

                  <Text style={industrialeStyles.bold}>
                    Semnatura:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      ...............
                    </Text>
                  </Text>

                  <Text style={industrialeStyles.bold}>
                    Data:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      {data.data}
                    </Text>
                  </Text>
                </View>

                {/* Reprezentant ANB */}

                <View style={industrialeStyles.bottomColumnContainer}>
                  <Text style={industrialeStyles.blueBold}>
                    Reprezentant ANB:
                  </Text>

                  <Text style={industrialeStyles.bold}>
                    Nume:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      {data.reprezentant_anb}
                    </Text>
                  </Text>

                  <Text style={industrialeStyles.bold}>
                    Semnatura:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      ...............
                    </Text>
                  </Text>

                  <Text style={industrialeStyles.bold}>
                    Data:
                    <Text style={industrialeStyles.blueNotBold}>
                      {" "}
                      {data.data}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={industrialeStyles.footerContainer}>
                <Text style={industrialeStyles.footerText}>
                  CONTRACT MENTENANTA CONSTRUCTII INDUSTRIALE
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const FisaAdministrativ = ({ data }: FisaAdministrativProps) => {
  const executantName = data.executant.split(" ");
  const beneficiarGlinaName = data.reprezentant_anb.split(" ");
  const derulatorName = data.derulator_contract.split(" ");

  return (
    <>
      <Document>
        <Page style={administrativStyles.pageBody} size="A4">
          <View style={administrativStyles.mainContainer}>
            <View style={administrativStyles.topPart}>
              <Text style={administrativStyles.logoText}>
                DAMINA SOLUTIONS S.R.L.
              </Text>
              <Text style={administrativStyles.topBarText}>
                E-mail:{" "}
                <Link
                  style={administrativStyles.linkStyle}
                  src="mail:mentenanta@damina.ro"
                >
                  mentenanta@damina.ro
                </Link>
                ; Telefon:{" "}
                <Link
                  style={administrativStyles.linkStyle}
                  src="tel:+40734283521"
                >
                  0734 283 521
                </Link>
              </Text>
              <View style={administrativStyles.headerContainer}>
                <Text style={administrativStyles.headerTitle}>
                  FISA DE LUCRU nr ... din{" "}
                  {data.data.length == 0 ? "..." : data.data}
                </Text>
                <Text style={administrativStyles.secondHeaderTitle}>
                  Lucrari de MENTENANTA
                </Text>
              </View>
            </View>
            {/*  */}
            <View style={administrativStyles.middlePart}>
              <View>
                <View style={administrativStyles.justifyBetweenContainer}>
                  <Text style={administrativStyles.bold}>
                    Locatia (Aria):
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.aria}
                    </Text>
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Zona:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.zona} {data.locaite_specifica}{" "}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={administrativStyles.justifyBetweenContainer}>
                  <Text style={administrativStyles.bold}>
                    Tip Activitate:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.tip_activitate}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={administrativStyles.justifyBetweenContainer}>
                  <Text style={administrativStyles.bold}>
                    Denumirea lucrarii:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.denumire_lucrare}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={administrativStyles.justifyBetweenContainer}>
                  <Text style={administrativStyles.bold}>
                    Descrierea activitatii:
                    <Text style={administrativStyles.descriereText}>
                      {" "}
                      {data.descriere}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={administrativStyles.justifyBetweenContainer}>
                  <Text style={administrativStyles.bold}>
                    Lucrare finalizata:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.status}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            {/*  */}
            <View style={administrativStyles.bottomPart}>
              <View style={administrativStyles.justifyBetweenContainerFooter}>
                <View style={administrativStyles.bottomColumnContainer}>
                  <Text style={administrativStyles.blueAdministrativ}>
                    Executant:{" "}
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Nume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {executantName[0]}
                    </Text>
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Prenume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {executantName[1]}
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Semnatura:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      ...............
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Data:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.data}
                    </Text>
                  </Text>
                </View>

                {/* Reprezentant ANB */}

                <View style={administrativStyles.bottomColumnContainer}>
                  <Text style={administrativStyles.blueAdministrativ}>
                    Beneficiar Glina:{" "}
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Nume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {beneficiarGlinaName[0]}
                    </Text>
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Prenume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {beneficiarGlinaName[1]}
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Semnatura:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      ...............
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Data:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.data}
                    </Text>
                  </Text>
                </View>
                <View style={administrativStyles.bottomColumnContainer}>
                  <Text style={administrativStyles.blueAdministrativ}>
                    Derulator Contract:{" "}
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Nume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {derulatorName[0]}
                    </Text>
                  </Text>
                  <Text style={administrativStyles.bold}>
                    Prenume:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {derulatorName[1]}
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Semnatura:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      ...............
                    </Text>
                  </Text>

                  <Text style={administrativStyles.bold}>
                    Data:
                    <Text style={administrativStyles.notBold}>
                      {" "}
                      {data.data}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={administrativStyles.footerContainer}>
                <Text style={administrativStyles.footerText}>
                  Datele din aceasta fisa corespund cu situatia din teren S.C.
                  Damina Solutions SRL
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const FisaCaseta = ({ data }: FisaCasetaProps) => {
  const nume1 = data.executant.split(" ");
  const nume2 = data.reprezentant_anb.split(" ");

  return (
    <>
      <Document>
        <Page style={casetaStyles.pageBody} size="A4">
          <View style={casetaStyles.mainContainer}>
            <View style={casetaStyles.topPart}>
              <View style={casetaStyles.topBar}>
                <Image src="/DAMINA_LOGO.png" style={casetaStyles.logo} />
                <Text style={casetaStyles.topBarText}>
                  E-mail:{" "}
                  <Link
                    style={casetaStyles.linkStyle}
                    src="mail:mentenantacaseta@damina.ro"
                  >
                    mentenantacaseta@damina.ro
                  </Link>
                  ; Telefon:{" "}
                  <Link style={casetaStyles.linkStyle} src="tel:+40734283500">
                    0734 283 500
                  </Link>
                </Text>
              </View>
              <View style={casetaStyles.headerContainer}>
                <Text style={casetaStyles.headerTitle}>
                  FISA DE LUCRU MENTENANTA CASETA
                </Text>
                <br />
                <Text style={casetaStyles.headerNrAndDate}>
                  DIN {data.data.length == 0 ? "..." : data.data}
                </Text>
              </View>
            </View>
            {/*  */}
            <View style={casetaStyles.middlePart}>
              <View>
                <View style={casetaStyles.justifyBetweenContainer}>
                  <Text style={casetaStyles.bold}>
                    Locatia (Aria):
                    <Text style={casetaStyles.notBold}> {data.aria}</Text>
                  </Text>
                  <Text style={casetaStyles.bold}>
                    Zona:
                    <Text style={casetaStyles.notBold}>
                      {" "}
                      {data.zona} {data.locaite_specifica}{" "}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={casetaStyles.justifyBetweenContainer}>
                  <Text style={casetaStyles.bold}>
                    Tip Activitate:
                    <Text style={casetaStyles.notBold}>
                      {" "}
                      {data.tip_activitate}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={casetaStyles.justifyBetweenContainer}>
                  <Text style={casetaStyles.bold}>
                    Denumirea lucrarii:
                    <Text style={casetaStyles.notBold}>
                      {" "}
                      {data.denumire_lucrare}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={casetaStyles.justifyBetweenContainer}>
                  <Text style={casetaStyles.bold}>
                    Descrierea activitatii:
                    <Text style={casetaStyles.descriereText}>
                      {" "}
                      {data.descriere}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={casetaStyles.justifyBetweenContainer}>
                  <Text style={casetaStyles.bold}>
                    Lucrare finalizata:
                    <Text style={casetaStyles.notBold}> {data.status}</Text>
                  </Text>
                </View>
              </View>
              {/*  */}
            </View>
            <View style={casetaStyles.bottomPart}>
              <View style={casetaStyles.justifyBetweenContainerFooter}>
                <View style={casetaStyles.bottomColumnContainer}>
                  <Text style={casetaStyles.bold}>
                    Nume:
                    <Text style={casetaStyles.notBold}> {nume1[0]}</Text>
                  </Text>
                  <Text style={casetaStyles.bold}>
                    Prenume:
                    <Text style={casetaStyles.notBold}> {nume1[1]}</Text>
                  </Text>

                  <Text style={casetaStyles.bold}>
                    Semnatura:
                    <Text style={casetaStyles.notBold}> ...............</Text>
                  </Text>

                  <Text style={casetaStyles.bold}>
                    Data:
                    <Text style={casetaStyles.notBold}> {data.data}</Text>
                  </Text>
                </View>

                {/* Reprezentant ANB */}

                <View style={casetaStyles.bottomColumnContainer}>
                  <Text style={casetaStyles.bold}>
                    Nume:
                    <Text style={casetaStyles.notBold}> {nume2[0]}</Text>
                  </Text>
                  <Text style={casetaStyles.bold}>
                    Prenume:
                    <Text style={casetaStyles.notBold}> {nume2[1]}</Text>
                  </Text>

                  <Text style={casetaStyles.bold}>
                    Semnatura:
                    <Text style={casetaStyles.notBold}> ...............</Text>
                  </Text>

                  <Text style={casetaStyles.bold}>
                    Data:
                    <Text style={casetaStyles.notBold}> {data.data}</Text>
                  </Text>
                </View>
              </View>
              <View style={casetaStyles.footerContainer}>
                <Text style={casetaStyles.footerText}>
                  Datele din aceasta fisa corespund cu situatia din teren
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const RaportIndustrial = ({ data, imagini }: RaportIndustrialProps) => {
  // console.log(imagini); // check data
  return (
    <>
      <Document>
        <Page style={raportIndustrialeStyles.pageBody} size="A4" wrap>
          <View style={raportIndustrialeStyles.mainContainer}>
            <Text style={raportIndustrialeStyles.bold}>
              Denumirea Lucrarii: {data.denumire_lucrare}
            </Text>
            <Text style={raportIndustrialeStyles.bold}>
              Descrierea Activitatii:
              <Text style={raportIndustrialeStyles.notBold}>
                {" "}
                {data.descriere}
              </Text>
            </Text>
            <View style={raportIndustrialeStyles.imageFlexBox}>
              {imagini.map((img: any, i: any) => {
                return (
                  <Image
                    key={i}
                    src={{
                      uri: img.url,
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                    style={raportIndustrialeStyles.displayedImage}
                  />
                );
              })}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const RaportAdministrativ = ({
  data,
  imagini,
}: RaportAdministrativProps) => {
  return (
    <>
      <Document>
        <Page style={raportCasetaStyles.pageBody} size="A4" wrap>
          <View style={raportCasetaStyles.mainContainer}>
            <Text style={raportCasetaStyles.bold}>
              Denumirea Lucrarii: {data.denumire_lucrare}
            </Text>
            <Text style={raportCasetaStyles.bold}>
              Descrierea Activitatii:
              <Text style={raportCasetaStyles.notBold}> {data.descriere}</Text>
            </Text>
            <View style={raportCasetaStyles.imageFlexBox}>
              {imagini.map((img: any, i: any) => {
                return (
                  <Image
                    key={i}
                    src={{
                      uri: img.url,
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                    style={raportCasetaStyles.displayedImage}
                  />
                );
              })}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const RaportCaseta = ({ data, imagini }: RaportCasetaProps) => {
  return (
    <>
      <Document>
        <Page style={raportCasetaStyles.pageBody} size="A4" wrap>
          <View style={raportCasetaStyles.mainContainer}>
            <Text style={raportCasetaStyles.bold}>
              Denumirea Lucrarii: {data.denumire_lucrare}
            </Text>
            <Text style={raportCasetaStyles.bold}>
              Descrierea Activitatii:
              <Text style={raportCasetaStyles.notBold}> {data.descriere}</Text>
            </Text>
            <View style={raportCasetaStyles.imageFlexBox}>
              {imagini.map((img: any, i: any) => {
                return (
                  <Image
                    key={i}
                    src={{
                      uri: img.url,
                      method: "GET",
                      headers: { "Cache-Control": "no-cache" },
                      body: "",
                    }}
                    style={raportCasetaStyles.displayedImage}
                  />
                );
              })}
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
