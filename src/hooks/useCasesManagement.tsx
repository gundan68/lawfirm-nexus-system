
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Case, mockCases } from "@/components/cases/CaseTypes";
import { CaseFormValues } from "@/components/cases/CaseFormSchema";

// Local storage key for cases
const LOCAL_STORAGE_CASES_KEY = "law_management_cases";

export const useCasesManagement = () => {
  const [cases, setCases] = useState<Case[]>([]);
  // Force re-render when cases change
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Load cases from localStorage on initial mount
  useEffect(() => {
    const savedCases = localStorage.getItem(LOCAL_STORAGE_CASES_KEY);
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      // If no cases in localStorage, use mock data
      setCases(mockCases);
      localStorage.setItem(LOCAL_STORAGE_CASES_KEY, JSON.stringify(mockCases));
    }
  }, [updateTrigger]);

  // Save cases to localStorage whenever they change
  useEffect(() => {
    if (cases.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_CASES_KEY, JSON.stringify(cases));
    }
  }, [cases]);

  const getCaseCountByStatus = (status?: "進行中" | "結案" | "暫停" | "諮詢階段") => {
    if (!status) return cases.length;
    return cases.filter(c => c.status === status).length;
  };

  const handleUpdateCase = (updatedCase: Case) => {
    try {
      const updatedCases = cases.map(caseItem => 
        caseItem.id === updatedCase.id ? updatedCase : caseItem
      );
      
      // Update the state with the new array
      setCases(updatedCases);
      
      // Save to localStorage immediately
      localStorage.setItem(LOCAL_STORAGE_CASES_KEY, JSON.stringify(updatedCases));
      
      toast.success("案件更新成功");
      
      // Force re-render after update
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("更新案件時發生錯誤");
    }
  };

  const handleAddCase = (data: CaseFormValues) => {
    const newCase: Case = {
      id: `CS${cases.length + 1}`.padStart(5, '0'),
      caseNumber: `C-2025-${(cases.length + 43).toString().padStart(3, '0')}`,
      title: data.title,
      client: data.client,
      responsibleUser: data.responsibleUser,
      category: data.category,
      date: data.date,
      status: data.status as Case["status"],
      courtNumber: data.courtNumber || undefined,
    };
    
    const newCases = [...cases, newCase];
    setCases(newCases);
    
    // Save to localStorage immediately
    localStorage.setItem(LOCAL_STORAGE_CASES_KEY, JSON.stringify(newCases));
    
    toast.success("案件已新增");
    setUpdateTrigger(prev => prev + 1);
  };

  return {
    cases,
    getCaseCountByStatus,
    handleUpdateCase,
    handleAddCase
  };
};
