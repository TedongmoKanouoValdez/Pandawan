"use client";
import { Calendar, Badge } from "antd";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Button } from "@heroui/button";
import { AiOutlineSync } from "react-icons/ai";

export const CalendarDashboardBoat = () => {
  const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);
  const [calendarKey, setCalendarKey] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleReset = () => {
    setUnavailableDates([]);
    setCalendarKey((prev) => prev + 1);
  };

  const disabledDate = (currentDate: Dayjs) => {
    const today = dayjs().startOf("day");
    return currentDate.isBefore(today, "day");
  };

  const fullCellRender = (current: Dayjs, info: any) => {
    if (info.type !== "date") return info.originNode;

    const isDisabled = disabledDate(current);
    const isSelected = unavailableDates.some((d) => d.isSame(current, "day"));

    return (
      <div
        style={{
          textAlign: "center",
          opacity: isDisabled ? 0.4 : 1,
          backgroundColor: isSelected ? "#ffccc7" : undefined,
          borderRadius: "4px",
          height: "100%",
          lineHeight: "38px",
        }}
      >
        {current.date()}
        {isSelected && <Badge status="error" />}
      </div>
    );
  };

  const handleSelect = (date: Dayjs) => {
    if (disabledDate(date)) return;

    // Bloque la sélection automatique quand on change de mois
    if (!date.isSame(currentMonth, "month")) return;

    setUnavailableDates((prev) => {
      const index = prev.findIndex((d) => d.isSame(date, "day"));
      if (index !== -1) {
        return prev.filter((_, i) => i !== index); // toggle off
      } else {
        return [...prev, date];
      }
    });
  };

  return (
    <>
      <div className="flex items-center space-x-4 mt-4">
        <Button
          onClick={handleReset}
          className="flex space-x-2 items-center bg-black text-white mb-4"
        >
          <span>Réinitialiser les dates indisponibles</span>
          <AiOutlineSync />
        </Button>
      </div>

      <Calendar
        key={calendarKey}
        disabledDate={disabledDate}
        fullCellRender={fullCellRender}
        onSelect={handleSelect}
        onPanelChange={(date) => setCurrentMonth(date.startOf("month"))} // ✅ mettre à jour currentMonth
      />

      <div className="mt-4">
        <h4>Dates indisponibles sélectionnées :</h4>
        <ul className="flex flex-wrap gap-4">
          {unavailableDates.map((d, idx) => (
            <li key={`${d.format("YYYY-MM-DD")}-${idx}`}>
              {d.format("YYYY-MM-DD")}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
