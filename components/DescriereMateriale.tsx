"use client";

import { useState, useEffect } from "react";
import { formData } from "@/types/types";
import axios from "axios";
import LoadingAnimation from "@/components/LoadingAnimation";
import { HiClipboardCopy } from "react-icons/hi";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Tiptap from "./Tiptap";

export default function DescriereMateriale() {
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

  const [formData, setFormData] = useState<formData>({
    titlu_lucrare: "",
    muncitori: 0, // This can be removed from the type definition as well
    randuri: 10, // This can be removed from the type definition as well
    pasi: [], // This can be removed from the type definition as well
    detalii: "",
  });

  const [copyStatus, setCopyStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [descriere, setDescriere] = useState<string>("");
  const [finalDraft, setFinalDraft] = useState<string>("");
  const [readyToRequest, setReadyToRequest] = useState<boolean>(false);

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

  const handleValidation = () => {
    if (formData.titlu_lucrare.length > 0) {
      setReadyToRequest(true);
    } else setReadyToRequest(false);
  };

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      model: "gpt-4o",
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
    const descriere1 = newDescriptrion.slice(3);
    const descriere2 = descriere1.slice(0, -4);
    setDescriere(descriere2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFinalDraft(`
      Prefa-te ca ai rolul unui inginer in constructii si sef de santier si ai nevoie sa faci anumite rapoarte in care sa prezinti
      caracteristicile unui anumit material. Acest material se numeste ${
        formData.titlu_lucrare
      }
      Creeaza un text, in limba romana, de 5,000 de caractere, impartele in paragrafe, doua pagini A4, in care sa prezinti fiecare 
      caracteristica a materialului si fiecare folosinta a lui.

      Te rog sa nu incluzi elemente de markdown, doresc ca textul sa fie plain.

      Asigura-te ca menti un ton profesional, ca diacriticele sunt incluse si ca textul este perfect corect gramatical.
      ${
        formData.detalii.length > 0
          ? `Include urmatoarele detalii intr-un mod cursiv si bine compus: ${formData.detalii}`
          : ""
      }
    `);
  };

  return (
    <main className="flex min-h-screen items-center flex-col">
      <div className="flex w-full bg-white flex-col p-10 rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold 2xl:text-xl text-sm">
              Descrieri Materiale (MCA) - aka Costel
            </h1>
            <h1 className="font-regular text-sm text-gray-500">
              Generator Descriere Materiale
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
                    <p>Nume Material</p>
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
                  htmlFor="detalii"
                  className="text-gray-500 mb-2 font-bold"
                >
                  Alte Detalii
                </label>
                <textarea
                  id="detalii"
                  name="detalii"
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Detalii"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                />
              </div>
            </form>
          </div>

          <div className="2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
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
                  {isLoading ? (
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
              <button
                type="submit"
                className="bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl"
                disabled={!readyToRequest}
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
