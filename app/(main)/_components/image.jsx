"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { LogInIcon } from "lucide-react";

function ImageButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    const openModal = () => {
        if (user) {
            router.push("/image");
            return;
        } else {
            onOpen();
        }
    };

    const onLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                router.push("/image");
                toast.success("Sign in successfully...");
            })
            .catch((err) => {
                console.error("Login error:", err);
                toast.error(`Login failed: ${err.message}`);
            });
    };

    return (
        <>
            <Button radius="full" size="lg" onPress={openModal}>
                Try Images
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody className="mb-4">
                                <Button onClick={onLoginWithGoogle} className="w-full" startContent={<LogInIcon />}>
                                    Login with google
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ImageButton;