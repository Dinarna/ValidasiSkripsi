import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useFormKuesionerContext } from "@/hooks/kuesionerContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAnalysis } from "@/hooks/AnalysisContext";

const formSchema = z.object({
  evaluations: z.array(
    z.object({
      prompt_pertanyaan: z.string().min(1, "Prompt harus diisi"),
      jawaban: z.string().min(1, "Jawaban harus diisi"),
      kesesuaian: z
        .number()
        .min(1, "Nilai minimal 1")
        .max(5, "Nilai maksimal 5"),
      kejelasan: z
        .number()
        .min(1, "Nilai minimal 1")
        .max(5, "Nilai maksimal 5"),
      kredibilitas: z
        .number()
        .min(1, "Nilai minimal 1")
        .max(5, "Nilai maksimal 5"),
    })
  ),
});

type FormSchema = z.infer<typeof formSchema>;

type EvaluationLogFormProps = {
  onNextStep: () => void;
  onPrevStep?: () => void;
};

const EvaluationLogForm: React.FC<EvaluationLogFormProps> = ({
  onNextStep,
  onPrevStep,
}) => {
  const { kuesionerQuestions, kuesionerAnswers } = useAnalysis();

  const { formKuesionerState, updateFormKuesionerState, createKuesioner } =
    useFormKuesionerContext();

  const dummyData = kuesionerQuestions.map((question, index) => ({
    prompt: question,
    jawaban: kuesionerAnswers[index] || "",
  }));

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evaluations: dummyData.map((item) => ({
        prompt_pertanyaan: item.prompt,
        jawaban: item.jawaban,
        kesesuaian: 1,
        kejelasan: 1,
        kredibilitas: 1,
      })),
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    // Update context state
    updateFormKuesionerState("penilaianChatbot", values.evaluations);
    onNextStep();
  };

  return (
    <Form {...form}>
      <p>
        <b>📑 Bagian 2 – Evaluasi Log Percakapan</b> <br />
        Pada bagian ini, anda diminta untuk memberikan penilaian terhadap log
        percakapan pada chatbot. Penilaian difokuskan pada tiga aspek utama,
        yaitu:
        <ol style={{ listStyleType: "auto", paddingLeft: "20px" }}>
          <li>
            <b>Kesesuaian</b> – Mengukur seberapa tepat isi pertanyaan dan
            jawaban chatbot terhadap konteks topik yang dibahas.
          </li>
          <li>
            <b>Kejelasan</b> – Menilai sejauh mana informasi disampaikan secara
            runtut, mudah dipahami, dan tidak membingungkan.
          </li>
          <li>
            <b>Kredibilitas</b> – Mengevaluasi tingkat kepercayaan terhadap
            informasi yang diberikan, termasuk dasar logika atau fakta yang
            mendukung.
          </li>
        </ol>
        Penilaian diberikan dalam skala 1–5, dengan kriteria sebagai berikut:
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          <li>1 = Sangat tidak sesuai / tidak jelas / tidak kredibel</li>
          <li>2 = Tidak sesuai / agak membingungkan / meragukan</li>
          <li>3 = Cukup sesuai / cukup jelas / cukup kredibel</li>
          <li>4 = Sesuai / jelas / kredibel</li>
          <li>5 = Sangat sesuai / sangat jelas / sangat kredibel</li>
        </ul>
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mt-4"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Prompt Pertanyaan</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead className="w-[100px]">Kesesuaian</TableHead>
              <TableHead className="w-[100px]">Kejelasan</TableHead>
              <TableHead className="w-[100px]">Kredibilitas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {form.watch("evaluations")?.length > 0 ? (
              form.watch("evaluations").map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>{dummyData[index].prompt}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-h-[200px] overflow-y-scroll text-justify">
                      {dummyData[index].jawaban}
                    </div>
                  </TableCell>

                  {/* Kesesuaian */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`evaluations.${index}.kesesuaian`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>

                  {/* Kejelasan */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`evaluations.${index}.kejelasan`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>

                  {/* Kredibilitas */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`evaluations.${index}.kredibilitas`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Tidak ada data evaluasi yang tersedia.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

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

export default EvaluationLogForm;
