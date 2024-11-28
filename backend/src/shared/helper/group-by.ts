export enum AggregationType {
  SUM = 'sum',
  MULTIPLICATION = 'multiplication',
  SUBTRACTION = 'subtraction',
  MEDIAN = 'median',
  AVERAGE = 'average',
  COUNT = 'count',
  MAX = 'max',
  MIN = 'min',
  SELECT = 'SELECT',
}

export interface Aggregation {
  type: AggregationType;
  as?: string;
}

export interface GroupByOptions {
  [key: string]: Aggregation;
}

export const groupBy = function <T extends Record<string, any>>(
  data: T[],
  key: keyof T,
  options: GroupByOptions = {}
): Record<string | number, Partial<T>>[] {
  return Object.entries(
    data.reduce((result: Record<string | number, T[]>, currentValue: T) => {
      const group = currentValue[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(currentValue);
      return result;
    }, {})
  ).map(([group, values]) => {
    if (Object.keys(options).length > 0) {
      const aggregatedValues: any = {};
      Object.keys(options).forEach((attr: string) => {
        const { type, as } = options[attr]!;
        switch (type) {
          case AggregationType.SUM:
            aggregatedValues[as ?? attr] = sum<T>(attr, values);
            break;
          case AggregationType.MULTIPLICATION:
            aggregatedValues[as ?? attr] = multiplication<T>(attr, values);
            break;
          case AggregationType.SUBTRACTION:
            aggregatedValues[as ?? attr] = subtraction<T>(attr, values);
            break;
          case AggregationType.MEDIAN:
            aggregatedValues[as ?? attr] = median<T>(attr, values);
            break;
          case AggregationType.AVERAGE:
            aggregatedValues[as ?? attr] = average<T>(attr, values);
            break;
          case AggregationType.COUNT:
            aggregatedValues[as ?? attr] = count<T>(values);
            break;
          case AggregationType.MAX:
            aggregatedValues[as ?? attr] = max<T>(attr, values);
            break;
          case AggregationType.MIN:
            aggregatedValues[as ?? attr] = min<T>(attr, values);
            break;
          case AggregationType.SELECT:
            aggregatedValues[as ?? attr] = values[0][attr];
            break;
          default:
            aggregatedValues[as ?? attr] = null;
        }
      });
      return { [key]: group, ...aggregatedValues };
    } else {
      return { [key]: group, ...values };
    }
  });
};

const sum = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return values.reduce((acc: number, curr: T) => acc + Number(curr[attr]), 0);
};

const multiplication = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return values.reduce((acc: number, curr: T) => acc * Number(curr[attr]), 1);
};

const subtraction = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return values.reduce((acc: number, curr: T) => acc - Number(curr[attr]), 0);
};

const median = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  const sortedValues = values.map(obj => Number(obj[attr])).sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);
  return sortedValues.length % 2 !== 0
    ? sortedValues[middleIndex]
    : (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
};

const average = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return values.reduce((acc: number, curr: T) => acc + Number(curr[attr]), 0) / values.length;
};

const count = function <T extends Record<string, any>>(values: T[]): number {
  return values.reduce((acc: number) => acc + 1, 0);
};

const max = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return Math.max(...values.map(obj => Number(obj[attr])));
};

const min = function <T extends Record<string, any>>(attr: string, values: T[]): number {
  return Math.min(...values.map(obj => Number(obj[attr])));
};
