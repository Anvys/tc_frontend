import { useEffect, useState } from 'react';
import { mockWeatherData } from 'shared/const/mockWeatherData';
import { GraphLinear } from 'pages/WeatherPage/ui/GraphLinear/GraphLinear';
import { doPrepareChartData } from 'entities/Weather';
import { IWeatherResponse } from 'entities/Weather/model/types/types';
import { Page } from 'shared/ui/Page';
import { GraphGiso } from 'pages/WeatherPage/ui/GraphGisto/GraphGiso';
import { GraphAvg } from 'pages/WeatherPage/ui/GraphAvg/GraphAvg';
import { GraphDuo } from 'pages/WeatherPage/ui/GraphDuo/GraphDuo';
import { TextM } from 'shared/ui/Text';
import { FieldSelect } from 'shared/ui/FieldSelect';
import { Spinner } from 'shared/ui/Spinner';
import axios from 'axios';
import cls from './WeatherPage.module.scss';
import { dayList, unitList } from '../../const/optionsList';

type TWeather = {
    forecast: IWeatherResponse
}

const city = 'Moscow';

export const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState<TWeather | null>(null);
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [forecastDays, setForecastDays] = useState(3);

    const preparedWeatherData = weatherData?.forecast ? doPrepareChartData(weatherData?.forecast, forecastDays) : null;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);

                axios.get(
                    `${__OPENWEATHERAPI__}?q=Moscow&units=${unit}&appid=${__OPENWEATHERAPIKEY__}`,
                ).then((r) => {
                    setWeatherData({ // @ts-ignore
                        forecast: r.data,
                    });
                })
                    .catch((r) => {
                        setWeatherData({ // @ts-ignore
                            forecast: mockWeatherData,
                        });
                    });

                // setTimeout(
                //     () => {
                //         setWeatherData({ // @ts-ignore
                //             forecast: mockWeatherData,
                //         });
                //         setLoading(false);
                //     },
                //     1500,
                // );
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [unit]);

    // if (loading) {
    //     return <Page><Spinner className={cls.spinner} /></Page>;
    // }

    return (
        <Page>
            <div className={cls.SettingsBar}>
                <TextM title="Метеорологическая панель для города: Москва" />

                {/* <TextM text="Город: Москва" /> */}

                <div className={cls.control}>
                    <FieldSelect
                        label="Единицы измерения:"
                        value={unit}
                        options={unitList}
                        onChange={(e) => setUnit(e)}
                    />

                    <FieldSelect
                        label="Дней прогноза:"
                        value={forecastDays}
                        options={dayList}
                        onChange={(e) => setForecastDays(e)}
                    />
                </div>

            </div>

            {/* {weatherData?.forecast && preparedWeatherData && ( */}
            <div className={cls.plots}>
                <GraphLinear
                    weatherData={weatherData?.forecast}
                    unit={unit}
                    days={forecastDays}
                    className={cls.Plot}
                />
                <GraphGiso
                    weatherData={weatherData?.forecast}
                    unit={unit}
                    days={forecastDays}
                    className={cls.Plot}
                />
                <GraphAvg
                    weatherData={weatherData?.forecast}
                    unit={unit}
                    days={forecastDays}
                    className={cls.Plot}
                />
                <GraphDuo
                    weatherData={weatherData?.forecast}
                    unit={unit}
                    days={forecastDays}
                    className={cls.Plot}
                />

            </div>
            {/* )} */}
        </Page>
    );
};
