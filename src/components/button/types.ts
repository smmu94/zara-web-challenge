type ButtonStyle = "Standart" | "Primary";

export type ButtonProps = {
    style: ButtonStyle;
    isDisabled?: boolean;
    onClick: () => void;
    isExtraHeight?: boolean;
    children: string;
}