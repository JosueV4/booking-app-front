export const formatDateLong = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export const formatDateShort = date => {
    return new Date(date).toISOString().split('T')[0]
}
