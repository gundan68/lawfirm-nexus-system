
import React from "react";
import CaseStatusCards from "@/components/cases/CaseStatusCards";
import CaseSearch from "@/components/cases/CaseSearch";
import CasesTable from "@/components/cases/CasesTable";
import AddCaseDialog from "@/components/cases/AddCaseDialog";
import CaseTabs from "@/components/cases/CaseTabs";
import CaseDialogs from "@/components/cases/CaseDialogs";
import { useCasesManagement } from "@/hooks/useCasesManagement";
import { useCasesFiltering } from "@/hooks/useCasesFiltering";
import { useCaseDialogs } from "@/hooks/useCaseDialogs";

const CasesPage: React.FC = () => {
  // Use our custom hooks
  const { cases, getCaseCountByStatus, handleUpdateCase, handleAddCase } = useCasesManagement();
  const { searchQuery, activeTab, setActiveTab, handleSearch, filteredCases } = useCasesFiltering(cases);
  const {
    selectedCase,
    isEditDialogOpen,
    isDocumentsDialogOpen,
    isAddFeeDialogOpen,
    isAddTimeDialogOpen,
    setIsEditDialogOpen,
    setIsDocumentsDialogOpen,
    setIsAddFeeDialogOpen,
    setIsAddTimeDialogOpen,
    handleEditCase,
    handleRelatedDocuments,
    handleAddFee,
    handleAddTimeRecord
  } = useCaseDialogs();

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

      {/* All Case-related dialogs */}
      <CaseDialogs 
        selectedCase={selectedCase}
        isEditDialogOpen={isEditDialogOpen}
        isDocumentsDialogOpen={isDocumentsDialogOpen}
        isAddFeeDialogOpen={isAddFeeDialogOpen}
        isAddTimeDialogOpen={isAddTimeDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDocumentsDialogOpen={setIsDocumentsDialogOpen}
        setIsAddFeeDialogOpen={setIsAddFeeDialogOpen}
        setIsAddTimeDialogOpen={setIsAddTimeDialogOpen}
        onUpdateCase={handleUpdateCase}
      />
    </div>
  );
};

export default CasesPage;
