import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Dayjs } from "dayjs";

type DateRangeContextType = {
  date1: Dayjs | null;
  date2: Dayjs | null;
  setDates: (d1: Dayjs | null, d2: Dayjs | null) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [date1, setDate1] = useState<Dayjs | null>(null);
  const [date2, setDate2] = useState<Dayjs | null>(null);

  const setDates = (d1: Dayjs | null, d2: Dayjs | null) => {
    setDate1(d1);
    setDate2(d2);
  };

  return (
    <DateRangeContext.Provider value={{ date1, date2, setDates }}>
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
