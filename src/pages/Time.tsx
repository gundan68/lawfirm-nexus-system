
import React from "react";

const TimePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-law-dark">時間管理</h1>
        <p className="text-muted-foreground">記錄與追蹤案件工作時間</p>
      </div>

      <div className="rounded-md border border-dashed border-gray-300 p-8">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="text-4xl font-semibold text-gray-300">時間管理</div>
          <p className="max-w-sm text-muted-foreground">
            此模組將提供工作時間記錄、追蹤、統計與報表功能
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimePage;
