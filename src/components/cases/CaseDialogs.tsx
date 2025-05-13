
import React from "react";
import EditCaseDialog from "@/components/cases/EditCaseDialog";
import RelatedDocumentsDialog from "@/components/cases/RelatedDocumentsDialog";
import AddFeeDialog from "@/components/cases/AddFeeDialog";
import AddTimeRecordDialog from "@/components/cases/AddTimeRecordDialog";
import { Case } from "@/components/cases/CaseTypes";

interface CaseDialogsProps {
  selectedCase: Case | null;
  isEditDialogOpen: boolean;
  isDocumentsDialogOpen: boolean;
  isAddFeeDialogOpen: boolean;
  isAddTimeDialogOpen: boolean;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDocumentsDialogOpen: (isOpen: boolean) => void;
  setIsAddFeeDialogOpen: (isOpen: boolean) => void;
  setIsAddTimeDialogOpen: (isOpen: boolean) => void;
  onUpdateCase: (updatedCase: Case) => void;
}

const CaseDialogs: React.FC<CaseDialogsProps> = ({
  selectedCase,
  isEditDialogOpen,
  isDocumentsDialogOpen,
  isAddFeeDialogOpen,
  isAddTimeDialogOpen,
  setIsEditDialogOpen,
  setIsDocumentsDialogOpen,
  setIsAddFeeDialogOpen,
  setIsAddTimeDialogOpen,
  onUpdateCase
}) => {
  return (
    <>
      {/* Edit Case Dialog */}
      <EditCaseDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        caseData={selectedCase}
        onUpdateCase={onUpdateCase}
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
    </>
  );
};

export default CaseDialogs;
