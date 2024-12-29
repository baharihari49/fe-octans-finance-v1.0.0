import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ModalTriger } from "./ModalTriger";
import { ModalBody } from "./ModalBody";
import { ModalHeading } from "./ModalHeading";
import { ModalBodyFooter } from "./ModalFooter";

interface ModalProps {
	modalBodyComponents: React.ReactNode
	modalTriger: React.ReactNode
	modalHeading: React.ReactNode
	modalFooter: React.ReactNode
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({
	modalBodyComponents,
	modalTriger,
	modalHeading,
	modalFooter,
	open,
	setOpen
}) => (
	<Dialog.Root open={open}>
		<ModalTriger>
			{modalTriger}
		</ModalTriger>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 z-10 bg-blackA6 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed z-20 left-1/2 top-1/2 w-[90vw] max-w-2xl w-7xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
				<ModalHeading>
					{modalHeading}
				</ModalHeading>
				<hr className="mt-3"/>
				<ModalBody>
					{modalBodyComponents}
				</ModalBody>
				<div className="mt-[25px] flex justify-end">
					<ModalBodyFooter>
						{modalFooter}
					</ModalBodyFooter>
				</div>
				<Dialog.Close asChild>
					<button
						onClick={() => setOpen(false)}
						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
						aria-label="Close"
					>
						<Cross2Icon />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default Modal;
