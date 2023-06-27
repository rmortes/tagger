import { JSX } from "solid-js/jsx-runtime";

interface ModalProps {
  button: JSX.Element;
  // To close the modal emit the event "modal:close"
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  const dialog = <dialog>
    {props.children}
  </dialog> as HTMLDialogElement;
  const button = props.button as HTMLButtonElement;
  button.addEventListener("click", () => {
    dialog.showModal();
  });
  dialog.addEventListener("modal:close", () => {
    dialog.close();
  });
  dialog.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === 'DIALOG') {
      dialog.close();
    }
  });

  return <>
    {button}
    {dialog}
  </>
}