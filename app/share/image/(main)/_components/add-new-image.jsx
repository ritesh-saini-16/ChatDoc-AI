import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import UploadFromComputer from "./upload-from-computer";
import toast from "react-hot-toast";
function AddNewImage(_a) {
    var user = _a.user, documents = _a.documents;
    var _b = useDisclosure(), isOpen = _b.isOpen, onOpen = _b.onOpen, onOpenChange = _b.onOpenChange;
    var onModal = function () {
        if ((documents === null || documents === void 0 ? void 0 : documents.length) >= 15) {
            toast.error("Max file limit reached");
            return;
        }
        else {
            onOpen();
        }
    };
    return (<>
      <Button className="w-full mt-4 font-semibold relative shadow-lg" radius="none" onPress={onModal}>
        Add New Image
      </Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {function (onClose) { return (<>
              <ModalHeader className="flex flex-col gap-1">
                Add new pdf
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="computer" title="Computer">
                      <UploadFromComputer onClose={onClose} user={user}/>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>); }}
        </ModalContent>
      </Modal>
    </>);
}
export default AddNewImage;
