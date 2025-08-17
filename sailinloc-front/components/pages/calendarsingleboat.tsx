"use client";
import { Calendar, Badge, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { CalendarProps } from "antd";
import { AiOutlineSync } from "react-icons/ai";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { addToast, ToastProvider } from "@heroui/toast";
import { useDateRange } from "@/context/DateRangeContext";

type DisabledDateObj = { year: number; month: number; day: number };

interface CalendarSingleBoatProps {
  datesIndisponibles: string[]; // tableau de strings ISO dates
}

export const CalendarSingleBoat = ({
  datesIndisponibles,
}: CalendarSingleBoatProps) => {
  //   const disabledDates = [
  //     dayjs().date(5).startOf("day"),
  //     dayjs().date(15).startOf("day"),
  //     dayjs().date(25).startOf("day"),
  //   ];

  //   const disabledDate = (currentDate: Dayjs) =>
  //     disabledDates.some((d) => currentDate.isSame(d, "day"));

  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [calendarKey, setCalendarKey] = useState(0);
  const { date1, date2, fullRange, setDates } = useDateRange();
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    const [start, end] = dateRange;
    if (start && end) {
      // Créer le tableau complet de jours
      let allDates: Dayjs[] = [];
      let cursor = start.clone();
      while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
        allDates.push(cursor);
        cursor = cursor.add(1, "day");
      }
      setDates(start, end, allDates);
    } else {
      // Réinitialisation
      setDates(null, null, []);
    }
  }, [dateRange, setDates]);

  const disabledSpecificDates: DisabledDateObj[] = React.useMemo(() => {
    return datesIndisponibles.map((dateStr) => {
      const d = dayjs(dateStr);
      return {
        year: d.year(),
        month: d.month(), // dayjs month 0-based
        day: d.date(),
      };
    });
  }, [datesIndisponibles]);

  const handleReset = () => {
    setSelectedDates([]);
    setDateRange([null, null]);
    setDates(null, null); // remet aussi les dates du contexte à zéro
    setCalendarKey((prev) => prev + 1);
  };

  const disabledDate = (currentDate: Dayjs) => {
    const today = dayjs().startOf("day");

    if (currentDate.isBefore(today, "day")) return true;

    const isSpecificallyDisabled = disabledSpecificDates.some(
      (d) =>
        currentDate.date() === d.day &&
        currentDate.month() === d.month &&
        currentDate.year() === d.year
    );

    if (isSpecificallyDisabled) return true;

    return false;
  };

  const fullCellRender = (current: Dayjs, info: any) => {
    if (info.type !== "date") return info.originNode;

    const isDisabled = disabledDate(current);
    const isSelected = selectedDates.some((d) => d.isSame(current, "day"));

    return (
      <div
        style={{
          textAlign: "center",
          opacity: isDisabled ? 0.4 : 1,
          backgroundColor: isSelected
            ? "#bae7ff"
            : isDisabled
              ? "#f5f5f5"
              : undefined,
          borderRadius: "4px",
          height: "100%",
          lineHeight: "38px",
        }}
      >
        {current.date()}
        {isDisabled && <Badge status="error" />}
      </div>
    );
  };

  const handlePanelChange = (date: Dayjs, mode: string) => {
    setCurrentMonth(date.startOf("month")); // toujours comparer à début de mois
  };

  const handleSelect = (date: Dayjs) => {
    if (disabledDate(date)) return;

    let [start, end] = dateRange;

    if (!start || (start && end)) {
      setDateRange([date, null]);
      setSelectedDates([date]);
    } else if (start && !end) {
      let newStart = start.isBefore(date) ? start : date;
      let newEnd = start.isAfter(date) ? start : date;

      // Vérifier les jours désactivés
      let cursor = newStart.clone();
      let hasDisabled = false;
      while (cursor.isBefore(newEnd) || cursor.isSame(newEnd, "day")) {
        if (disabledDate(cursor)) {
          hasDisabled = true;
          break;
        }
        cursor = cursor.add(1, "day");
      }

      if (hasDisabled) {
        setIsModalOpen(true);
        setDateRange([date, null]);
        setSelectedDates([date]);
        return;
      }

      // Plage valide
      setDateRange([newStart, newEnd]);

      // Pour l’affichage visuel
      let allDates: Dayjs[] = [];
      cursor = newStart.clone();
      while (cursor.isBefore(newEnd) || cursor.isSame(newEnd, "day")) {
        allDates.push(cursor);
        cursor = cursor.add(1, "day");
      }
      setSelectedDates(allDates);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4 mt-4">
        <Button
          onClick={handleReset}
          className="flex space-x-2 items-center bg-black text-white mb-4"
        >
          <span>Réinitialiser la sélection</span>
          <AiOutlineSync />
        </Button>
      </div>
      <Calendar
        key={calendarKey}
        disabledDate={disabledDate}
        fullCellRender={fullCellRender}
        onPanelChange={handlePanelChange}
        onSelect={handleSelect}
      />
      <div className="mt-4">
        <h4>Dates sélectionnées :</h4>
        <ul className="flex flex-row space-x-4">
          {selectedDates.map((d, idx) => (
            <li key={`${d.format("YYYY-MM-DD")}-${idx}`} id={`${idx + 1}`}>
              Date {idx + 1} : {d.format("YYYY-MM-DD")}
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        backdrop="blur"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Plage invalide
              </ModalHeader>
              <ModalBody>
                <p>
                  La plage sélectionnée contient au moins un jour indisponible.
                  Merci de choisir une plage sans dates désactivées.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
