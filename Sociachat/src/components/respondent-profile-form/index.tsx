import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { useFormKuesionerContext } from "@/hooks/kuesionerContext";
import { CONTENT_CHAT_BOT } from "@/types/constantLabelSidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import cookies from "js-cookie";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";

const formSchema = z
  .object({
    nama: z.string().min(1, { message: "Nama harus diisi" }),
    jenisKelamin: z.enum(["laki", "perempuan"], {
      required_error: "Pilih jenis kelamin",
    }),
    domisili: z.string().min(1, { message: "Kota/Kabupaten harus diisi" }),
    keahlian: z.enum(
      [
        "politik internasional",
        "linguistik forensik",
        "hukum perdata",
        "teknologi ai",
        "Lainnya",
      ],
      {
        required_error: "Pilih Bidang keahlian",
      }
    ),
    keahlianLainnya: z.string().optional(),
    jabatanLainnya: z.string().optional(),
    institusi: z
      .string()
      .min(1, { message: "Institusi atau organisasi harus diisi" }),
    jabatan: z.enum(
      [
        "Dosen",
        "Peneliti",
        "Praktisi",
        "Konsultan",
        "Profesional Industri",
        "Lainnya",
      ],
      {
        required_error: "Pilih jabatan",
      }
    ),
    frekuensiChatbot: z.enum(
      [
        "Setiap hari",
        "Beberapa kali seminggu",
        "Beberapa kali sebulan",
        "Jarang",
        "Tidak pernah",
      ],
      {
        required_error: "Pilih frekuensi penggunaan",
      }
    ),
  })
  .refine((data) => data.jabatan !== "Lainnya" || data.jabatanLainnya, {
    message: "Harap isi jabatan lainnya",
    path: ["jabatanLainnya"],
  })
  .refine((data) => data.keahlian !== "Lainnya" || data.keahlianLainnya, {
    message: "Harap isi keahlian lainnya",
    path: ["keahlianLainnya"],
  });
type FormSchema = z.infer<typeof formSchema>;

