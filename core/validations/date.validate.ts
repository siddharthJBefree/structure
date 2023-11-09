import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

const DATE_FORMAT: string = 'YYYY-MM-DD';

export const LessThanToday = (): ValidatorFn => {
  return (control: AbstractControl<FormControl>): ValidationErrors | null => {
    const today = moment();
    const value = moment(control.getRawValue() || '');

    if (!today || !value) return null;

    if (value.isAfter(today, 'day')) {
      return {lessThanDay: {day: today.add(1, 'd').format(DATE_FORMAT)}};
    }
    return null;
  };
};

export const GraterThanToday = (): ValidatorFn => {
  return (control: AbstractControl<FormControl>): ValidationErrors | null => {
    const today = moment();
    const value = moment(control.getRawValue());

    if (!today || !value) return null;

    if (today.isAfter(value, 'day')) {
      return {graterThanDay: {day: today.add(1, 'd').format(DATE_FORMAT)}};
    }
    return null;
  };
};

export const LessThanDay = (day: Date): ValidatorFn => {
  return (control: AbstractControl<FormControl>): ValidationErrors | null => {
    const value = moment(control.getRawValue() || '');
    const comparisonDay = moment(day);

    if (!value || !comparisonDay) return null;

    if (value.isAfter(comparisonDay, 'day')) {
      return {lessThanDay: {day: comparisonDay.add(1, 'd').format(DATE_FORMAT)}};
    }
    return null;
  };
};

export const GraterThanDay = (day: Date): ValidatorFn => {
  return (control: AbstractControl<FormControl>): ValidationErrors | null => {
    const value = moment(control.getRawValue() || '');
    const comparisonDay = moment(day);

    if (!value || !comparisonDay) return null;

    if (comparisonDay.isAfter(value, 'day')) {
      return {graterThanDay: {day: comparisonDay.add(1, 'd').format(DATE_FORMAT)}};
    }
    return null;
  };
};
