
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CaseStatusCardsProps {
  getCaseCountByStatus: (status?: "進行中" | "結案" | "暫停" | "諮詢階段") => number;
}

const CaseStatusCards: React.FC<CaseStatusCardsProps> = ({ getCaseCountByStatus }) => {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-muted-foreground">所有案件</div>
          <div className="text-3xl font-bold">{getCaseCountByStatus()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-blue-600">進行中案件</div>
          <div className="text-3xl font-bold text-blue-600">{getCaseCountByStatus("進行中")}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-orange-600">諮詢階段</div>
          <div className="text-3xl font-bold text-orange-600">{getCaseCountByStatus("諮詢階段")}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-green-600">已結案</div>
          <div className="text-3xl font-bold text-green-600">{getCaseCountByStatus("結案")}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStatusCards;
