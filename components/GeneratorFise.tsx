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
import { IndustrialePDFData, RaportImage } from "@/types/types";

interface FisaIndustrialProps {
  data: IndustrialePDFData;
}

interface FisaAdministrativProps {}

interface FisaCasetaProps {}

interface RaportIndustrialProps {
  data: IndustrialePDFData;
  imagini: RaportImage[];
}

interface RaportAdministrativProps {}

interface RaportCasetaProps {}

// Font.register({ family: "Times New Roman", src: "" });

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
    justifyContent: "space-around",
    alignItems: "center",
    border: "1px",
    borderColor: "black",
    borderRadius: "20px",
    height: "90%",
    width: "90%",
    padding: "20px",
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
    marginTop: "20px",
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
  bottomColumnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  blueBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Bold",
    fontSize: "12px",
  },
  blueNotBold: {
    color: "rgb(0, 112, 192)",
    fontFamily: "Times-Roman",
    fontSize: "12px",
  },
  topPart: {
    display: "flex",
    flexDirection: "column",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "rgb(0, 112, 192, 0.5)",
    fontFamily: "Times-Bold",
    marginTop: "40px",
    fontSize: "14px",
    position: "absolute",
    bottom: "10px",
  },
  descriereText: {
    fontFamily: "Times-Roman",
    fontSize: "12px",
    color: "black",
    textAlign: "justify",
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
            <View>
              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
                  <Text style={industrialeStyles.bold}>
                    Locaita (Aria):
                    <Text style={industrialeStyles.notBold}> {data.aria}</Text>
                  </Text>
                  <Text style={industrialeStyles.bold}>
                    Zona:
                    <Text style={industrialeStyles.notBold}>
                      {" "}
                      {data.zona}, {data.locaite_specifica}{" "}
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View style={industrialeStyles.justifyBetweenContainer}>
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
            <View>
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
              <View style={industrialeStyles.footerContainer}></View>
            </View>
            <Text style={industrialeStyles.footerText}>
              CONTRACT MENTENANTA CONSTRUCTII INDUSTRIALE
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export const FisaAdministrativ = ({}: FisaAdministrativProps) => {};

export const FisaCaseta = ({}: FisaCasetaProps) => {};

export const RaportIndustrial = ({ data, imagini }: RaportIndustrialProps) => {
  // console.log(imagini); check data
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
                    src={img.url}
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

export const RaportAdministraitv = ({}: RaportAdministrativProps) => {};

export const RaportCaseta = ({}: RaportCasetaProps) => {};
