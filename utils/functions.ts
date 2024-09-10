

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

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[i],
        ];
    }

    return shuffledArray;
};