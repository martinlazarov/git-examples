import * as utils from "./functions.utils";
import * as createClassFunc from "./create-class-func";
import * as formAsPristine from "./form-as-pristine";
import { mockProceduresList, mockSubClassData, mockProceduresData, mockForm } from './mock-data';
import { FormsModule } from '@angular/forms';

describe('fitlerProceduresByCodeAndDescription', () => {
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription([], 'test');
        expect(found.length).toEqual(0);
    });
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(null, 'test');
        expect(found.length).toEqual(0);
    });
    it('returns 1 result', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(mockProceduresList, 'D0120');
        expect(found.length).toEqual(1);
    });
});

describe('mapProceduresWhenView', () => {
    it('returns mapped procedures (6)', () => {

        const result = utils.mapProceduresWhenView(mockProceduresList);
        expect(result.length).toEqual(6);
    });
});

describe('changeExistingEffDate', () => {
    it('returns dateFrom: effDate, dateTo:termDate', () => {
        const effDate = new Date('06/08/2019');
        const termDate = new Date('06/20/2019');
        const result = utils.changeExistingEffDate(mockProceduresList, effDate, termDate);
        expect(result[0].dateFrom.getTime()).toEqual(effDate.getTime());
        expect(result[0].dateTo.getTime()).toEqual(termDate.getTime());
    });
    it('returns dateFrom: effDate, dateTo:null', () => {
        const effDate = new Date('06/08/2019');
        const result = utils.changeExistingEffDate(mockProceduresList, effDate, null);
        expect(result[0].dateFrom.getTime()).toEqual(effDate.getTime());
        expect(result[0].dateTo).toBe(null);
    });
});

describe('mapProceduresWhenEdit', () => {
    it('returns mapped data with expanded=true', () => {
        const result = utils.mapProceduresWhenEdit(mockProceduresList, mockSubClassData, true);
        expect(result.length).toEqual(1);
        expect(result[0].expanded).toBe(true);
    });
    it('returns mapped data with expanded=false', () => {
        const result = utils.mapProceduresWhenEdit(mockProceduresList, mockSubClassData);
        expect(result.length).toEqual(1);
        expect(result[0].expanded).toBe(false);
    });
    it('returns mapped data with expanded=false', () => {
        const result = utils.mapProceduresWhenEdit(mockProceduresList, mockSubClassData, false);
        expect(result.length).toEqual(1);
        expect(result[0].expanded).toBe(false);
    });
});