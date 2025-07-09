import React, { FC, useState } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { IWeatherResponse } from 'entities/Weather/model/types/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { Card } from 'shared/ui/Card';
import { Spinner } from 'shared/ui/Spinner';
import cls from './GraphAvg.module.scss';

interface IGraphAvgProps {
    weatherData?: IWeatherResponse,
    days: number,
    unit?: string,
    title?: string,
    showRawData?: boolean

    className?: string
    // children?: React.ReactNode
}

const lineColor = 'rgb(255, 99, 132)';
const maColor = 'rgb(255, 165, 0)';

export const GraphAvg: FC<IGraphAvgProps> = (props) => {
    const {
        className,
        weatherData,
        unit = 'metric',
        days = 5,
        showRawData = true,

        title = 'Температура с скользящей средней',

    } = props;

    const [wndSize, setWndSize] = useState<number>(() => 3);

    if (!weatherData) {
        return (
            <Card className={cn(cls.GraphAvg, {}, [className])}>
                <Spinner />
            </Card>
        );
    }

    // Фильтрация данных по датам
    const filterDataByDateRange = (data: IWeatherResponse) => data.list.slice(0, days * 8);

    // Расчет скользящей средней
    const calculateMovingAverage = (values: number[], size: number) => values.map((val, idx, arr) => {
        const start = Math.max(0, idx - size + 1);
        const end = idx + 1;
        const subset = arr.slice(start, end);
        return subset.reduce((a, b) => a + b, 0) / subset.length;
    });

    // Подготовка данных для графика
    const prepareChartData = () => {
        const filteredItems = filterDataByDateRange(weatherData);
        if (!filteredItems || filteredItems.length === 0) return null;

        const times = filteredItems.map((item) => format(new Date(item.dt * 1000), 'dd.MM HH:mm', { locale: ru }));

        const temperatures = filteredItems.map((item) => item.main.temp);
        const movingAverage = calculateMovingAverage(temperatures, wndSize);
        const unitLabel = unit === 'metric' ? '°C' : '°F';

        return {
            times,
            temperatures,
            movingAverage,
            unitLabel,
            dateRangeLabel: '',
        };
    };

    const chartData = prepareChartData();
    if (!chartData) return <div>Нет данных для отображения</div>;

    const plotData = [];

    if (showRawData) {
        plotData.push({
            x: chartData.times,
            y: chartData.temperatures,
            type: 'scatter',
            mode: 'lines',
            name: `Температура (${chartData.unitLabel})`,
            line: { color: lineColor, width: 1 },
            opacity: 0.5,
            hovertemplate:
                '<b>%{x}</b><br>'
                + `Температура: %{y} ${chartData.unitLabel}<br>`
                + '<extra></extra>',
        });
    }

    plotData.push({
        x: chartData.times,
        y: chartData.movingAverage,
        type: 'scatter',
        mode: 'lines',
        name: `Скользящая средняя (окно=${wndSize})`,
        line: { color: maColor, width: 3 },
        hovertemplate:
            '<b>%{x}</b><br>'
            + `Средняя температура: %{y:.1f} ${chartData.unitLabel}<br>`
            + '<extra></extra>',
    });

    return (
        <Card className={cn(cls.GraphAvg, {}, [className])}>
            <div className={cls.configGroup}>
                <div className="control">
                    <label>
                        Размер окна:
                        <input
                            type="range"
                            min="2"
                            max="10"
                            step="1"
                            value={wndSize}
                            onChange={(e) => setWndSize(+e.target.value)}
                        />
                    </label>
                    <span>
                        {wndSize}
                        {' '}
                        точек
                    </span>
                </div>
            </div>

            <Plot
                data={plotData as Data[]}
                layout={{
                    title: { text: `${title}` },
                    xaxis: { title: { text: 'Время' }, tickangle: -45 },
                    yaxis: { title: { text: `Температура (${chartData.unitLabel})` } },
                    hovermode: 'closest',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    // showlegend: true,
                    legend: {
                        orientation: 'h',
                        y: 1.1,
                        x: 0.5,
                        xanchor: 'center',
                    },
                }}
                config={{
                    displayModeBar: true,
                    responsive: true,

                }}
                className={cls.Plot}
            />

        </Card>
    );
};
