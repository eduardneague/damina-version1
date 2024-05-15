"use client";

// CONVERT IMAGES TO PNG, WORD CANT READ BASE64
// CHECK BLOBPROVIDER FROM react-pdf (see what's inside)

import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { fisaCasetaType } from "@/types/types";
import LoadingAnimation from "@/components/LoadingAnimation";
import Compressor from "compressorjs";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { HiClipboardCopy } from "react-icons/hi";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import Tiptap from "@/components/Tiptap";
import { FisaCaseta, RaportCaseta } from "@/components/GeneratorFise";
import dynamic from "next/dynamic";
import { useWindowSize } from "@/hooks/useWindowSize";

import { FaFilePdf } from "react-icons/fa6";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function FisaCasetaForm() {
  const [images, setImages] = useState<any>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();
  const [showFisa, setShowFisa] = useState<boolean>(false);
  const [showRaport, setShowRaport] = useState<boolean>(false);
  const [pasiEnumerati, setPasiEnumerati] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({
    denumire_lucrare: "",
    numar_fisa: "",
    randuri: 10,
    pasi: [],
    detalii: "",
    aria: "",
    zona: "",
    locatie_specifica: "",
    executant: "Imologomhe Dorina",
    data: "",
    tip_activitate: null,
    reprezentant_anb: "Chiriacescu Mihai",
    status: null,
  });

  const windowSize = useWindowSize();

  const [pasInput, setPasInput] = useState<string>("");
  const [finalDraft, setFinalDraft] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [descriere, setDescriere] = useState<string>("");
  const [readyToRequest, setReadyToRequest] = useState<boolean>(false);
  const fileInputRef = useRef<any>(null);

  const casetaData: any = {
    denumire_lucrare: formData.denumire_lucrare
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
    aria: formData.aria.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    zona: formData.zona.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    tip_activitate: formData.tip_activitate,
    locaite_specifica: formData.locatie_specifica
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
    descriere: descriere.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    status: formData.status,
    executant: formData.executant
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
    reprezentant_anb: formData.reprezentant_anb
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
    data: formData.data.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    numar_fisa: formData.numar_fisa
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
  };

  // PDF DOWNLOAD LINK FIX

  const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => (
        <p className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-400">
          Loading...
        </p>
      ),
    }
  );

  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  // End of fix

  useEffect(() => {
    handleValidation();
  }, [formData]);

  useEffect(() => {
    if (finalDraft.length > 10) {
      sendMessage(finalDraft);
      setReadyToRequest(false);
      setTimeout(() => {
        setReadyToRequest(true);
      }, 5000);
      setFinalDraft("");
    }
  }, [finalDraft]);

  const handleInputChange = (e: any) => {
    setPasInput(e.target.value);
  };

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopyStatus("Text Copiat!");
        setTimeout(() => {
          setCopyStatus("");
        }, 650);
      })
      .catch((error: any) => {
        setCopyStatus("Textul nu a putut fi copiat.");
        setTimeout(() => {
          setCopyStatus("");
        }, 650);
      });
  };

  const handleResetareForumlar = () => {
    setFormData({
      denumire_lucrare: "",
      numar_fisa: "",
      randuri: 10,
      pasi: [],
      detalii: "",
      aria: "",
      zona: "",
      locatie_specifica: "",
      executant: "Gabriel Balan",
      data: "",
      tip_activitate: null,
      reprezentant_anb: "Anton Ciometti",
      status: null,
    });
    setPasiEnumerati([]);
  };

  const handleValidation = () => {
    if (
      formData.denumire_lucrare.length > 0 &&
      formData.pasi.length > 0 &&
      formData.data.length > 0 &&
      formData.aria.length > 0 &&
      formData.zona.length > 0
    ) {
      setReadyToRequest(true);
    } else setReadyToRequest(false);
  };

  const updateForm = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // astazi stiu eu si Dumnezeu ce e aici.
  // maine doar Dumnezeu

  // GOOD WORKING FUNCTION

  // function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       new Compressor(files[i], {
  //         quality: 0.8,
  //         success: (result: any) => {
  //           const reader = new FileReader();
  //           reader.readAsDataURL(result);
  //           reader.onload = () => {
  //             // console.log("console log fain: " + reader.result);
  //             setImages((prevImages: any) => [
  //               ...prevImages,
  //               {
  //                 name: files[i].name,
  //                 url: reader.result,
  //               },
  //             ]);
  //           };
  //         },
  //       });
  //     }
  //   }
  // }

  // only png works (current one im using)

  // function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       new Compressor(files[i], {
  //         quality: 0.8,
  //         convertTypes: ["image/jpeg"],
  //         success: (result: any) => {
  //           const reader = new FileReader();
  //           const mustBePng = new Blob([result], { type: "image/png" });
  //           reader.readAsDataURL(mustBePng);
  //           reader.onload = () => {
  //             setImages((prevImages: any) => [
  //               ...prevImages,
  //               {
  //                 type: result.type,
  //                 name: files[i].name,
  //                 url: reader.result,
  //               },
  //             ]);
  //           };
  //         },
  //       });
  //     }
  //   }
  // }

  // No compression File Select Function

  // function onFileSelect_noCompressor(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       const reader = new FileReader();
  //       const mustBePng = new Blob([files[i]], { type: "image/png " });
  //       reader.readAsDataURL(mustBePng);
  //       reader.onload = () => {
  //         setImages((prevImages: any) => [
  //           ...prevImages,
  //           {
  //             name: files[i].name,
  //             url: reader.result,
  //           },
  //         ]);
  //       };
  //     }
  //   }
  // }

  // 21.03.2024 try (CURRENT ONE IN USE)

  function onFileSelect(e: any) {
    const files = e.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: any) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          setImages((prevImages: any) => [
            ...prevImages,
            {
              type: files[i].type,
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
            },
          ]);
        };
      }
    }
  }

  // async function convertType(source: any, type: any) {
  //   let image = await createImageBitmap(source);
  //   let canvas = new OffscreenCanvas(image.width, image.height);
  //   let context = canvas.getContext("2d");
  //   context?.drawImage(image, 0, 0);

  //   let result = await canvas.convertToBlob({ type });
  //   image.close();
  //   return result;
  // }

  // // another try i guess

  // // console.log(images);

  // async function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       const convertedImage = await convertType(files[i], "image/png");
  //       console.log("thing: ", convertedImage);
  //       if (convertedImage)
  //         setImages((prevImages: any) => [
  //           ...prevImages,
  //           {
  //             type: files[i].type,
  //             name: files[i].name,
  //             url: URL.createObjectURL(convertedImage),
  //           },
  //         ]);
  //     }
  //   }
  // }

  function deleteImage(fileIndex: number) {
    setImages((prevImages: any) => {
      return prevImages.filter((_: any, i: any) => i !== fileIndex);
    });
  }

  function onDragOver(e: any) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(e: any) {
    e.preventDefault();
    setIsDragging(false);
  }

  // Old Drop function (only png but not showing)

  // function onDrop(e: any) {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const files = e.dataTransfer.files;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       new Compressor(files[i], {
  //         quality: 0.8,
  //         success: (result: any) => {
  //           const reader = new FileReader();
  //           console.log(reader);
  //           reader.readAsDataURL(result);
  //           reader.onload = () => {
  //             // console.log("console log fain: " + reader.result);
  //             setImages((prevImages: any) => [
  //               ...prevImages,
  //               {
  //                 name: files[i].name,
  //                 url: reader.result,
  //               },
  //             ]);
  //           };
  //         },
  //       });
  //     }
  //   }
  // }

  // new ondrop only png works
  // doesnt work well

  function onDrop(e: any) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: any) => e.name === files[i].name)) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          setImages((prevImages: any) => [
            ...prevImages,
            {
              type: files[i].type,
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
            },
          ]);
        };
      }
    }
  }

  function selectFiles() {
    fileInputRef.current.click();
  }

  const sendMessage = (message: string) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        // console.log(response);
        setDescriere(response.data.choices[0].message.content);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        // console.log(error);
      });
  };

  const handleContentChange = (newDescriptrion: string) => {
    // console.log(newDescriptrion) // check description changes
    const descriere1 = newDescriptrion.slice(3);
    const descriere2 = descriere1.slice(0, -4);
    const descriere3 = descriere2.replace(/\r?\n|\r/g, "");
    setDescriere(descriere3);
  };

  // console.log(pasiEnumerati);

  const handleDragDrop = (results: any) => {
    console.log(results);
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedPasiEnumerati = [...pasiEnumerati];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedPas] = reorderedPasiEnumerati.splice(sourceIndex, 1);
      reorderedPasiEnumerati.splice(destinationIndex, 0, removedPas);

      return setPasiEnumerati(reorderedPasiEnumerati);
    }
  };

  // console.log("descriere: "  + descriere) // Check Descriere

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFinalDraft(`
            Fara sa folosesti diacritice, prefa-te ca ai rolul unui inginer in constructii si sef de santier, lucrand in cadrul unei firme renumite constructii, 
            iar impreuna cu echipa ta de muncitori ai realizat o lucrare cu urmatorul nume: ${
              formData.denumire_lucrare
            }.
            Creeaza o descriere in care prezinti lucrarea, intr-un singur paragraf continuu.
            ${
              formData.status === "NU"
                ? 'Te rog ca descrierea sa inceapa cu "S-au continuat lucrarile..." mentionand clar aria si zona in care a fost realizata lucrarea. '
                : "Te rog sa incepi descrierea ca in exemplele de mai jos, aratand clar aria si zona in care a fost realizata lucrarea."
            } 
            Aria va fi: ${formData.aria}, zona va fi: ${formData.zona}
            Pentru realizarea acestiei lucarii ai urmatorit urmatorii pasi: ${pasiEnumerati}, 
            Creeaza un text de maxim ${
              formData.randuri
            } randuri care descrie intregul proces al acestei lucrari pas cu pas, devzolvatat 
            cu terminologia apropriata domeniului constructii, nu include faptul ca esti inginer, nu include faptul ca lucrezi in cadrul 
            unei firme. Te rog sa respecti numarul de randuri si sa nu faci descrierea mai lunga de 250 de cuvinte.
            ${
              formData.detalii.length !== 0
                ? `Te rog sa adaugi ca ${formData.detalii}`
                : ""
            }.
            Te rog sa mentii un ton profesional, prietenos si asemanator cu exemplul de mai jos.
            Te rog totodata sa nu mentionezi performanta muncitorilor, de exemplu te rog sa nu adaugi lucruri precum: "Muncitori au prestat niste servicii extraordinare".
            Important este sa cuprinzi doar gistul lucrarii si nimic altceva.
           
            Pentru un exemplu de structura a acestei descrieri si stilul de compunere, te-as ruga sa urmaresti urmatorul model de exprimare.

            S-au continuat lucrarile de igienizare a pereților interiori de la parterul cladirii “Statie Gratare Dese” din Aria 03, 
            prin efectuarea operatiunilor de aplicare a unui strat de amorsa pentru vopsele lavabile acrilice pe bază de apă și 
            microemulsii, cu mare putere liantă, urmat de aplicarea unei vopsele lavabile acrilice, superlavabile, cu efect mat, 
            care elimină fisurile, garantând o elasticitate optimă și având o rezistenţă ridicată la alge, ciuperci, mucegaiuri 
            şi la agenţii atmosferici. Aplicarea vopselei a fost executata cu ajutorul unor trafaleti cu fir scurt din poliamidă.
        `);
  };

  const handleAddItem = (e: any) => {
    if (pasInput.trim() !== "") {
      setPasiEnumerati((prevItems) => [...prevItems, pasInput]);

      setFormData((prevState: any) => ({
        ...prevState,
        pasi: pasiEnumerati,
      }));

      setPasInput("");
    }
  };

  const stergePas = (elem: any) => {
    for (let i = 0; i < pasiEnumerati.length; i++) {
      if (i === elem) {
        setPasiEnumerati((prevPasi) =>
          prevPasi.filter((pas, index) => index !== elem)
        );
      }
    }
  };

  const handleMovePasDown = (element: number) => {
    const newPasi = [...pasiEnumerati];
    for (let i = 0; i < newPasi.length; i++) {
      if (i === element && i !== newPasi.length - 1) {
        let thirdWheel = newPasi[i + 1];
        newPasi[i + 1] = newPasi[i];
        newPasi[i] = thirdWheel;
      }
    }
    setPasiEnumerati(newPasi);
  };

  const handleMovePasUp = (element: number) => {
    const newPasi = [...pasiEnumerati];
    for (let i = 0; i < newPasi.length; i++) {
      if (i === element && i !== 0) {
        let thirdWheel = newPasi[i - 1];
        newPasi[i - 1] = newPasi[i];
        newPasi[i] = thirdWheel;
      }
    }
    setPasiEnumerati(newPasi);
  };

  return (
    <main className="flex min-h-screen items-center flex-col ">
      <div className="flex w-full bg-white flex-col p-10 rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold  2xl:text-xl text-sm text-red-500">
              Generator Caseta
            </h1>
            <h1 className="font-regular  text-sm text-gray-500">
              Fisa + Raport Caseta
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
              onClick={handleResetareForumlar}
            >
              Resetare
            </button>
            <button
              type="button"
              className="bg-gray-300 xl:flex hidden disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
              onClick={() => {
                setShowFisa(false), setShowRaport(false);
              }}
            >
              Close Previews
            </button>
          </div>
        </div>

        <hr className="w-full border-gray-500 mt-4" />

        <div className="w-full gap-10 flex 2xl:flex-row flex-col">
          <div className="flex flex-col 2xl:w-1/2 w-full h-full mt-[2rem]">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="denumire_lucrare"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Denumire Lucrare</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="denumire_lucrare"
                  type="text"
                  name="denumire_lucrare"
                  value={formData.denumire_lucrare}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Title Lucrare"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              {/* <div className="mt-4">
                <label
                  htmlFor="executant"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Executant</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="executant"
                  type="text"
                  name="executant"
                  value={formData.executant}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Executant"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div> */}

              {/* <div className="mt-4">
                <label
                  htmlFor="reprezentant_anb"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Reprezentant ANB</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="reprezentant_anb"
                  type="text"
                  name="reprezentant_anb"
                  value={formData.reprezentant_anb}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Reprezentant ANB"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div> */}

              {/* Numar Fisa (aparent nu mai este nevoie de el asa ca il comentez)
              <div className="mt-4">
                <label
                  htmlFor="numar_fisa"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Numar Fisa</p>
                  </div>
                </label>
                <input
                  id="numar_fisa"
                  type="text"
                  name="numar_fisa"
                  value={formData.numar_fisa}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Numar Fisa"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full"
                />
              </div> */}

              <div className="mt-4">
                <label htmlFor="data" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Data</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="data"
                  type="text"
                  name="data"
                  value={formData.data}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Data"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className="mt-4">
                <label htmlFor="aria" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Aria</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="aria"
                  type="text"
                  name="aria"
                  value={formData.aria}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Aria"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className="mt-4">
                <label htmlFor="zona" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Zona</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="zona"
                  type="text"
                  name="zona"
                  value={formData.zona}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Zona"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>
              <div className="mt-4 gap-2">
                <div className="flex justify-between">
                  <p className=" text-gray-500 mb-2 font-bold ">
                    Tip Activitate
                  </p>
                  <span className="text-green-500 font-bold text-sm"> * </span>
                </div>

                <div className="flex jutsify-start items-center gap-2">
                  <div className="RADIO_INPUT flex">
                    <input
                      id="corectiv"
                      type="radio"
                      value="Corectiv"
                      name="tip_activitate"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm focus:outline-green-600 p-2"
                    />
                    <label htmlFor="corectiv" className="ml-1 ">
                      Corectiv
                    </label>
                  </div>
                  <div className="RADIO_INPUT flex ml-[2.75rem]">
                    <input
                      id="preventiv"
                      type="radio"
                      value="Preventiv"
                      name="tip_activitate"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="preventiv" className="ml-1">
                      Preventiv
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 gap-2">
                <div className="flex justify-between">
                  <p className=" text-gray-500 mb-2 font-bold ">
                    Lucrare Finalizata
                  </p>
                  <span className="text-green-500 font-bold text-sm"> * </span>
                </div>

                <div className="flex jutsify-start items-center gap-2">
                  <div className="RADIO_INPUT flex">
                    <input
                      id="nefinalizat"
                      type="radio"
                      value="NU"
                      name="status"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="nefinalizat" className="ml-2">
                      NU
                    </label>
                  </div>
                  <div className="RADIO_INPUT flex ml-6">
                    <input
                      id="finalizat"
                      type="radio"
                      value="DA"
                      name="status"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="finalizat" className="ml-1">
                      DA
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="randuri"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Randuri Descriere</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="randuri"
                  type="number"
                  name="randuri"
                  value={formData.randuri}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Prestabilit 10 Randuri"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              {/* 
              Detalii Descriere, i guess still nothing.
              <div className="mt-4">
                <label
                  htmlFor="detalii"
                  className="text-gray-500 mb-2 font-bold "
                >
                  Detalii Descriere
                </label>
                <textarea
                  id="detalii"
                  name="detalii"
                  value={formData.detalii}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Detalii pentru generarea descrierii din fisa"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                />
              </div> */}

              <div className="mt-4 flex w-full 2xl:flex-row flex-col items-end 2xl:gap-6 gap-4">
                <div className="flex flex-col 2xl:w-[80%] w-full">
                  <label
                    htmlFor="pas"
                    className="text-gray-500 mb-2 font-bold "
                  >
                    <div className="flex justify-between">
                      <p>Pasi Descriere Lucrare</p>
                      <span className="text-green-500 font-bold text-sm">
                        {" "}
                      </span>
                    </div>
                  </label>
                  <input
                    id="pas"
                    type="pas"
                    name="pas"
                    value={pasInput}
                    onChange={(e: any) => handleInputChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddItem(e);
                      }
                    }}
                    placeholder="Adauga Pas"
                    className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full"
                  />
                </div>

                <button
                  type="button"
                  disabled={pasInput.length === 0 ? true : false}
                  className="bg-gray-300 hover:bg-green-800 disabled:bg-gray-500 disabled:hover:text-black 2xl:w-[20%] w-full p-2 rounded-lg transition-all hover:text-white duration-100"
                  onClick={(e) => handleAddItem(e)}
                >
                  Adauga Pas
                </button>
              </div>
            </form>
            {/* DRAG AND DROP HERE */}

            <div className="CARD mt-4 overflow-hidden">
              <div className="flex justify-between items-center mb-2 ">
                <h1 className="font-bold text-gray-500">
                  Imagini Raport{" "}
                  <span className="text-red-500"> (OBLIGATORIU .png) </span>
                </h1>
                <button
                  type="button"
                  className="bg-gray-300 flex disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                  onClick={() => {
                    setImages([]);
                  }}
                >
                  Sterge Poze
                </button>
              </div>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className="DRAG_AREA select-none w-full gap-2 h-[10rem] flex-col flex items-center justify-center border-dashed border-4 border-green-700 bg-gray-100"
              >
                {isDragging ? (
                  <></>
                ) : (
                  <>
                    <span className="select-none ml-2">
                      Image Upload (Drop)
                    </span>
                    <button
                      onClick={selectFiles}
                      className="select-none cursor-pointer bg-gray-300 p-1 rounded-lg text-black hover:bg-green-700 hover:text-white transition-all duration-100"
                    >
                      Browse
                    </button>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  className="FILE hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={onFileSelect}
                />
              </div>

              <div className="container relative overflow-y-scroll w-full h-auto flex justify-start items-start flex-wrap max-h-[200px] mt-[10px] gap-4 mb-2">
                {images.map((image: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="image lg:w-[160px] lg:h-[160px] w-[120px] h-[120px] shadow-lg relative"
                    >
                      <span
                        onClick={() => deleteImage(index)}
                        className="delete z-10 absolute w-8 h-8 cursor-pointer top-2 right-2 text-xl bg-white shadow-md flex justify-center items-center rounded-full hover:bg-red-500 transition-all duration-100"
                      >
                        <MdDeleteForever />
                      </span>
                      <img
                        src={image.url}
                        alt={image.name}
                        draggable={false}
                        className="w-full select-none h-full rounded-lg"
                      />
                      {image.type === "image/png" ? (
                        <>
                          <div className="absolute top-2 bg-green-700 text-white font-bold rounded-lg flex gap-1 items-center justify-center shadow uppercase left-2 p-1">
                            PNG <FaRegCheckCircle />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute top-2 bg-red-600 text-white flex justify-center items-center gap-1 font-bold rounded-lg shadow uppercase left-2 p-1">
                            JPG <IoMdCloseCircleOutline />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DRAG AND DROP END HERE */}
          </div>

          <div className="2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-500">Pasi Enumarati</h1>

              {/* PASI */}
              <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable droppableId="GSDAGDSA" type="group">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-3 max-h-[15rem] overflow-y-scroll w-full bg-gray-100 p-2 rounded-sm select-none"
                    >
                      {pasiEnumerati.length == 0 ? "Nu exista pasi." : ""}

                      {pasiEnumerati.map((pas, index) => (
                        <Draggable
                          index={index}
                          key={pas.toString() + index.toString()}
                          draggableId={pas.toString() + index.toString()}
                        >
                          {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className={`flex justify-between hover:rounded-lg hover:shadow-md hover:bg-gray-300 p-1 hover:cursor-move items-center`}
                            >
                              <p className="max-w-[12rem] sm:max-w-[23rem] overflow-x-hidden ">
                                ({index + 1}) {pas}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  className="hover:bg-green-700 hidden sm:block duration-100 text-white rounded-full p-1"
                                  onClick={() => {
                                    handleMovePasUp(index);
                                  }}
                                >
                                  <FaArrowAltCircleUp className="text-2xl text-black" />
                                </button>

                                <button
                                  className=" hover:bg-green-700 hidden sm:block duration-100 text-white rounded-full p-1"
                                  onClick={() => {
                                    handleMovePasDown(index);
                                  }}
                                >
                                  <FaArrowAltCircleDown className="text-2xl text-black" />
                                </button>

                                <button
                                  className="bg-gray-600 hover:bg-rose-700 duration-100 text-white rounded-full p-1"
                                  onClick={() => stergePas(index)}
                                >
                                  <IoMdCloseCircleOutline className="text-2xl" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div className="rezultat flex flex-col gap-2 mt-4">
              <div className="flex justify-between w-full items-center">
                <h1 className="text-gray-500 font-bold">Rezultat Descriere</h1>
                <div className="flex gap-2">
                  <p className="font-bold text-green-500">{copyStatus}</p>
                  <button
                    onClick={handleCopy(descriere)}
                    className=" flex justify-center items-center rounded-sm bg-gray-200 w-6 h-6 hover:shadow-md hover:cursor-pointer transition-all duration-100 active:bg-green-600"
                  >
                    <HiClipboardCopy className="active:bg-green-600 duration-100 transition-all" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full h-auto">
                <div className="w-full">
                  {isLoading === true ? (
                    <div className="flex gap-2">
                      <p className="text-green-600 font-bold animate-pulse">
                        SE GENEREAZA
                      </p>
                      <LoadingAnimation />
                    </div>
                  ) : (
                    <div className="w-full">
                      <Tiptap
                        content={descriere}
                        onChange={(newContent: string) =>
                          handleContentChange(newContent)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex"></div>
              <button
                type="submit"
                className="bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl"
                disabled={readyToRequest === true ? false : true}
                onClick={handleSubmit}
              >
                Generare Descriere
              </button>

              <div className="flex w-full items-center justify-center gap-2">
                <PDFDownloadLink
                  document={<FisaCaseta data={casetaData} />}
                  className="w-1/2"
                  fileName={`${casetaData.data} - Aria ${casetaData.aria} - ${casetaData.denumire_lucrare} ${casetaData.zona} ${casetaData.locaite_specifica}_FISA`.replaceAll(
                    ".",
                    "/"
                  )}
                >
                  {({ loading, error }) =>
                    loading ? (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Loading File
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Fisa PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>

                <PDFDownloadLink
                  document={<RaportCaseta data={casetaData} imagini={images} />}
                  className="w-1/2"
                  fileName={`${casetaData.data} - Aria ${casetaData.aria} - ${casetaData.denumire_lucrare} ${casetaData.zona} ${casetaData.locaite_specifica}_RAPORT`.replaceAll(
                    ".",
                    "/"
                  )}
                >
                  {({ loading, error }) =>
                    loading ? (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Loading File
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Raport PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>

              {/* PDF VIEWER */}
              <div className="md:flex hidden gap-2 w-full">
                <button
                  onClick={() => {
                    setShowFisa(true), setShowRaport(false);
                  }}
                  className="bg-gray-300 xl:flex hidden items-center rounded-lg gap-2 w-1/2 justify-center disabled:bg-gray-500 disabled:hover:text-black hover:bg-green-700 hover:text-white duration-100 transition-all p-2"
                >
                  <Icon icon="solar:document-linear" width="24" height="24" />{" "}
                  Toggle Fisa
                </button>
                <button
                  onClick={() => {
                    setShowRaport(true), setShowFisa(false);
                  }}
                  className="bg-gray-300 xl:flex hidden items-center w-1/2 rounded-lg gap-2 justify-center disabled:bg-gray-500 disabled:hover:text-black hover:bg-green-700 hover:text-white duration-100 transition-all p-2"
                >
                  <Icon
                    icon="material-symbols:folder-outline"
                    width="24"
                    height="24"
                  />
                  Toggle Raport
                </button>
              </div>
              {showFisa === true ? (
                <>
                  <h1 className="font-bold text-gray-500 mt-5">
                    Fisa Industrial (Preview)
                  </h1>
                  <div className="w-full h-[60rem] md:block hidden bg-zinc-500">
                    <PDFViewer
                      height="100%"
                      width="100%"
                      showToolbar={true}
                      children={<FisaCaseta data={casetaData} />}
                    ></PDFViewer>
                  </div>
                </>
              ) : (
                ""
              )}

              {showRaport === true ? (
                <>
                  <h1 className="font-bold text-gray-500 mt-5">
                    Raport Industrial (Preview)
                  </h1>
                  <div className="w-full h-[60rem] md:block hidden bg-zinc-500">
                    <PDFViewer
                      height="100%"
                      width="100%"
                      showToolbar={true}
                      children={
                        <RaportCaseta data={casetaData} imagini={images} />
                      }
                    ></PDFViewer>
                  </div>
                </>
              ) : (
                ""
              )}

              {/* PDF VIEWER END */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
