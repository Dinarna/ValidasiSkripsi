import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Project from "@/types/Project";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: () => <div className="w-56">Topic</div>,
    cell: ({ row }) => {
      const topic = row.original.title;
      return (
        <div className="text-base text-foreground font-semibold">{topic}</div>
      );
    },
  },
  {
    accessorKey: "start_date_crawl",
    header: () => <div className="w-72">Timeframe</div>,
    cell: ({ row }) => {
      const start_date_crawl = row.original.start_date_crawl
        ? format(row.original.start_date_crawl, "dd MMMM yyyy")
        : "";
      const end_date_crawl = row.original.end_date_crawl
        ? format(row.original.end_date_crawl, "dd MMMM yyyy")
        : "";
      return (
        <div className="text-base text-foreground">
          {start_date_crawl} - {end_date_crawl}
        </div>
      );
    },
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => {
      const keyword = row.original.keyword;
      return (
        <div className="text-base text-foreground font-semibold">
          "{keyword}"
        </div>
      );
    },
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => {
      const country = row.original.language == "en" ? "English" : "Indonesia";
      return (
        <div className="text-base text-foreground font-semibold">{country}</div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Detail",
    // add cell button
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <Button size="sm" className="text-sm">
          <Link to={`/analysis?id=${id}`}>See Analysis</Link>
        </Button>
      );
    },
  },
];
