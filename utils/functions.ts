import { CartController } from '@/types/cart';
import { ProductController } from '@/types/products';

export function formatNumberWithCommas(number: number): string {
  return number.toLocaleString('en-US');
}

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

export function calculateCartTotal(
  cartItems: CartController.CartItem[]
): number {
  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
    const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
    const itemTotal =
      (itemPrice + sizeAdditionalPrice + colorAdditionalPrice) * item.quantity;
    return total + itemTotal;
  }, 0);
}

export function calculateCartItemTotal(item: CartController.CartItem): number {
  const itemPrice = parseFloat(item.price);
  const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
  const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
  const itemTotal =
    (itemPrice + sizeAdditionalPrice + colorAdditionalPrice) * item.quantity;
  return itemTotal;
}

export function calculateCartItemAdditionalPrice(
  item: CartController.CartItem
): number {
  const sizeAdditionalPrice = parseFloat(item.productSize.additionalPrice);
  const colorAdditionalPrice = parseFloat(item.productColor.additionalPrice);
  return sizeAdditionalPrice + colorAdditionalPrice;
}

export function sortProductsByDate(
  products: ProductController.Product[]
): ProductController.Product[] {
  return products.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function isSameDate(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
