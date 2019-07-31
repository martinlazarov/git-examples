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

describe('pipe transform method', () => {
    it('should return a string of single ageLimit', () => {
        const procedureNoAgeLimitArray = { ...mockProcedure4 };
        const result = `${procedureNoAgeLimitArray.ageLow}-${procedureNoAgeLimitArray.ageHigh}`;

        expect(pipe.transform(procedureNoAgeLimitArray)).toEqual(result);
    });

    it('should return a string of multiple ageLimits', () => {
        const procedureAgeLimitArray = { ...mockProcedureAgeLimit };
        const forResultAgeLimit = {
            ageLimits: [
                { ageLow: 2, ageHigh: 6 },
                { ageLow: 8, ageHigh: 10 }
            ]
        };
        const result = pipe.transform(forResultAgeLimit);

        expect(pipe.transform(procedureAgeLimitArray)).toEqual(result);
    });

    it('should return empty string', () => {
        const procedureAgeLimitArray = { ...mockProcedureAgeLimit };
        procedureAgeLimitArray.ageLimits = [
            { ageLow: null, ageHigh: null },
            { ageLow: null, ageHigh: null }
        ];

        expect(pipe.transform(procedureAgeLimitArray)).toEqual('');
    });
})

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

describe('addProceduresToClass', () => {
    it('returns data with isCustom = 0', () => {
        const result = createClassFunc.addProceduresToClass(mockProceduresData);
        expect(result[0].isCustom).toEqual(0);
    })
    it('returns data with benClassId = 0', () => {
        const result = createClassFunc.addProceduresToClass(mockProceduresData);
        expect(result[0].isCustom).toEqual(0);
    })
    it('returns data with dateFrom = effDate', () => {
        const effDate = new Date('06/08/2019');
        const result = createClassFunc.addProceduresToClass(mockProceduresData, effDate);
        expect(result[0].dateFrom).toEqual(effDate);
    })
})

describe('SomeTestCases', () => {
    it('returns mapped data with expanded=false', () => {
        const result = utils.mapProceduresWhenEdit(mockProceduresList, mockSubClassData, false);
        expect(result.length).toEqual(1);
        expect(result[0].expanded).toBe(false);
    });
    it('returns data with dateFrom = effDate', () => {
        const effDate = new Date('06/08/2019');
        const result = createClassFunc.addProceduresToClass(mockProceduresData, effDate);
        expect(result[0].dateFrom).toEqual(effDate);
    })
    it('returns dateFrom: effDate, dateTo:termDate', () => {
        const effDate = new Date('06/08/2019');
        const termDate = new Date('06/20/2019');
        const result = utils.changeExistingEffDate(mockProceduresList, effDate, termDate);
        expect(result[0].dateFrom.getTime()).toEqual(effDate.getTime());
        expect(result[0].dateTo.getTime()).toEqual(termDate.getTime());
    });
})

// TODO test
// describe('markFormAsPristine', () => {
//     it('should mark a form as pristine', () => {
//         const testForm = mockForm;
//         console.log(testForm);
//         formAsPristine.markFormAsPristine(testForm);
//         expect(testForm.value.description).toBe('ggg')
//     })
// })

