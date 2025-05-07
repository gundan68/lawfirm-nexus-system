
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaseTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CaseTabs: React.FC<CaseTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">所有案件</TabsTrigger>
        <TabsTrigger value="active">進行中</TabsTrigger>
        <TabsTrigger value="consultation">諮詢階段</TabsTrigger>
        <TabsTrigger value="closed">已結案</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CaseTabs;
