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

export const CalendarSingleBoat = () => {
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
  const { date1, date2, setDates } = useDateRange();

  useEffect(() => {
    if (selectedDates.length === 2) {
      // Met à jour le contexte
      setDates(selectedDates[0], selectedDates[1]);
    }
  }, [selectedDates, setDates]);

  const disabledSpecificDates = [
    { year: 2025, month: 6, day: 15 }, // attention: month = 0 pour janvier, donc 6 = juillet
    { year: 2025, month: 6, day: 25 },
    { year: 2025, month: 7, day: 5 }, // août 5, 2025
  ];

  const handleReset = () => {
    setSelectedDates([]);
    setDates(null, null); // remet aussi les dates du contexte à zéro
    setCalendarKey((prev) => prev + 1);
  };

  const disabledDate = (currentDate: Dayjs) => {
    const today = dayjs().startOf("day");

    // Désactiver toutes les dates avant aujourd'hui
    if (currentDate.isBefore(today, "day")) {
      return true;
    }

    // Désactiver les jours spécifiques avec leur mois et année
    const isSpecificallyDisabled = disabledSpecificDates.some(
      (d) =>
        currentDate.date() === d.day &&
        currentDate.month() === d.month &&
        currentDate.year() === d.year
    );

    if (isSpecificallyDisabled) {
      return true;
    }

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
    // Vérifie si la date sélectionnée correspond au mois affiché
    if (!date.isSame(currentMonth, "month")) {
      return; // sélection automatique: on ignore
    }

    if (disabledDate(date)) return; // bloquer sélection directe d'une date désactivée

    setSelectedDates((prev) => {
      if (prev.length === 0) {
        return [date]; // première date
      } else if (prev.length === 1) {
        let [firstDate] = prev;
        // Corriger l'ordre pour que la date la plus ancienne soit en première
        let start = firstDate.isBefore(date) ? firstDate : date;
        let end = firstDate.isAfter(date) ? firstDate : date;

        // Vérifier si un jour désactivé existe dans l'intervalle
        let cursor = start.clone().add(1, "day");
        let hasDisabledInRange = false;

        while (cursor.isBefore(end)) {
          if (disabledDate(cursor)) {
            hasDisabledInRange = true;
            break;
          }
          cursor = cursor.add(1, "day");
        }

        if (hasDisabledInRange) {
          // Forcer le reset puis réouvrir le modal
          setIsModalOpen(false);
          setTimeout(() => setIsModalOpen(true), 0);
          return [start]; // recommencer à partir de la première date valide
        }

        return [start, end]; // plage valide, dans l'ordre correct
      } else {
        let start = prev[0].isBefore(date) ? prev[0] : date;
        let end = prev[0].isAfter(date) ? prev[0] : date;

        let cursor = start.clone().add(1, "day");
        let hasDisabledInRange = false;

        while (cursor.isBefore(end)) {
          if (disabledDate(cursor)) {
            hasDisabledInRange = true;
            break;
          }
          cursor = cursor.add(1, "day");
        }

        if (hasDisabledInRange) {
          setIsModalOpen(false);
          setTimeout(() => setIsModalOpen(true), 0);
          return [start]; // recommencer à partir de la nouvelle date valide
        }

        return [start, end]; // nouvelle plage valide
      }
    });
  };

  return (
    <>
      <div className="flex items-center space-x-4 mt-4">
        <Button onClick={handleReset} className="flex space-x-2 items-center bg-black text-white mb-4">
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
