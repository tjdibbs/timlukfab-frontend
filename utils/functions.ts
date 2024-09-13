import { CartController } from "@/types/cart";


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

export function calculateCartTotal(cartItems: CartController.CartItem[]): number {
    return cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
        const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
        const itemTotal = (itemPrice + sizeAdditionalPrice + colorAdditionalPrice) * item.quantity;
        return total + itemTotal;
    }, 0);
}

export function calculateCartItemTotal(item: CartController.CartItem): number {
    const itemPrice = parseFloat(item.price);
    const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
    const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
    const itemTotal = (itemPrice + sizeAdditionalPrice + colorAdditionalPrice) * item.quantity;
    return itemTotal;
}

export function calculateCartItemAdditionalPrice(item: CartController.CartItem): number {
    const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
    const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
    return sizeAdditionalPrice + colorAdditionalPrice;
}