import { User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAnalysis } from "@/hooks/AnalysisContext";

const TableBuzzer = () => {
  const { buzzer } = useAnalysis();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[170px] text-center">Rank</TableHead>
          <TableHead>Account Name</TableHead>
          <TableHead>Profile Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buzzer.map((item, index) => (
          <TableRow key={`row-${index}`} className="font-bold leading-tight">
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-secondary">{item.node}</TableCell>
            <TableCell className="text-secondary">
              <Button
                onClick={() => window.open(item.tweet_url, "_blank")}
                className="w-full flex items-center justify-center"
              >
                <User className="mr-2" />
                See Profile
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBuzzer;
