"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { LogInIcon } from "lucide-react";
function ResumeButton() {
    var _a = useDisclosure(), isOpen = _a.isOpen, onOpen = _a.onOpen, onOpenChange = _a.onOpenChange;
    var _b = useAuthState(auth), user = _b[0], loading = _b[1], error = _b[2];
    var router = useRouter();
    var openModal = function () {
        if (user) {
            router.push("/resume");
            return;
        }
        else {
            onOpen();
        }
    };
    var onLoginWithGoogle = function () {
        signInWithPopup(auth, provider)
            .then(function (res) {
            router.push("/resume");
            toast.success("Sign in successfully...");
        })
            .catch(function (err) {
            toast.error("Please try again...");
        });
    };
    return (<>
      <Button radius="full" size="lg" onPress={openModal} color="primary">
        Try Resume
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {function (onClose) { return (<>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="mb-4">
                <Button onClick={onLoginWithGoogle} className="w-full" startContent={<LogInIcon />}>
                  Login with google
                </Button>

              </ModalBody>

            </>); }}
        </ModalContent>
      </Modal>
    </>);
}
export default ResumeButton;
