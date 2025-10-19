export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '';
    }
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumIntegerDigits: 2,
    });
};