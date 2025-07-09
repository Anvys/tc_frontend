import React, { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { IWeatherResponse } from 'entities/Weather/model/types/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { Card } from 'shared/ui/Card';
import { Spinner } from 'shared/ui/Spinner';
import cls from './GraphDuo.module.scss';

const temperatureColor = 'rgb(255, 99, 132)';
const humidityColor = 'rgb(54, 162, 235)';

interface IGraphDuoProps {
    weatherData?: IWeatherResponse,
    unit?: string,
    title?: string,
    days?: number

    className?: string
    // children?: React.ReactNode
}

export const GraphDuo: FC<IGraphDuoProps> = (props) => {
    const {
        className,
        weatherData,
        unit = 'metric',
        title = 'Температура и влажность',
        days = 5,
    } = props;

    if (!weatherData) {
        return <Card className={cn(cls.GraphDuo, {}, [className])}><Spinner /></Card>;
    }

    // Фильтрация данных по датам
    const filterDataByDateRange = (data: IWeatherResponse) => data.list.slice(0, days * 8);

    // Подготовка данных для графика
    const prepareChartData = () => {
        const filteredItems = filterDataByDateRange(weatherData);
        if (!filteredItems || filteredItems.length === 0) return null;

        const times = filteredItems.map((item) => format(new Date(item.dt * 1000), 'dd.MM HH:mm', { locale: ru }));

        const temperatures = filteredItems.map((item) => item.main.temp);
        const humidities = filteredItems.map((item) => item.main.humidity);
        const unitLabel = unit === 'metric' ? '°C' : '°F';

        return {
            times,
            temperatures,
            humidities,
            unitLabel,
            dateRangeLabel: '',
        };
    };

    const chartData = prepareChartData();
    if (!chartData) return <div>Нет данных для отображения</div>;

    return (
        <Card className={cn(cls.GraphDuo, {}, [className])}>
            <Plot
                data={[
                    {
                        x: chartData.times,
                        y: chartData.temperatures,
                        type: 'scatter',
                        mode: 'lines',
                        name: `Температура (${chartData.unitLabel})`,
                        yaxis: 'y1',
                        line: {
                            color: temperatureColor,
                            width: 2,
                        },
                        hovertemplate:
                            '<b>%{x}</b><br>'
                            + `Температура: %{y} ${chartData.unitLabel}<br>`
                            + '<extra></extra>',
                    },
                    {
                        x: chartData.times,
                        y: chartData.humidities,
                        type: 'scatter',
                        mode: 'lines',
                        name: 'Влажность (%)',
                        yaxis: 'y2',
                        line: {
                            color: humidityColor,
                            width: 2,
                        },
                        hovertemplate:
                            '<b>%{x}</b><br>'
                            + 'Влажность: %{y}%<br>'
                            + '<extra></extra>',
                    },
                ] as Data[]}
                layout={{
                    title: { text: `${title}` },
                    xaxis: {
                        title: { text: 'Время' },
                        tickangle: 45,
                        tickfont: { size: 10 },
                    },
                    yaxis: {
                        title: { text: `Температура (${chartData.unitLabel})` },
                        showgrid: false,
                    },
                    yaxis2: {
                        title: { text: 'Влажность (%)' },
                        overlaying: 'y',
                        side: 'right',
                        range: [0, 100], // Влажность в процентах (0-100)
                        showgrid: false,
                    },
                    legend: {
                        orientation: 'h',
                        y: 1.0,
                        x: 0.5,
                        xanchor: 'center',
                    },
                    margin: {
                        l: 50,
                        r: 50,
                        b: 100,
                        t: 50,
                        pad: 10,
                    },
                    hovermode: 'x unified',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                }}
                config={{
                    responsive: true,
                    displayModeBar: true,
                }}
                className={cls.Plot}
            />
        </Card>
    );
};
