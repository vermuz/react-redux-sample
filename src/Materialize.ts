declare namespace Materialize {
    const toast: (text: string, timeMillis: number) => void;
}

export function toast(text: string, timeMillis: number): void {
    Materialize.toast(text, timeMillis);
}