type ButtonStyle = "Standart" | "Primary";

export type ButtonProps = {
    style: ButtonStyle;
    isDisabled?: boolean;
    onClick: () => void;
    // breakpoints: ButtonBreakpoints;
    isExtraHeight?: boolean;
    children: string;
}