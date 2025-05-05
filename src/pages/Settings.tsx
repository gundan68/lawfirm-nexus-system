
import React from "react";

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">系統設定</h1>
        <p className="text-muted-foreground">管理系統參數與設定</p>
      </div>

      <div className="rounded-md border border-dashed border-gray-300 p-8">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="text-4xl font-semibold text-gray-300">系統設定</div>
          <p className="max-w-sm text-muted-foreground">
            此頁面將提供系統參數設定、備份恢復、系統日誌等功能
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
