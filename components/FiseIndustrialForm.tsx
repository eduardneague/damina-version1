"use client"

import { useState, useEffect } from 'react'

import { fisaIndustrialType } from '@/types/types';
import LoadingAnimation from '@/components/LoadingAnimation';

import axios from 'axios'
import { HiClipboardCopy } from "react-icons/hi";
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

import Tiptap from '@/components/Tiptap'

export default function FiseIndustrialForm() {
    const [copiedText, copy] = useCopyToClipboard()
    const [pasiEnumerati, setPasiEnumerati] = useState<string[]>([])
    const [formData, setFormData] = useState<fisaIndustrialType>({
        denumire_lucrare: "",
        numar_fisa: "",
        randuri: 10,
        pasi: [],
        detalii: "",
        aria: "",
        zona: "",
        executant: "",
        data: "",
        tip_activitate: "Corectiv",
        reprezentant_anb: "",
        status: "DA"
    });
    const [pasInput, setPasInput] = useState<string>('')
    const [finalDraft, setFinalDraft] = useState<string>('')
    const [copyStatus, setCopyStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [descriere, setDescriere] = useState<string>('')
    const [readyToRequest, setReadyToRequest] = useState<boolean>(false)

    // const jsonData = {
    //     "denumire_lucrare": formData.denumire_lucrare,
    //     "aria": formData.aria,
    //     "zona": formData.zona,
    //     "tip_activitate": formData.tip_activitate,
    //     "descriere": descriere,
    //     "status": formData.status,
    //     "executant": formData.executant,
    //     "reprezentant_anb": formData.reprezentant_anb,
    //     "data": formData.data,
    //     "numar_fisa": formData.numar_fisa,
    // }

    useEffect(() => {
        handleValidation()
    }, [formData])

    useEffect(() => {
        if(finalDraft.length > 10) {
          sendMessage(finalDraft)
          setReadyToRequest(false)
          setTimeout(() => {
            setReadyToRequest(true)
          }, 5000)
          setFinalDraft('')
        }
      }, [finalDraft])

    const handleInputChange = (e: any) => {
        setPasInput(e.target.value);
    }

    const handleCopy = (text: string) => () => {
        copy(text)
        .then(() => {
            setCopyStatus('Text Copiat!')
            setTimeout(() => {
            setCopyStatus('')
            }, 650)
        })
        .catch((error: any) => {
            setCopyStatus('Textul nu a putut fi copiat.')
            setTimeout(() => {
            setCopyStatus('')
            }, 650)
        })
    }
    
    const handleValidation = () => {
        if(formData.denumire_lucrare.length > 0 
            && formData.pasi.length > 0 
            && formData.executant.length > 0
            && formData.data.length > 0
            && formData.aria.length > 0
            && formData.zona.length > 0){
        setReadyToRequest(true)
        }
        else setReadyToRequest(false)
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

    const sendMessage = (message: string) => {
        const url = 'https://api.openai.com/v1/chat/completions'
        const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        }

        const data = {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}]
        }

        setIsLoading(true)
        axios.post(url, data, {headers: headers})
        .then((response) => {
        console.log(response)
        setDescriere(response.data.choices[0].message.content)
        setIsLoading(false)
        })
        .catch((error: any) => {
        setIsLoading(false)
        console.log(error)
        })
    }

    const handleContentChange = (newDescriptrion: string) => {
        console.log(newDescriptrion)
        const descriere1 = newDescriptrion.slice(3)
        const descriere2 = descriere1.slice(0, -4)
        setDescriere(descriere2)
    }

    // console.log("descriere: "  + descriere) // Check Descriere

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFinalDraft(`
        Prefa-te ca ai rolul unui inginer in constructii si sef de santier, lucrand in cadrul unei firme renumite constructii, 
        iar impreuna cu echipa ta de muncitori ai realizat o lucrare cu urmatorul nume: ${formData.denumire_lucrare}.  
        Pentru realizarea acestiei lucarii ai urmatorit urmatorii pasi: ${pasiEnumerati}, 
        Creeaza un text de maxim ${formData.randuri} randuri care descrie intregul proces al acestei lucrari pas cu pas, devzolvatat 
        cu terminologia apropriata domeniului constructii, nu include faptul ca esti inginer, nu include faptul ca lucrezi in cadrul 
        unei firme. Te rog sa respecti numarul de randuri si sa nu faci descrierea mai lunga de 250 de cuvinte.
        Te rog sa tii cont si de urmatoarele detalii: ${formData.detalii.length !== 0 ? `Te rog sa adaugi ca ${formData.detalii}` : ''}.
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
        `)
    }

    const handleAddItem = (e: any) => {
        if (pasInput.trim() !== '') {
        setPasiEnumerati((prevItems) => [...prevItems, pasInput]);

        setFormData((prevState) => ({
            ...prevState,
            pasi: pasiEnumerati
        }));

        setPasInput(''); 
        }
    };


    return (
        <main className="flex min-h-screen items-center flex-col font-[Poppins]">
            <div className = "flex w-full bg-white flex-col p-10 rounded-lg">
            <div className="flex w-full justify-between items-center">
                <div className = "flex flex-col">
                <h1 className = "font-bold font-[Poppins] 2xl:text-xl text-sm">Fise Industrial</h1>
                <h1 className = "font-regular font-[Poppins] text-sm text-gray-500">Generator Fise Industrial</h1>
                </div>
            </div>

            <hr className = "w-full border-gray-500 mt-4"/>
            
            <div className = "w-full gap-10 flex 2xl:flex-row flex-col">

                <div className = "flex flex-col 2xl:w-1/2 w-full h-full mt-[2rem]">
                <form onSubmit = {handleSubmit}>

                <div>
                    <label 
                    htmlFor = "denumire_lucrare"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Denumire Lucrare</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "denumire_lucrare"
                    type = "text" 
                    name = "denumire_lucrare"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Title Lucrare"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "executant"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Executant</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "executant"
                    type = "text" 
                    name = "executant"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Executant"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "reprezentant_anb"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Reprezentant ANB</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "reprezentant_anb"
                    type = "text" 
                    name = "reprezentant_anb"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Reprezentant ANB"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "numar_fisa"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Numar Fisa</p>
                    </div>
                    </label>
                    <input 
                    id = "numar_fisa"
                    type = "text" 
                    name = "numar_fisa"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Numar Fisa"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full"
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "data"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Data</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "data"
                    type = "text" 
                    name = "data"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Data"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "aria"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Aria</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "aria"
                    type = "text" 
                    name = "aria"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Aria"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "zona"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Zona</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "zona"
                    type = "text" 
                    name = "zona"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Zona"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4 gap-2">
                    <div className = "flex justify-between">
                        <p className = " text-gray-500 mb-2 font-bold font-[Poppins]">Tip Activitate</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>

                    <div className = "flex jutsify-start items-center gap-2">
                        <div className = "RADIO_INPUT flex">
                            <input 
                                id = "corectiv"
                                type = "radio"
                                value = "Corectiv"
                                name = "tip_activitate"
                                onChange = {(e: any) => updateForm(e)}
                                className = "rounded-sm focus:outline-green-600 p-2"
                            />
                            <label htmlFor="corectiv" className = "ml-1 ">Corectiv</label>
                        </div>
                        <div className = "RADIO_INPUT flex ml-[2.75rem]">
                            <input 
                                id = "preventiv"
                                type = "radio"
                                value = "Preventiv"
                                name = "tip_activitate"
                                onChange = {(e: any) => updateForm(e)}
                                className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                            />
                            <label htmlFor="preventiv" className = "ml-1">Preventiv</label>
                        </div>
                    </div>
                </div>

                <div className = "mt-4 gap-2">
                    <div className = "flex justify-between">
                        <p className = " text-gray-500 mb-2 font-bold font-[Poppins]">Lucrare Finalizata</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>

                    <div className = "flex jutsify-start items-center gap-2">
                        <div className = "RADIO_INPUT flex">
                            <input 
                                id = "nefinalizat"
                                type = "radio"
                                value = "NU"
                                name = "status"
                                onChange = {(e: any) => updateForm(e)}
                                className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                            />
                            <label htmlFor="nefinalizat"  className = "ml-2">NU</label>
                        </div>
                        <div className = "RADIO_INPUT flex ml-6">
                            <input 
                                id = "finalizat"
                                type = "radio"
                                value = "DA"
                                name = "status"
                                onChange = {(e: any) => updateForm(e)}
                                className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                            />
                            <label htmlFor="finalizat"  className = "ml-1">DA</label>
                        </div>
                    </div>
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "randuri"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    <div className = "flex justify-between">
                        <p>Randuri Descriere</p>
                        <span className = "text-green-500 font-bold text-sm"> * </span>
                    </div>
                    </label>
                    <input 
                    id = "randuri"
                    type = "number" 
                    name = "randuri"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Prestabilit 10 Randuri"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                    />
                </div>

                <div className = "mt-4">
                    <label 
                    htmlFor = "detalii"
                    className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                    >
                    Detalii Descriere
                    </label>
                    <textarea 
                    id = "detalii"
                    name = "detalii"
                    onChange = {(e: any) => updateForm(e)}
                    placeholder = "Detalii pentru generarea descrierii din fisa"
                    className = "rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                    />
                </div>

                    
                    <div className = "mt-4 flex w-full 2xl:flex-row flex-col items-end 2xl:gap-6 gap-4">
                    <div className = "flex flex-col 2xl:w-[80%] w-full">
                        <label 
                        htmlFor = "pas"
                        className = "text-gray-500 mb-2 font-bold font-[Poppins]"
                        >
                        <div className = "flex justify-between">
                        <p>Pasi Descriere Lucrare</p>
                        <span className = "text-green-500 font-bold text-sm">  </span>
                        </div>
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
                </form>
            </div>
            
            <div className = "2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
                <div className = "flex flex-col">
                    <h1 className = "font-bold text-gray-500">Pasi Enumarati</h1>
                    <div className = "flex flex-col gap-3 max-h-[15rem] overflow-y-scroll w-full bg-gray-100 p-2 rounded-sm select-none">
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
                    <div className = "flex justify-between w-full items-center">
                        <h1 className = "text-gray-500 font-bold">Rezultat Descriere</h1>
                        <div className = "flex gap-2">
                        <p className = "font-bold text-green-500">{copyStatus}</p>
                        <button 
                            onClick = {handleCopy(descriere)}
                            className = " flex justify-center items-center rounded-sm bg-gray-200 w-6 h-6 hover:shadow-md hover:cursor-pointer transition-all duration-100 active:bg-green-600"
                            >
                            <HiClipboardCopy className = "active:bg-green-600 duration-100 transition-all"/>
                        </button>
                        </div>
                    </div>
                    <div className = "flex items-center justify-center w-full h-auto">
                        <div className = "w-full">{ isLoading === true ? (
                            <div className = "flex gap-2">
                            <p className = "text-green-600 font-bold animate-pulse">SE GENEREAZA</p>
                            <LoadingAnimation/>
                        </div>
                        ) : 
                       <div className = "w-full">
                        <Tiptap
                            content = { descriere }
                            onChange = {(newContent: string) => handleContentChange(newContent)}
                        />
                       </div> 
                        }
                        </div>
                    </div>
                    <div className = "flex">
                    </div>
                    <button 
                        type = "submit" 
                        className = "bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl" 
                        disabled = {readyToRequest === true ? false : true}
                        onClick = {handleSubmit}
                    >
                        Genereaza
                    </button>
                    <button 
                        type = "button" 
                        className = "bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-green-800 text-black duration-100 hover:text-white rounded-xl" 
                        disabled = {descriere.length > 0 ? false : true}
                        onClick = {() => console.log('generate document')}
                    >
                        Genereaza Document
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </main>
    );
    }
