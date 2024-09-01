

export function formatNumberWithCommas(number: number): string {
    return number.toLocaleString("en-US");
}

export const setFixedBody = (value: boolean) => {
    if (value) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
};