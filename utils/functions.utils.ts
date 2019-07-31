import { Procedure } from '../interfaces/benefit-class/procedure';

const UNASSIGNED_PROCEDURES_LABEL = 'Unassigned';

export function fitlerProceduresByCodeAndDescription(procedures: any, searchParam: string) {
    let filteredOutput = [];
    if (!procedures) {
        return [];
    }

    procedures.map((group) => {
        let output = {}
        output['groupName'] = group.groupName;
        output['children'] = group.children;
        output['isSubclass'] = group.isSubclass;
        output['procedures'] = filterProcedure(group.procedures, searchParam);

        filteredOutput.push(output);
    })
    return filteredOutput;
}

export function filterProcedure(procedures: any, search: any) {
    return procedures.filter(p => {
        return p.code.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
    })
}

export function mapProceduresWhenEdit(procedures: any, subClassData: any, expand: boolean = false) {
    let output = {};
    let proceduresList = [];
    // Add respective to class effDate and termDate
    const proceduresTermDate = changeExistingEffDate(procedures, subClassData.effectiveDate, subClassData.termDate);
    proceduresTermDate.forEach(procedure => {
        const group = procedure.benClassName || UNASSIGNED_PROCEDURES_LABEL;

        if (!output[group]) {
            output[group] = {
                data: {
                    code: group
                },
                children: [],
                expanded: expand
            }
        }
        output[group].children.push({
            data: procedure
        });
    });
    let groups = Object.keys(output);
    if (groups) {
        proceduresList = groups.map(key => output[key]);
    }

    return proceduresList;
}

export function mapProceduresWhenView(procedures: any) {
    let output = {};
    let proceduresList = [];
    if (procedures) {
        procedures.forEach(procedure => {
            if (!output[procedure.code]) {
                output[procedure.code] = {
                    data: procedure
                }
            } else if (output[procedure.code]) {
                /*
                * Custom procedure with multiple age limits
                * Coming as multiple procedures from back-end
                * needs to be displayed as one procedure with multi age limits
                */
                if (!output[procedure.code].data.ageLimits) {
                    const { ageLow: ageLowNew, ageHigh: ageHighNew, ...procedureNoAges } = procedure;
                    const { ageLow: ageLowOld, ageHigh: ageHighOld } = output[procedure.code].data;
                    const ageLimitsArr = [
                        {
                            ageLow: ageLowOld,
                            ageHigh: ageHighOld
                        },
                        {
                            ageLow: ageLowNew,
                            ageHigh: ageHighNew
                        }
                    ];
                    output[procedure.code].data = { ...procedureNoAges, ...{ ageLimits: ageLimitsArr } }
                } else {
                    const { ageLow, ageHigh } = procedure;
                    output[procedure.code].data.procedure.ageLimits.push({ ageLow, ageHigh });
                }
            }
        })
    }
    let groups = Object.keys(output);
    if (groups) {
        proceduresList = groups.map(key => output[key]);
    }

    return proceduresList;
}

// Takes dates from class and assign same to procedure
export function changeExistingEffDate(procedures: Procedure[], effDate: Date, termDate: Date): Procedure[] {
    return procedures.map(procedure => {
        procedure.dateFrom = effDate;
        procedure.dateTo = termDate || null;
        return procedure;
    });
}

// Nesting for Benefit class
export function mapProcedureToData(proceduresArray) {
    let proceduresData = [];
    if (proceduresArray && proceduresArray.length) {
        proceduresArray.forEach(procedure => {
            let parentProcedure = {
                data: procedure
            }
            proceduresData.push(parentProcedure);
        });
    }

    return proceduresData;
}


function ageLimitRowData(ageLow: number, ageHigh: number): string {
    if (ageLow && ageHigh) {
        return ageLow + "-" + ageHigh;
    } else if (!ageLow && ageHigh) {
        return ">" + ageHigh;
    } else if (ageLow && !ageHigh) {
        return "<" + ageLow
    } else {
        return null;
    }
}

export function transform(rowData: any, ): any {
    if (!rowData.ageLimits) {
        return ageLimitRowData(rowData.ageLow, rowData.ageHigh);
    }
    return rowData.ageLimits
        .map(age => ageLimitRowData(age.ageLow, age.ageHigh))
        .filter(age => age !== null)
        .join(', ');
}
