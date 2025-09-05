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
  const [modalMessage, setModalMessage] = useState("");

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
      setBackdrop("opaque");
      onOpen();
      return;
    }

    if (typeLocation === "demi-journée" || typeLocation === "jour") {
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

      if (updatedDates.length > 0) {
        const sorted = [...updatedDates].sort(
          (a, b) => a.valueOf() - b.valueOf()
        );
        setDateRange([sorted[0], sorted[sorted.length - 1]]);
      } else {
        setDateRange([null, null]);
      }
    } else if (typeLocation === "semaine" || typeLocation === "mois") {
      // Si aucune date n'est encore choisie → définir comme début
      if (!dateRange[0]) {
        setDateRange([date, null]);
        setSelectedDates([date]);
        return;
      }

      // Si une date de début existe mais pas de fin → on complète le range
      if (dateRange[0] && !dateRange[1]) {
        const start = dateRange[0];
        const end = date;

        let rangeStart = start.isBefore(end) ? start : end;
        let rangeEnd = start.isBefore(end) ? end : start;

        const diffDays = rangeEnd.diff(rangeStart, "day") + 1;

        // Vérifier la durée minimale
        const minDays = typeLocation === "semaine" ? 7 : 30;
        if (diffDays < minDays) {
          setModalMessage(
            `La durée minimale est de ${minDays} jours pour une location "${typeLocation}".`
          );
          setIsModalOpen(true); // affiche modal erreur
          return;
        }

        // Générer toutes les dates entre start et end
        let allDates: Dayjs[] = [];
        let cursor = rangeStart.clone();
        while (cursor.isBefore(rangeEnd) || cursor.isSame(rangeEnd, "day")) {
          if (disabledDate(cursor)) {
            setModalMessage(
              "La plage sélectionnée contient au moins une date indisponible. Merci de choisir une autre période."
            );
            setIsModalOpen(true);
            return;
          }
          allDates.push(cursor.clone());
          cursor = cursor.add(1, "day");
        }

        setDateRange([rangeStart, rangeEnd]);
        setSelectedDates(allDates);
      }
      // Si deux dates existent déjà → reset et recommencer
      else {
        setDateRange([date, null]);
        setSelectedDates([date]);
      }
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

      <Modal
        backdrop="blur"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Sélectionnez votre formule</ModalHeader>
              <ModalBody>
                <p>{modalMessage}</p>
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
