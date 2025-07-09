import React, { FC, useState } from 'react';
import { doPrepareChartData, IPreparedData } from 'entities/Weather';
import Plot from 'react-plotly.js';
import { FieldSelect } from 'shared/ui/FieldSelect';
import { EFieldSelectTheme } from 'shared/ui/FieldSelect/FieldSelect';

import { TextM } from 'shared/ui/Text';
import { Card } from 'shared/ui/Card';
import { cn } from 'shared/lib/classNames/classNames';
import { IWeatherResponse } from 'entities/Weather/model/types/types';
import { Spinner } from 'shared/ui/Spinner';
import cls from './GraphLinear.module.scss';

interface IGraphLinearProps {
    className?: string
    weatherData?: IWeatherResponse
    days: number
    unit: 'imperial' | 'metric'
    // children?: React.ReactNode
}
type TChartMode = 'markers' | 'lines' | 'lines+markers'
const dotTypes = [
    { id: 'markers', name: 'Точки' },
    { id: 'lines', name: 'Линия' },
    { id: 'lines+markers', name: 'Линия+точки' },
];

const chartConfig = {
    dataType: 'temperature', // 'temperature', 'humidity', 'pressure', 'wind'
    chartType: 'line', // 'line', 'bar', 'scatter', 'area'
    showMovingAverage: false,
    showTrendLine: false,
};

export const GraphLinear: FC<IGraphLinearProps> = (props) => {
    const {
        className,
        weatherData: data,
        unit,
        days = 5,
    } = props;

    const [chartMode, setChartMode] = useState<string>(() => 'lines');

    if (!data) {
        return <Card className={cn(cls.GraphLinear, {}, [className])}><Spinner /></Card>;
    }

    const preparedWeatherData = doPrepareChartData(data, days);

    if (!preparedWeatherData) return <div>Нет данных для отображения</div>;
    return (
        <Card className={cn(cls.GraphLinear, {}, [className])}>
            <div className={cls.configGroup}>
                <TextM title="Линейный график" justify="center" />
                <FieldSelect
                    label="Отображение данных"
                    options={dotTypes}
                    theme={EFieldSelectTheme.SMALL}
                    value={chartMode}
                    onChange={(e) => setChartMode(e)}
                />
            </div>

            <Plot
                data={[
                    {
                        x: preparedWeatherData.times,
                        y: preparedWeatherData.temperatures,
                        type: 'scatter',
                        mode: chartMode as TChartMode,
                        name: `Температура (${unit === 'metric' ? '°C' : '°F'})`,
                        // line: {color: 'rgb(255, 99, 132)', width: 2},
                        // marker: {size: 8},
                        marker: chartConfig.chartType === 'bar'
                            ? { color: preparedWeatherData.color }
                            : { color: preparedWeatherData.color, size: 8 },
                        line: chartConfig.chartType !== 'bar'
                            ? { color: preparedWeatherData.color, width: 2 } : undefined,
                        hovertemplate:
                            '<b>%{x}</b><br>'
                            + `Температура: %{y} ${unit === 'metric' ? '°C' : '°F'}<br>`
                            + '<extra></extra>',
                    },
                ]}
                layout={{
                    title: { text: 'Изменение температуры' },
                    xaxis: { title: { text: 'Время' } },
                    yaxis: { title: { text: `Температура (${unit === 'metric' ? '°C' : '°F'})` } },
                    hovermode: 'closest',
                    showlegend: false,
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',

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
