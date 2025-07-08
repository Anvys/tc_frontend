import { FC, useState } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import Plot from 'react-plotly.js';
import { IWeatherResponse } from 'entities/Weather/model/types/types';
import { Card } from 'shared/ui/Card';
import cls from './GraphGiso.module.scss';

interface IGraphGisoProps {
    weatherData: IWeatherResponse,
    unit: string,
    days: number
    color? : string,
    title?: string,

    className?: string
    // children?: React.ReactNode
}

export const GraphGiso: FC<IGraphGisoProps> = (props) => {
    const {
        className,
        weatherData,
        unit = 'metric',
        days = 5,
        color = 'rgba(255, 99, 132, 0.7)',
        title = 'Распределение температуры',
    } = props;

    const [binSize, setBinSize] = useState<number>(() => 1);

    // Фильтрация данных по датам
    const filterDataByDateRange = (data: IWeatherResponse) => data.list.slice(0, days * 8); // 8 точек в день (каждые 3 часа)

    // Подготовка данных для гистограммы
    const prepareHistogramData = () => {
        const filteredItems = filterDataByDateRange(weatherData);
        if (!filteredItems || filteredItems.length === 0) {
            return null;
        }

        const temperatures = filteredItems.map((item) => item.main.temp);
        const unitLabel = unit === 'metric' ? '°C' : '°F';

        return {
            temperatures,
            unitLabel,
            dateRangeLabel: '',
        };
    };

    const histogramData = prepareHistogramData();
    if (!histogramData) return <div>Нет данных для отображения</div>;
    return (
        <Card className={cn(cls.GraphGiso, {}, [className])}>
            <div className={cls.configGroup}>
                <div className="control">
                    <label>
                        Размер интервала:
                        <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={binSize}
                            onChange={(e) => setBinSize(+e.target.value)}
                            // disabled
                        />
                    </label>
                    <span>
                        {binSize}
                        {' '}
                        {histogramData.unitLabel}
                    </span>
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: histogramData.temperatures,
                        type: 'histogram',
                        name: 'Распределение температуры',
                        marker: { color },
                        xbins: {
                            size: binSize,
                            start: Math.min(...histogramData.temperatures) - binSize,
                            end: Math.max(...histogramData.temperatures) + binSize,
                        },
                        hovertemplate:
                            '<b>Диапазон: %{x}</b><br>'
                            + 'Количество: %{y}<br>'
                            + '<extra></extra>',
                    },
                ]}
                layout={{
                    title: { text: `${title}` },
                    xaxis: {
                        title: { text: `Температура (${histogramData.unitLabel})` },
                        tickvals: Array.from(
                            { length: Math.ceil((Math.max(...histogramData.temperatures) - Math.min(...histogramData.temperatures)) / binSize) + 1 },
                            (_, i) => Math.min(...histogramData.temperatures) + i * binSize,
                        ),
                    },
                    yaxis: { title: { text: 'Количество измерений' } },
                    bargap: 0.05,
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
