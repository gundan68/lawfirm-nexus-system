import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import EditCaseDialog from "@/components/cases/EditCaseDialog";
import RelatedDocumentsDialog from "@/components/cases/RelatedDocumentsDialog";
import AddFeeDialog from "@/components/cases/AddFeeDialog";
import AddTimeRecordDialog from "@/components/cases/AddTimeRecordDialog";
import CaseStatusCards from "@/components/cases/CaseStatusCards";
import CaseSearch from "@/components/cases/CaseSearch";
import CasesTable from "@/components/cases/CasesTable";
import AddCaseDialog from "@/components/cases/AddCaseDialog";
import CaseTabs from "@/components/cases/CaseTabs";
import { Case, mockCases } from "@/components/cases/CaseTypes";

// Local storage key for cases
const LOCAL_STORAGE_CASES_KEY = "law_management_cases";

const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // State for dialogs and selected case
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false);
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false);
  const [isAddTimeDialogOpen, setIsAddTimeDialogOpen] = useState(false);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getCaseCountByStatus = (status?: "進行中" | "結案" | "暫停" | "諮詢階段") => {
    if (!status) return cases.length;
    return cases.filter(c => c.status === status).length;
  };

  // Handle edit case
  const handleEditCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCase = (updatedCase: Case) => {
    try {
      setCases(prevCases => 
        prevCases.map(caseItem => 
          caseItem.id === updatedCase.id ? updatedCase : caseItem
        )
      );
      toast.success("案件更新成功");
      // Force re-render after update
      setUpdateTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("更新案件時發生錯誤");
    }
  };

  // Handle related documents
  const handleRelatedDocuments = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsDocumentsDialogOpen(true);
  };

  // Handle add fee
  const handleAddFee = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsAddFeeDialogOpen(true);
  };

  // Handle add time record
  const handleAddTimeRecord = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsAddTimeDialogOpen(true);
  };

  // Handle add new case
  const handleAddCase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newCase: Case = {
      id: `CS${cases.length + 1}`.padStart(5, '0'),
      caseNumber: `C-2025-${(cases.length + 43).toString().padStart(3, '0')}`,
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      responsibleUser: formData.get('responsible') as string,
      category: formData.get('category') as string,
      date: formData.get('date') as string,
      status: formData.get('status') as Case["status"],
      courtNumber: formData.get('courtNumber') as string || undefined,
    };
    
    setCases([...cases, newCase]);
    toast.success("案件已新增");
    
    // Reset form by clearing all inputs
    const form = e.currentTarget;
    form.reset();
    
    // Close dialog
    const closeButton = form.querySelector('button[type="button"]');
    if (closeButton) {
      (closeButton as HTMLButtonElement).click();
    }

    // Force re-render
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-law-dark">案件管理</h1>
          <p className="text-muted-foreground">管理和追蹤所有案件</p>
        </div>
        <AddCaseDialog onSubmit={handleAddCase} />
      </div>

      <CaseStatusCards getCaseCountByStatus={getCaseCountByStatus} />
      
      <CaseSearch searchQuery={searchQuery} handleSearch={handleSearch} />

      <CaseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <CasesTable 
        filteredCases={filteredCases}
        onEditCase={handleEditCase}
        onRelatedDocuments={handleRelatedDocuments}
        onAddFee={handleAddFee}
        onAddTimeRecord={handleAddTimeRecord}
      />

      {/* Edit Case Dialog */}
      <EditCaseDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        caseData={selectedCase}
        onUpdateCase={handleUpdateCase}
      />

      {/* Related Documents Dialog */}
      <RelatedDocumentsDialog
        isOpen={isDocumentsDialogOpen}
        onOpenChange={setIsDocumentsDialogOpen}
        caseData={selectedCase}
      />

      {/* Add Fee Dialog */}
      <AddFeeDialog
        isOpen={isAddFeeDialogOpen}
        onOpenChange={setIsAddFeeDialogOpen}
        caseData={selectedCase}
      />

      {/* Add Time Record Dialog */}
      <AddTimeRecordDialog
        isOpen={isAddTimeDialogOpen}
        onOpenChange={setIsAddTimeDialogOpen}
        caseData={selectedCase}
      />
    </div>
  );
};

export default CasesPage;
