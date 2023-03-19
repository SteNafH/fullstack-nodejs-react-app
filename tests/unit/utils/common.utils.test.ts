import { multipleColumnSet, multipleFilterSet } from '../../../src/utils/common.utils';

describe('Common Utils', () => {
    describe('multipleColumnSet', () => {
        test('returns the correct columnSet and values', () => {
            const inputObject = { id: 1, name: 'John Doe' };
            const expectedColumnSet = 'id = ?, name = ?';
            const expectedValues = [1, 'John Doe'];
            const result = multipleColumnSet(inputObject);
            expect(result.columnSet).toBe(expectedColumnSet);
            expect(result.values).toEqual(expectedValues);
        });
    });

    describe('multipleFilterSet', () => {
        test('returns the correct filterSet and filterValues when all values are single values', () => {
            const inputObject = { id: 1, name: 'John Doe' };
            const expectedFilterSet = 'id = ? AND name = ?';
            const expectedFilterValues = [1, 'John Doe'];
            const result = multipleFilterSet(inputObject);
            expect(result.filterSet).toBe(expectedFilterSet);
            expect(result.filterValues).toEqual(expectedFilterValues);
        });

        test('returns the correct filterSet and filterValues when some values are arrays', () => {
            const inputObject = { id: 1, name: 'John Doe', age: [20, 30] };
            const expectedFilterSet = 'id = ? AND name = ? AND age IN (?)';
            const expectedFilterValues = [1, 'John Doe', [20, 30]];
            const result = multipleFilterSet(inputObject);
            expect(result.filterSet).toBe(expectedFilterSet);
            expect(result.filterValues).toEqual(expectedFilterValues);
        });
    });
});
