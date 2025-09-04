import React, { createContext, useContext, useState, ReactNode } from "react";
import dayjs, { Dayjs } from "dayjs";

type DateRangeContextType = {
  date1: Dayjs | null;
  date2: Dayjs | null;
  fullRange: Dayjs[];
  setDates: (d1: Dayjs | null, d2: Dayjs | null) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [date1, setDate1] = useState<Dayjs | null>(null);
  const [date2, setDate2] = useState<Dayjs | null>(null);

  // Génération automatique de la plage
  const fullRange: Dayjs[] = (() => {
    if (!date1 || !date2) return [];

    const start = dayjs(date1).isBefore(date2) ? dayjs(date1) : dayjs(date2);
    const end = dayjs(date1).isAfter(date2) ? dayjs(date1) : dayjs(date2);

    const dates: Dayjs[] = [];
    let cursor = start.clone();

    while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
      dates.push(cursor);
      cursor = cursor.add(1, "day");
    }

    return dates;
  })();

  const setDates = (d1: Dayjs | null, d2: Dayjs | null) => {
    setDate1(d1);
    setDate2(d2);
  };

  const resetDates = () => {
    setDate1(null);
    setDate2(null);
  };

  return (
    <DateRangeContext.Provider value={{ date1, date2, fullRange, setDates, resetDates }}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
