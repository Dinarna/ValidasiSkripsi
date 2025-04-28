import { axiosPrivate } from "@/axiosConfig";
import { API } from "@/lib/urls";
import axios from "axios";
import cookies from "js-cookie";
import { createContext, ReactNode, useContext, useState } from "react";

type FormProviderProps = {
  children: ReactNode;
};

type FormKuesionerState = {
  nama: string;
  jenisKelamin: string;
  domisili: string;
  keahlian: string;
  keahlianLain?: string;
  jabatan: string;
  jabatanLain?: string;
  institusi: string;
  frekuensiChatbot: string;
  penilaianChatbot: PenilaianChatbot[];
  pertanyaanRefleksi: PertanyaanRefleksi[];
};

type PenilaianChatbot = {
  prompt_pertanyaan: string;
  jawaban_chatbot: string;
  kesesuaian: string;
  kejelasan: string;
  kredibilitas: string;
};

type PertanyaanRefleksi = {
  pertanyaan: string;
  jawaban: string;
};

const FormContext = createContext<
  | {
      formKuesionerState: FormKuesionerState;
      updateFormKuesionerState: (name: string, value: any) => void;
      createKuesioner: () => Promise<any>;
      getKuesionerById: (id: string) => Promise<any>;
      resetForm: () => void;
    }
  | undefined
>(undefined);

export const FormKuesionerProvider = ({ children }: FormProviderProps) => {
  const [formKuesionerState, setFormKuesionerState] =
    useState<FormKuesionerState>({
      nama: "",
      jenisKelamin: "",
      domisili: "",
      keahlian: "",
      keahlianLain: "",
      jabatan: "",
      jabatanLain: "",
      institusi: "",
      frekuensiChatbot: "",
      penilaianChatbot: [],
      pertanyaanRefleksi: [],
    });

  const updateFormKuesionerState = (name: string, value: any) => {
    setFormKuesionerState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createKuesioner = async () => {
    console.log("Membuat kuesioner", formKuesionerState);
    try {
      const response = await axios.post(`http://20.195.9.167:4444/simpan-data`, {
        user_id: cookies.get("user_id"),
        identitas_responden: {
          nama_lengkap: formKuesionerState.nama,
          jenis_kelamin: formKuesionerState.jenisKelamin,
          domisili: formKuesionerState.domisili,
          jenjang_keahlian: formKuesionerState.keahlian,
          jabatan: formKuesionerState.jabatan,
          program_studi: formKuesionerState.institusi,
          frekuensi_penggunaan_chatbot: formKuesionerState.frekuensiChatbot,
        },
        penilaian_chatbot: formKuesionerState.penilaianChatbot,
        pertanyaan_refleksi: formKuesionerState.pertanyaanRefleksi,
      });
      return response;
    } catch (error) {
      console.error("Gagal membuat kuesioner", error);
    }
  };

  const getKuesionerById = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`${API}/kuesioner/${id}`);
      return response;
    } catch (error) {
      console.error("Gagal mengambil kuesioner", error);
    }
  };

  const resetForm = () => {
    setFormKuesionerState({
      nama: "",
      jenisKelamin: "",
      domisili: "",
      keahlian: "",
      jabatan: "",
      institusi: "",
      frekuensiChatbot: "",
      penilaianChatbot: [],
      pertanyaanRefleksi: [],
    });
  };

  return (
    <FormContext.Provider
      value={{
        formKuesionerState,
        updateFormKuesionerState,
        createKuesioner,
        resetForm,
        getKuesionerById,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormKuesionerContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormKuesionerContext harus digunakan dalam FormProvider"
    );
  }
  return context;
};
