/**
 * Created by abayjanov on 19.12.2024
 */
import { FC } from 'react';
import { FieldSelect, IFieldSelectProps } from '../FieldSelect';
import { ISelectOption } from '../../Select/Select';

export const simpleBooleanSelectList: ISelectOption[] = [
    { id: 'true', name: 'Да' },
    { id: 'false', name: 'Нет' },
];

type IFieldRadioSelectProps = Omit<IFieldSelectProps, 'options'>

export const FieldRadioSelect: FC<IFieldRadioSelectProps> = (props) => (
    <FieldSelect {...props} options={simpleBooleanSelectList} />
);
