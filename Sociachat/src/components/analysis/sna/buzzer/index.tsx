import Header from "@/components/header";
import TableBuzzer from "./table-buzzer/TableBuzzer";
import { useAnalysis } from "@/hooks/AnalysisContext";

const Buzzer = () => {
  const { selectedProject } = useAnalysis();

  if (!selectedProject) {
    return (
      <section className="flex-grow p-6 bg-white rounded-lg shadow block">
        Please select a project to view the buzzer.
      </section>
    );
  }

  return (
    <section className="w-[761px] min-h-screen p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      {/* topik analisis */}
      <div className="self-stretch px-6 py-5 bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch py-1 justify-start items-center gap-2 inline-flex">
          <Header
            label="Buzzer of Keyword  "
            keyword={selectedProject?.keyword ?? ""}
          />
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-2.5 flex  h-[600px]  overflow-scroll">
          <TableBuzzer />
        </div>
      </div>
    </section>
  );
};

export default Buzzer;
