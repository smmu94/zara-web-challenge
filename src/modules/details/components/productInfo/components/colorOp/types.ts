export type ColorOpProps = {
    color: {
        name: string;
        hexCode: string;
    }
    isSelected: boolean;
    id: string;
    onClick: () => void;
}