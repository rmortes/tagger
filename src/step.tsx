import { JSX } from "solid-js/jsx-runtime";

interface StepProps {
  title: string;
  description: string;
  children: JSX.Element;
}

export default function Step({ title, description, children }: StepProps) {
  return (
    <div class="flex flex-col items-start w-full mt-32px" id={`step-${title}`}>
      <h2 class="m-0 font-bold">{title}</h2>
      <p class="text-xl">{description}</p>
      <div class="flex flex-col items-start w-full mt-24px">{children}</div>
    </div>
  );
}