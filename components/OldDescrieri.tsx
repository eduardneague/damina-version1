"use client";

import { useState, useEffect } from "react";
import { formData } from "@/types/types";
import axios from "axios";
import LoadingAnimation from "@/components/LoadingAnimation";
import { HiClipboardCopy } from "react-icons/hi";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Tiptap from "./Tiptap";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function OldDescrieri() {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopyStatus("Text Copiat!");
        setTimeout(() => {
          setCopyStatus("");
        }, 2000);
      })
      .catch((error: any) => {
        setCopyStatus("Textul nu a putut fi copiat.");
        setTimeout(() => {
          setCopyStatus("");
        }, 2000);
      });
  };

  const [pasiEnumerati, setPasiEnumerati] = useState<string[]>([]);
  const [formData, setFormData] = useState<formData>({
    titlu_lucrare: "",
    muncitori: 0,
    randuri: 10,
    pasi: [],
    detalii: "",
  });

  const [pasInput, setPasInput] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [descriere, setDescriere] = useState<string>("");
  const [finalDraft, setFinalDraft] = useState<string>("");
  const [readyToRequest, setReadyToRequest] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which step to edit
  const [editPas, setEditPas] = useState<string>(""); // The edited value of the selected step
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

  const handleValidation = () => {
    if (
      formData.titlu_lucrare.length > 0 &&
      (formData.randuri != 0 || formData.randuri != null) &&
      formData.pasi.length > 0
    ) {
      setReadyToRequest(true);
    } else setReadyToRequest(false);
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

  const updateForm = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
        console.log(response);
        setDescriere(response.data.choices[0].message.content);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleContentChange = (newDescriptrion: string) => {
    // console.log(newDescriptrion) //  check description changes
    const descriere1 = newDescriptrion.slice(3);
    const descriere2 = descriere1.slice(0, -4);
    setDescriere(descriere2);
  };

  const handleEditPas = (index: number) => {
    setEditIndex(index);
    setEditPas(pasiEnumerati[index]); // Set current step text for editing
  };

  const handleUpdatePas = () => {
    if (editIndex !== null && editPas.trim() !== "") {
      const updatedPasi = [...pasiEnumerati];
      updatedPasi[editIndex] = editPas; // Update the specific step
      setPasiEnumerati(updatedPasi);
      setEditIndex(null); // Clear the edit mode
      setEditPas(""); // Clear the input
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
    console.log(pasiEnumerati);
  };

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdatePas();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFinalDraft(`
        Prefa-te ca ai rolul unui inginer in constructii si sef de santier, lucrand in cadrul unei firme renumite constructii, 
        iar impreuna cu echipa ta formata din ${
          formData.muncitori
        } muncitori ai realizat o lucrare cu urmatorul nume: ${
      formData.titlu_lucrare
    }.  
        Pentru realizarea acestiei lucarii ai urmatorit urmatorii pasi: ${pasiEnumerati}, 
        Creeaza un text de maxim ${
          formData.randuri
        } randuri care descrie intregul proces al acestei lucrari pas cu pas, devzolvatat 
        cu terminologia apropriata domeniului constructii, nu include faptul ca esti inginer, nu include faptul ca lucrezi in cadrul 
        unei firme. Te rog sa respecti numarul de randuri si sa nu faci descrierea mai lunga de 250 de cuvinte.
        Te rog sa tii cont si de urmatoarele detalii: ${
          formData.detalii.length !== 0
            ? `Te rog sa adaugi ca ${formData.detalii}`
            : ""
        }.
        Te rog sa mentii un ton profesional, dar si prietenos.

        Pentru un exemplu de structura a acestei descrieri te-as ruga sa urmaresti urmatorul model de exprimare.

        S-au continuat lucrarile de igienizare a pereților interiori de la parterul cladirii “Statie Gratare Dese” din Aria 03, 
        prin efectuarea operatiunilor de aplicare a unui strat de amorsa pentru vopsele lavabile acrilice pe bază de apă și 
        microemulsii, cu mare putere liantă, urmat de aplicarea unei vopsele lavabile acrilice, superlavabile, cu efect mat, 
        care elimină fisurile, garantând o elasticitate optimă și având o rezistenţă ridicată la alge, ciuperci, mucegaiuri 
        şi la agenţii atmosferici. Aplicarea vopselei a fost executata cu ajutorul unor trafaleti cu fir scurt din poliamidă.

        Uite un alt exemplu:

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

      setFormData((prevState) => ({
        ...prevState,
        pasi: pasiEnumerati,
      }));
      setPasInput("");
    }
  };

  return (
    <main className="flex min-h-screen items-center flex-col">
      <div className="flex w-full bg-white flex-col p-10 rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold 2xl:text-xl text-sm">Descrieri Lucrari</h1>
            <h1 className="font-regular text-sm text-gray-500">
              Generator Descrieri Lucrari
            </h1>
          </div>
        </div>

        <hr className="w-full border-gray-500 mt-4" />

        <div className="w-full gap-10 flex 2xl:flex-row flex-col">
          <div className="flex flex-col 2xl:w-1/2 w-full h-full mt-[2rem]">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="titlu_lucrare"
                  className="text-gray-500 mb-2 font-bold"
                >
                  <div className="flex justify-between">
                    <p>Titlu Lucrare</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="titlu_lucrare"
                  type="text"
                  name="titlu_lucrare"
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Title Lucrare"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="muncitori"
                  className="text-gray-500 mb-2 font-bold"
                >
                  <div className="flex justify-between">
                    <p>Numar Muncitori</p>
                  </div>
                </label>
                <input
                  id="muncitori"
                  type="number"
                  name="muncitori"
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Numar Muncitori"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="randuri"
                  className="text-gray-500 mb-2 font-bold"
                >
                  <div className="flex justify-between">
                    <p>Randuri</p>
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
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Randuri (Recomandat 10)"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="detalii"
                  className="text-gray-500 mb-2 font-bold"
                >
                  Detalii
                </label>
                <textarea
                  id="detalii"
                  name="detalii"
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Detalii"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                />
              </div>
              <div className="mt-4 flex w-full 2xl:flex-row flex-col items-end 2xl:gap-6 gap-4">
                <div className="flex flex-col 2xl:w-[80%] w-full">
                  <label htmlFor="pas" className="text-gray-500 mb-2 font-bold">
                    <div className="flex justify-between">
                      <p>Adauga Pas</p>
                      <span className="text-green-500 font-bold text-sm">
                        {" "}
                        *{" "}
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
          </div>

          <div className="2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-500">Pasi Enumarati</h1>

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
                              className="flex justify-between hover:rounded-lg hover:shadow-md hover:bg-gray-300 p-1 hover:cursor-move items-center"
                            >
                              <p className="max-w-[12rem] sm:max-w-[23rem] overflow-x-hidden ">
                                <span className="font-bold">{index + 1}) </span>
                                {pas}
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

                                {/* Edit Button */}
                                <button
                                  className="bg-blue-900 text-white p-1 rounded-md"
                                  onClick={() => handleEditPas(index)}
                                >
                                  Edit
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

              {/* Editing Step */}
              {editIndex !== null && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={editPas}
                    onChange={(e) => setEditPas(e.target.value)}
                    onKeyDown={handleKeyDown} // Add this event handler
                    className="w-full p-2 border border-gray-400 rounded-md"
                  />
                  <button
                    onClick={handleUpdatePas}
                    className="bg-blue-900 text-white p-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>

            <div className="rezultat flex flex-col gap-2 mt-4">
              <div className="flex justify-between w-full items-center">
                <h1 className="text-gray-500 font-bold">Rezultat</h1>
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
                    <>
                      <div className="w-full">
                        <Tiptap
                          content={descriere}
                          onChange={(newContent: string) =>
                            handleContentChange(newContent)
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl"
                disabled={readyToRequest === true ? false : true}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Genereaza
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
