
import { useState } from "react";
import { Document } from "./DocumentTypes";
import { toast } from "sonner";

const mockDocuments: Document[] = [
  { id: "doc1", title: "起訴狀.pdf", type: "起訴文件", date: "2025-04-20", size: "1.2 MB" },
  { id: "doc2", title: "證據清單.xlsx", type: "證據", date: "2025-04-21", size: "0.5 MB" },
  { id: "doc3", title: "委任契約.pdf", type: "契約", date: "2025-04-15", size: "0.8 MB" },
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const addDocument = (newDocument: Document) => {
    setDocuments([...documents, newDocument]);
    toast.success("文件已新增");
  };

  return {
    documents,
    setDocuments,
    searchQuery,
    setSearchQuery,
    handleSearch,
    filteredDocuments,
    addDocument,
  };
};
