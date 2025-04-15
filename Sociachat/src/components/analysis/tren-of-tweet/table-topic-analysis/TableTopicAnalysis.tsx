import { axiosPrivate } from "@/axiosConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Topic } from "@/types/Topic";

interface TableTopicAnaylsisProps {
  topics: Array<Topic>;
}

const TableTopicAnalysis: React.FC<TableTopicAnaylsisProps> = ({ topics }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[170px] text-center">Num of Topic</TableHead>
          <TableHead>Topic</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.map((topic, index) => (
          <TableRow key={`row-${index}`} className="font-bold leading-tight">
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{topic.context}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableTopicAnalysis;
