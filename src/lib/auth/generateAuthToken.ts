export function generateAuthToken(): string {
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() *(max - min + 1))+ min;
    return randomNumber.toString();
}