const genders = [
  { value: "laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
];

const keahlian = [
  { value: "politik internasional", label: "Politik Internasional" },
  { value: "linguistik forensik", label: "Linguistik Forensik" },
  { value: "hukum perdata", label: "Hukum Perdata" },
  { value: "teknologi ai", label: "Teknologi AI" },
  { value: "Lainnya", label: "Lainnya" },
];

const jabatan = [
  { value: "Dosen", label: "Dosen" },
  { value: "Peneliti", label: "Peneliti" },
  { value: "Praktisi", label: "Praktisi" },
  { value: "Konsultan", label: "Konsultan" },
  { value: "Profesional Industri", label: "Profesional Industri" },
  { value: "Lainnya", label: "Lainnya" },
];

const chatbotFrequency = [
  { value: "Setiap hari", label: "Setiap hari" },
  { value: "Beberapa kali seminggu", label: "Beberapa kali seminggu" },
  { value: "Beberapa kali sebulan", label: "Beberapa kali sebulan" },
  { value: "Jarang", label: "Jarang" },
  { value: "Tidak pernah", label: "Tidak pernah" },
];

type RespondentProfileFormProps = {
  onNextStep: () => void;
  onPrevStep?: () => void;
};

const RespondentProfileForm: React.FC<RespondentProfileFormProps> = ({
  onNextStep,
  onPrevStep,
}) => {
  const {
    formKuesionerState,
    updateFormKuesionerState,
    createKuesioner,
    resetForm,
  } = useFormKuesionerContext();
  const { setActive } = useAnalysis();

  const jabatanOptions = jabatan.map((j) => j.value);
  const storedJabatan = formKuesionerState.jabatan;
  const isJabatanLainnya =
    storedJabatan && !jabatanOptions.includes(storedJabatan);

  const keahlianOptions = keahlian.map((k) => k.value);
  const storedKeahlian = formKuesionerState.keahlian;
  const isKeahlianLainnya =
    storedKeahlian && !keahlianOptions.includes(storedKeahlian);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: cookies.get("nama") || "",
      jenisKelamin: formKuesionerState.jenisKelamin as
        | "laki"
        | "perempuan"
        | undefined,
      domisili: formKuesionerState.domisili || "",
      keahlian: isKeahlianLainnya
        ? "Lainnya"
        : (formKuesionerState.keahlian as any),
      keahlianLainnya: isKeahlianLainnya
        ? storedKeahlian
        : formKuesionerState.keahlianLain || "",
      jabatan: isJabatanLainnya
        ? "Lainnya"
        : (formKuesionerState.jabatan as any),
      jabatanLainnya: isJabatanLainnya
        ? storedJabatan
        : formKuesionerState.jabatanLain || "",
      institusi: formKuesionerState.institusi || "",
      frekuensiChatbot: formKuesionerState.frekuensiChatbot as
        | "Setiap hari"
        | "Beberapa kali seminggu"
        | "Beberapa kali sebulan"
        | "Jarang"
        | "Tidak pernah"
        | undefined,
    },
  });

  useEffect(() => {
    if (formKuesionerState.frekuensiChatbot != "") {
      submitKuesioner();
    }
  }, [formKuesionerState]);

  const submitKuesioner = async () => {
    try {
      await createKuesioner();
      setActive(CONTENT_CHAT_BOT);
      toast({
        title: "Data Kuesioner Berhasil Disimpan",
      });
      form.reset();
      resetForm();
      switch (cookies.get("username")) {
        case "user1":
          window.open(
            "https://docs.google.com/spreadsheets/d/1aAF7gj7fVTeYpysT4RIwbsx-VHYJ0hXh2gQqi-6cets/edit?usp=drive_link",
            "_blank"
          );
          break;
        case "user2":
          window.open(
            "https://docs.google.com/spreadsheets/d/1GZ4O7MmevdmJoQlMrm-s9hHFhmlTdilOWCL3-M2ZdUQ/edit?usp=drive_link",
            "_blank"
          );
          break;
        case "user3":
          window.open(
            "https://docs.google.com/spreadsheets/d/1J_7oyfDkP0j5O0oZA_ItceQ56U1i6FiEdQdaAzp1ZRg/edit?usp=drive_link",
            "_blank"
          );
      }
    } catch (error) {
      console.error("Error creating kuesioner:", error);
    }
  };

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    const finalJabatan =
      values.jabatan === "Lainnya" ? values.jabatanLainnya! : values.jabatan;
    const finalKeahlian =
      values.keahlian === "Lainnya" ? values.keahlianLainnya! : values.keahlian;

    updateFormKuesionerState("nama", values.nama);
    updateFormKuesionerState("jenisKelamin", values.jenisKelamin);
    updateFormKuesionerState("domisili", values.domisili);
    updateFormKuesionerState("keahlian", finalKeahlian);
    updateFormKuesionerState("keahlianLain", values.keahlianLainnya || "");
    updateFormKuesionerState("jabatan", finalJabatan);
    updateFormKuesionerState("jabatanLain", values.jabatanLainnya || "");
    updateFormKuesionerState("institusi", values.institusi);
    updateFormKuesionerState("frekuensiChatbot", values.frekuensiChatbot);
    // onNextStep();
  };

  return (
    <Form {...form}>
      <p>
        <b>📑Profil Responden</b> <br />
        Bagian ini bertujuan untuk mengumpulkan informasi dasar tentang latar
        belakang responden, guna memastikan bahwa penilaian yang diberikan
        memiliki landasan keahlian yang sesuai dengan konteks penelitian.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mt-4"
      >
        {/* Nama */}
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Nama Lengkap</FormLabel>
                <FormControl className="col-span-2">
                  <Input placeholder="Masukkan nama lengkap anda" {...field} />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Jenis Kelamin - Radio Vertical */}
        <FormField
          control={form.control}
          name="jenisKelamin"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Jenis Kelamin</FormLabel>
                <FormControl className="col-span-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2"
                  >
                    {genders.map((gender) => (
                      <FormItem
                        key={gender.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={gender.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {gender.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Kota */}
        <FormField
          control={form.control}
          name="domisili"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">
                  Kota/kabupaten domisili tinggal saat ini
                </FormLabel>
                <FormControl className="col-span-2">
                  <Input placeholder="Masukkan domisili anda" {...field} />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Keahlian - Radio Vertical */}
        <FormField
          control={form.control}
          name="keahlian"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">Bidang Keahlian</FormLabel>
                <FormControl className="col-span-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2"
                  >
                    {keahlian.map((level) => (
                      <FormItem
                        key={level.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={level.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {level.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Tampilkan input jika keahlian = Lainnya */}
        {form.watch("keahlian") === "Lainnya" && (
          <FormField
            control={form.control}
            name="keahlianLainnya"
            render={({ field }) => (
              <FormItem>
                <div className="grid lg:grid-cols-3 items-center gap-5">
                  <FormLabel className="col-span-1">Keahlian Lainnya</FormLabel>
                  <FormControl className="col-span-2">
                    <Input placeholder="Masukkan keahlian lainnya" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-2 col-start-2" />
                </div>
              </FormItem>
            )}
          />
        )}

        {/* Jabatan - Radio Vertical */}
        <FormField
          control={form.control}
          name="jabatan"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">
                  Peran/Jabatan saat ini{" "}
                </FormLabel>
                <FormControl className="col-span-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2"
                  >
                    {jabatan.map((level) => (
                      <FormItem
                        key={level.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={level.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {level.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Tampilkan input jika jabatan = Lainnya */}
        {form.watch("jabatan") === "Lainnya" && (
          <FormField
            control={form.control}
            name="jabatanLainnya"
            render={({ field }) => (
              <FormItem>
                <div className="grid lg:grid-cols-3 items-center gap-5">
                  <FormLabel className="col-span-1">Jabatan Lainnya</FormLabel>
                  <FormControl className="col-span-2">
                    <Input placeholder="Masukkan jabatan lainnya" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-2 col-start-2" />
                </div>
              </FormItem>
            )}
          />
        )}

        {/* Institusi atau organisasi */}
        <FormField
          control={form.control}
          name="institusi"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">
                  Institusi atau orgnisasi
                </FormLabel>
                <FormControl className="col-span-2">
                  <Input
                    placeholder="Masukkan institusi atau orgnisasi anda"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Frekuensi Chatbot - Radio Vertical */}
        <FormField
          control={form.control}
          name="frekuensiChatbot"
          render={({ field }) => (
            <FormItem>
              <div className="grid lg:grid-cols-3 items-center gap-5">
                <FormLabel className="col-span-1">
                  Frekuensi Penggunaan Chatbot
                </FormLabel>
                <FormControl className="col-span-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2"
                  >
                    {chatbotFrequency.map((freq) => (
                      <FormItem
                        key={freq.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={freq.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {freq.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="col-span-2 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="w-full py-4 bg-white border-t border-gray-200 justify-between items-center flex">
          <div className="justify-start items-center gap-2.5 flex">
            {onPrevStep && (
              <Button type="button" variant={"outline"} onClick={onPrevStep}>
                Kembali
              </Button>
            )}
          </div>
          <div className="justify-start items-center gap-3 flex">
            <Button type="submit">
              {onPrevStep ? "Lanjut" : "Simpan & Lanjut"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RespondentProfileForm;
