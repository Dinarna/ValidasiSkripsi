import React, { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useFormKuesionerContext } from "@/hooks/kuesionerContext";
import { toast } from "../ui/use-toast";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { CONTENT_CHAT_BOT } from "@/types/constantLabelSidebar";

const formSchema = z.object({
  evaluations: z.array(
    z.object({
      id: z.number(),
      pertanyaan: z.string(),
      jawaban: z.string(),
    })
  ),
  additionalFeedback: z.string().min(1, "Harus diisi"),
});

type FormSchema = z.infer<typeof formSchema>;

const questions = [
  {
    id: 1,
    text: "Apakah Anda merasa ada informasi yang tidak penting atau tidak relevan yang justru muncul dalam hasil jawaban chatbot?",
  },
  {
    id: 2,
    text: "Apakah Anda merasa perlu melihat sumber asli atau referensi ketika membaca jawaban dari chatbot?",
  },
  {
    id: 3,
    text: "Menurut Anda, apakah penting bagi sistem untuk membedakan fakta dengan opini saat memberikan informasi?",
  },
];

type EvaluationExperienceFormProps = {
  onPrevStep?: () => void;
  onNextStep?: () => void;
};

const EvaluationExperienceForm: React.FC<EvaluationExperienceFormProps> = ({
  onPrevStep,
  onNextStep,
}) => {
  const { formKuesionerState, updateFormKuesionerState, createKuesioner } =
    useFormKuesionerContext();
  const { setActive } = useAnalysis();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      evaluations: questions.map((q) => ({
        id: q.id,
        pertanyaan: q.text,
        jawaban: "",
      })),
      additionalFeedback: "",
    },
  });

  useEffect(() => {
    if (formKuesionerState.pertanyaanRefleksi.length > 0) {
      submitKuesioner();
    }
  }, [formKuesionerState]);

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    values.evaluations.push({
      id: 0,
      pertanyaan:
        "Apa pengaruh dari ketidaksesuaian informasi yang diberikan terhadap persepsi pengetahuan di bidang politik?",
      jawaban: values.additionalFeedback,
    });
    updateFormKuesionerState("pertanyaanRefleksi", values.evaluations);
  };

  const submitKuesioner = async () => {
    try {
      await createKuesioner();
      setActive(CONTENT_CHAT_BOT);
      toast({
        title: "Data Kuesioner Berhasil Disimpan",
      });
      form.reset();
    } catch (error) {
      console.error("Error creating kuesioner:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mt-4"
      >
        <p>
          <b>📑 Bagian 3 – Evaluasi Pengalaman Menggunakan Chatbot</b> <br />
          Pada bagian ini, anda diminta untuk memberikan penilaian terhadap
          pengalaman keseluruhan saat berinteraksi dengan chatbot.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Pertanyaan</TableHead>
              <TableHead className="w-[30%]">Jawaban</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={question.id}>
                <TableCell>{question.text}</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`evaluations.${index}.jawaban`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value as string | undefined}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jawaban" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ya">Ya</SelectItem>
                              <SelectItem value="Tidak">Tidak</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <FormField
          control={form.control}
          name="additionalFeedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Apa pengaruh dari ketidaksesuaian informasi yang diberikan
                terhadap persepsi pengetahuan di bidang politik?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tulis jawaban Anda disini..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full py-4 bg-white border-t border-gray-200 justify-between items-center flex">
          <div className="justify-start items-center gap-2.5 flex">
            {onPrevStep && (
              <Button type="button" variant={"outline"} onClick={onPrevStep}>
                Kembali
              </Button>
            )}
          </div>
          <div className="justify-start items-center gap-3 flex">
            <Button type="submit">{onNextStep ? "Lanjut" : "Simpan"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EvaluationExperienceForm;
