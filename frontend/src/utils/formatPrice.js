export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '';
    }
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
};