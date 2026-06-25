"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { LogInIcon } from "lucide-react";
function PDFButton() {
    var _a = useDisclosure(), isOpen = _a.isOpen, onOpen = _a.onOpen, onOpenChange = _a.onOpenChange;
    var _b = useAuthState(auth), user = _b[0], loading = _b[1], error = _b[2];
    var router = useRouter();
    var openModal = function () {
        if (user) {
            router.push("/pdf");
            return;
        }
        else {
            onOpen();
        }
    };
    var onLoginWithGoogle = function () {
        signInWithPopup(auth, provider)
            .then(function (res) {
            router.push("/pdf");
            toast.success("Sign in successfully...");
        })
            .catch(function (err) {
            toast.error("Please try again...");
        });
    };
    return (<>
      <Button radius="full" size="lg" onPress={openModal} color="primary">
        Try PDF&apos;s
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {function (onClose) { return (<>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="mb-4">
                <Button onClick={onLoginWithGoogle} className="w-full" startContent={<LogInIcon />}>
                  Login with google
                </Button>
                {/* <Button className="w-full" startContent={<GitHubLogoIcon />}>
              Login with github
            </Button> */}
                {/* <hr />
            <Input
              autoFocus
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div> */}
              </ModalBody>
              {/* <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter> */}
            </>); }}
        </ModalContent>
      </Modal>
    </>);
}
export default PDFButton;
