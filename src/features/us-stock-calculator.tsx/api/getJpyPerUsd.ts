
type PricePerUsd = {
    JPY: number,
}

type UsdExchangeRateRes = {
    base: string,
    result: PricePerUsd
    updated: Date
    ms: number
}

export async function getJpyPricePerUsd(): Promise<number> {
    try {
        const res = await fetch("https://playground.fastforex.io/proxy/api.fastforex.io/fetch-one?from=USD&to=jpy")
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

        const data: UsdExchangeRateRes = await res.json()
        return data.result.JPY ?? 150
    } catch (e) {
        console.error('Failed to fetch current USD exchange rate via API', e)
        return 150
    }
}