"use client"

// chestii de reparat: stergere pasi, copy to clipboard properly, add detalii

import {useState} from 'react'
import { formData } from '@/types/types';
import Link from 'next/link'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

export default function Home() {

  const [copiedText, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopyStatus('Text Copiat!')
      })
      .catch(error => {
        setCopyStatus('Textul nu a putut fi copiat.')
      })
  }
  
  const [pasiEnumerati, setPasiEnumerati] = useState<string[]>([])
  const [formData, setFormData] = useState<formData>({
    titlu_lucrare: "",
    muncitori: 0,
    randuri: 10,
    pasi: [],
    detalii: ""
  });
  
  const [existPasi, setExistPasi] = useState<boolean>(false)
  const [pasInput, setPasInput] = useState<string>('')
  const [finalDraft, setFinalDraft] = useState<string>('')
  const [copyStatus, setCopyStatus] = useState<string>('');

  const handleInputChange = (e: any) => {
    setPasInput(e.target.value);
  }

  const stergePas = (elem: any) => {
    for (let i = 0; i < pasiEnumerati.length; i++) {
      if(i === elem) {
        setPasiEnumerati(prevPasi => prevPasi.filter((pas, index) => index !== elem))
      }
    }
  }

  const updateForm = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(existPasi === true) {
      setFinalDraft(`
        Prefa-te ca ai rolul unui inginer in constructii si sef de santier, lucrand in cadrul unei firme renumite constructii, 
        iar impreuna cu echipa ta formata din ${formData.muncitori} muncitori ai realizat o lucrare cu urmatorul nume: ${formData.titlu_lucrare}.  
        Pentru realizarea acestiei lucarii ai urmatorit urmatorii pasi: ${pasiEnumerati}, 
        Creeaza un text de maxim ${formData.randuri} randuri care descrie intregul proces al acestei lucrari pas cu pas, devzolvatat 
        cu terminologia apropriata domeniului constructii, nu include faptul ca esti inginer, nu include faptul ca lucrezi in cadrul 
        unei firme. ${formData.detalii.length !== 0 ? `Te rog sa adaugi ca ${formData.detalii}` : ''}
    `)
    }
    else if(existPasi === false) {
      setFinalDraft(`
      Prefa-te ca ai rolul unui inginer in constructii si sef de santier, lucrand in cadrul unei firme renumite constructii, iar impreuna 
      cu echipa ta formata din ${formData.muncitori} ai realizat o lucrare cu urmatorul nume: ${formData.titlu_lucrare}.  Pentru realizarea acestei 
      lucrari s-au urmarit anumiti pasi, foloseste-ti cunostintele de inginer si afiseaza in ordine cronologica pasii realizarii lucrarii.
      Creeaza un text de maxim ${formData.randuri} randuri care descrie intregul proces al acestei lucrari pas cu pas, devzolvatat cu terminologia apropriata
      domeniului constructii, nu include faptul ca esti inginer, nu include faptul ca lucrezi in cadrul unei firme. 
      ${formData.detalii.length !== 0 ? `Te rog sa adaugi ca ${formData.detalii}` : ''}
  `)
  }
  }

  const handleAddItem = (e: any) => {
    if (pasInput.trim() !== '') {
      setPasiEnumerati((prevItems) => [...prevItems, pasInput]);

      setFormData((prevState) => ({
        ...prevState,
        pasi: pasiEnumerati
      }));

      setPasInput(''); // Clear the input field after adding the item
    }
};

  return (
    <main className="flex min-h-screen items-center justify-center flex-col font-[Poppins]">
        <div className = "flex 2xl:w-3/4 w-full flex-col p-10 rounded-lg shadow-md">
          <div className="flex w-full justify-between items-center">
            <div className = "flex flex-col">
              <h1 className = "font-bold font-[Poppins] 2xl:text-xl text-sm">Generator Descrieri Lucrari</h1>
              <h1 className = "font-regular font-[Poppins] text-sm text-gray-500">Creat de Neague Eduard</h1>
            </div>
              <img
                src = "/DAMINA_LOGO.png"
                alt = "damina logo"
                className = "select-none h-8 w-20"
                draggable = {false}
              />
          </div>

          <hr className = "w-full border-gray-500 mt-4"/>
          
          <div className = "w-full gap-10 flex 2xl:flex-row flex-col">

            <div className = "flex flex-col 2xl:w-1/2 w-full h-full mt-[2rem]">
            <form onSubmit = {handleSubmit}>

              <div>
                <label 
                  htmlFor = "titlu_lucrare"
                  className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                >
                  Titlu Lucrare
                </label>
                <input 
                  id = "titlu_lucrare"
                  type = "text" 
                  name = "titlu_lucrare"
                  onChange = {(e: any) => updateForm(e)}
                  placeholder = "Title Lucrare"
                  className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className = "mt-4">
                <label 
                  htmlFor = "muncitori"
                  className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                >
                  Numar Muncitori
                </label>
                <input 
                  id = "muncitori"
                  type = "number" 
                  name = "muncitori"
                  onChange = {(e: any) => updateForm(e)}
                  placeholder = "Numar Muncitori"
                  className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className = "mt-4">
                <label 
                  htmlFor = "randuri"
                  className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                >
                  Randuri
                </label>
                <input 
                  id = "randuri"
                  type = "number" 
                  name = "randuri"
                  onChange = {(e: any) => updateForm(e)}
                  placeholder = "Randuri (Recomandat 10)"
                  className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>

              <div className = "mt-4">
                <label 
                  htmlFor = "detalii"
                  className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                >
                  Detalii
                </label>
                <textarea 
                  id = "detalii"
                  name = "detalii"
                  onChange = {(e: any) => updateForm(e)}
                  placeholder = "Detalii"
                  className = "rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                />
              </div>

              <div className = "mt-4">
                <label 
                  htmlFor = "pasi"
                  className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                >
                  Pasi
                </label>
                <input 
                  id = "pasi"
                  type = "checkbox" 
                  name = "pasi"
                  onChange = {() => {setExistPasi(prevPasi => !prevPasi), setPasiEnumerati([])}}
                  placeholder = "pasi"
                  className = " w-[20px] bg-green-800 "
                />
              </div>
              {existPasi === false ? (
                <div>
                  
                </div>
              ) 
              :
              (
                
                <div className = "mt-4 flex w-full 2xl:flex-row flex-col items-end 2xl:gap-6 gap-4">
                  <div className = "flex flex-col 2xl:w-[80%] w-full">
                    <label 
                      htmlFor = "pas"
                      className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                      Adauga Pas
                    </label>
                    <input 
                      id = "pas"
                      type = "pas" 
                      name = "pas"
                      value = {pasInput}
                      onChange = {(e: any) => handleInputChange(e)}
                      onKeyDown={(e) => { 
                        if (e.key === "Enter") { 
                            handleAddItem(e)
                        } 
                      }} 
                      placeholder = "Adauga Pas"
                      className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full"
                    />
                  </div>
               
                    <button 
                    type = "button" 
                    disabled = {pasInput.length === 0 ? true : false}
                    className = "bg-gray-300 hover:bg-green-800 disabled:bg-gray-500 disabled:hover:text-black 2xl:w-[20%] w-full p-2 rounded-lg transition-all hover:text-white duration-100" 
                    onClick = {(e) => handleAddItem(e)}
                  >
                    Adauga Pas
                  </button>
                  
                </div>
               
               
              )}
            </form>
          </div>

          <div className = "2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
            <div className = "flex flex-col">
                  <h1 className = "font-bold text-gray-500">Pasi Enumarati</h1>
                  <div className = "flex flex-col gap-3 max-h-[15rem] overflow-y-scroll w-full bg-gray-100 p-2 rounded-sm">
                    {pasiEnumerati.length == 0 ? 'Nu exista pasi.' : ''}
                    {pasiEnumerati.map((pas, i) => (
                      <div key = {i} className = "flex justify-between">
                          <p>{i+1}. {pas}</p>
                          <button 
                            className = "bg-gray-600 hover:bg-rose-700 duration-100 text-white rounded-lg p-1"
                            onClick = {() => stergePas(i)}
                          >
                            Sterge
                          </button>
                      </div>
                    ))}

                  </div>
                </div>

                <div className = "rezultat flex flex-col gap-2 mt-4">
                  <h1 className = "text-gray-500 font-bold">Rezultat</h1>
                  <p>{ finalDraft }</p>
                  <button type = "submit" className = "bg-gray-300 mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl" onClick = {handleSubmit}>
                      Submit
                  </button>
                  <Link onClick = {handleCopy(finalDraft)} href = "https://chat.openai.com/" target= "_blank" className = "bg-gray-300 mt-4 flex justify-center items-center hover:bg-green-800 w-full p-2 rounded-lg transition-all hover:text-white duration-100">
                      Copy + ChatGPT
                  </Link>
                  {copyStatus}
                </div>
          </div>

          </div>
         
        </div>
    </main>
  );
}
