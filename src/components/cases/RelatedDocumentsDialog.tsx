
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import DocumentsList from "./documents/DocumentsList";
import DocumentUploadForm from "./documents/DocumentUploadForm";
import { useDocuments } from "./documents/useDocuments";
import { Case } from "./documents/DocumentTypes";

interface RelatedDocumentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case | null;
}

const RelatedDocumentsDialog: React.FC<RelatedDocumentsDialogProps> = ({
  isOpen,
  onOpenChange,
  caseData,
}) => {
  const {
    searchQuery,
    handleSearch,
    filteredDocuments,
    addDocument
  } = useDocuments();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>案件相關文件</DialogTitle>
          <DialogDescription>
            {caseData ? `${caseData.caseNumber} - ${caseData.title}` : "載入中..."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="搜尋文件..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </div>

          <DocumentUploadForm onAddDocument={addDocument} />
          <DocumentsList filteredDocuments={filteredDocuments} />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            關閉
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RelatedDocumentsDialog;
