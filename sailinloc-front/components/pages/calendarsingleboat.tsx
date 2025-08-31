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
  useDisclosure,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";
import { addToast, ToastProvider } from "@heroui/toast";
import { useDateRange } from "@/context/DateRangeContext";

type DisabledDateObj = { year: number; month: number; day: number };

interface CalendarSingleBoatProps {
  datesIndisponibles: string[]; // tableau de strings ISO dates
  typeLocation: "demi-journée" | "jour" | "week-end" | "semaine" | "mois";
}

export const CalendarSingleBoat = ({
  datesIndisponibles,
  typeLocation,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "blur">("opaque");

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
    setDates(null, null, []); // bien remettre le tableau vide aussi
    setIsModalOpen(false);
    setCalendarKey((prev) => prev + 1); // force re-render du Calendar
  };

  const disabledDate = (currentDate: Dayjs) => {
    const today = dayjs().startOf("day");

    if (currentDate.isBefore(today, "day")) return true;

    if (typeLocation === "week-end") {
      // seuls vendredi, samedi et dimanche sont activables
      const day = currentDate.day(); // 0 = dimanche, 5 = vendredi, 6 = samedi
      return !(day === 5 || day === 6 || day === 0); // désactiver tout le reste
    }

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

    if (!typeLocation) {
      // typeLocation non choisi → ouvrir modal
      setBackdrop("opaque");
      onOpen();
      return;
    }

    if (typeLocation === "demi-journée" || typeLocation === "jour") {
      // Sélection simple
      setDateRange([date, date]);
      setSelectedDates([date]);
    } else if (typeLocation === "week-end") {
      const isAlreadySelected = selectedDates.some((d) =>
        d.isSame(date, "day")
      );

      let updatedDates: Dayjs[];
      if (isAlreadySelected) {
        updatedDates = selectedDates.filter((d) => !d.isSame(date, "day"));
      } else {
        updatedDates = [...selectedDates, date];
      }

      setSelectedDates(updatedDates);

      // update le range avec min et max des dates choisies
      if (updatedDates.length > 0) {
        const sorted = [...updatedDates].sort(
          (a, b) => a.valueOf() - b.valueOf()
        );
        setDateRange([sorted[0], sorted[sorted.length - 1]]);
      } else {
        setDateRange([null, null]);
      }
    } else if (typeLocation === "semaine" || typeLocation === "mois") {
      const start =
        typeLocation === "semaine"
          ? date.startOf("week")
          : date.startOf("month");
      const end =
        typeLocation === "semaine" ? date.endOf("week") : date.endOf("month");

      // Créer toutes les dates
      let allDates: Dayjs[] = [];
      let cursor = start.clone();
      while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
        allDates.push(cursor);
        cursor = cursor.add(1, "day");
      }

      // Vérifier s’il y a des dates désactivées
      const hasDisabled = allDates.some((d) => disabledDate(d));
      if (hasDisabled) {
        setIsModalOpen(true); // modal pour dates invalides
        return;
      }

      setDateRange([start, end]);
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
        onSelect={(date, { source }) => {
          if (source === "date") {
            handleSelect(date);
          }
        }}
      />
      <div className="mt-4">
        <h4>Dates sélectionnées :</h4>
        <ul className="flex flex-wrap gap-2">
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

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Sélectionnez votre formule</ModalHeader>
              <ModalBody>
                Veuillez choisir un type de location avant de sélectionner une
                date.
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
