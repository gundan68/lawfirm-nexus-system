
import { useState } from "react";
import { Case } from "@/components/cases/CaseTypes";

export const useCasesFiltering = (cases: Case[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCases = cases.filter((caseItem) => {
    // First apply search filter
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Then apply tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && caseItem.status === "進行中";
    if (activeTab === "consultation") return matchesSearch && caseItem.status === "諮詢階段";
    if (activeTab === "closed") return matchesSearch && caseItem.status === "結案";
    return matchesSearch;
  });

  return {
    searchQuery,
    activeTab,
    setActiveTab,
    handleSearch,
    filteredCases
  };
};
