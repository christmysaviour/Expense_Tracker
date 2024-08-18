export function addCommas(x: number): string {
    let [integerPart, decimalPart] = x.toFixed(2).split('.'); 

    let lastThree = integerPart.slice(-3);
    let otherNumbers = integerPart.slice(0, -3);

    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }

    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

    return result + '.' + decimalPart;
}
