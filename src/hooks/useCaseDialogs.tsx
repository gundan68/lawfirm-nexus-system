
import { useState } from "react";
import { Case } from "@/components/cases/CaseTypes";

export const useCaseDialogs = () => {
  // State for dialogs and selected case
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false);
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false);
  const [isAddTimeDialogOpen, setIsAddTimeDialogOpen] = useState(false);

  // Handle edit case
  const handleEditCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setIsEditDialogOpen(true);
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

  return {
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
  };
};
