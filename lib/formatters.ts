const Currency_formatter = new Intl.NumberFormat("en-US", {
    currency: "CZK",
    style: "currency",
    minimumFractionDigits: 0,
})

const Number_formatter = new Intl.NumberFormat("en-US")

export function formatCurrency(amount: number){
    return Currency_formatter.format(amount)
}

export function formatNumber(number: number){
    return Number_formatter.format(number)
}