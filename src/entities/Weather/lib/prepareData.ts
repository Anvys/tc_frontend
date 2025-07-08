import { IWeatherResponse } from '../model/types/types';

export interface IPreparedData{
    times: string[]
    temperatures: number[]
    humidities: number[]
    color: string
}
export const doPrepareChartData = (weatherData: IWeatherResponse, days: number): IPreparedData | null => {
    if (!weatherData?.list) return null;

    const forecastItems = weatherData.list.slice(0, days * 8); // 8 точек в день (каждые 3 часа)

    const times = forecastItems.map((item) => (
        new Date(item.dt * 1000)
            .toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit' })));

    const temperatures = forecastItems.map((item) => item.main.temp);
    const humidities = forecastItems.map((item) => item.main.humidity);

    return {
        times, temperatures, humidities, color: 'red',
    };
};
