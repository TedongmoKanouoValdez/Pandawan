"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  backdrop?: "opaque" | "transparent";
  primaryAction?: { label: string; onPress: () => void };
  secondaryAction?: { label: string; onPress: () => void };
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  backdrop = "opaque",
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              {secondaryAction && (
                <Button
                  color="danger"
                  variant="light"
                  onPress={secondaryAction.onPress}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button color="primary" onPress={primaryAction.onPress}>
                  {primaryAction.label}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
