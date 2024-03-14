import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
  Canvas,
} from "@react-pdf/renderer";
import { IndustrialePDFData } from "@/types/types";

interface Props {
  data: IndustrialePDFData;
}

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
    width: "70rem",
    height: "25rem",
  },
  middleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  justifyBetweenContainer: {
    display: "flex",
    flexDirection: "row",
    width: "400px",
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
  },
  descriereText: {
    fontFamily: "Times-Roman",
    fontSize: "12px",
    color: "black",
    textAlign: "justify",
  },
});

const Testfile = ({ data }: Props) => {
  // console.log(data); // check test
  const renderingDelay = 1000; // 1000 = 1 second

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
                  <Link style={industrialeStyles.linkStyle} src="google.com">
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

export default Testfile;
