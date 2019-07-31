
const UNASSIGNED_PROCEDURES_LABEL = 'Unassigned NEDD Covered';

/**
 *
 * @param inputGroups - array with raw data from back-end
 * @param expand - controling visual expand on grid
 * @param subClassData - when present in create mode else in preview mode
 */
export function mapProcedures(incomeData: any[], subClassData?: any, expand: boolean = false) {
    // Unassigned label should be at the bottom of list
    let unassignedGroup = {};
    // Dates to be used for unassigne procedures
    const effDate = (subClassData && subClassData.effectiveDate) || null;
    const termDate = (subClassData && subClassData.termDate) || null;

    const proceduresList = [];

    if (incomeData.length) {
        incomeData.forEach(groupData => {
            const group = groupData.groupName || UNASSIGNED_PROCEDURES_LABEL;
            const output = {
                data: {
                    code: group
                },
                children: [],
                expanded: expand
            }
            const procedures = formatAgeLimits(groupData.procedures);
            procedures.forEach(procedure => {
                output.children.push({
                    data: changeDateUnassigned(procedure, effDate, termDate)
                });
            });
            // If unassigned save to push at the end
            if (group === UNASSIGNED_PROCEDURES_LABEL) {
                unassignedGroup = { ...output };
            } else {
                proceduresList.push(output);
            }
        });
        // Unassigned group at the end of list
        proceduresList.push(unassignedGroup);
    };

    return proceduresList;
}

/*
 * Assignes dates to unassigned procedure when create benClass or subClass
 */
export function changeDateUnassigned(procedure: IProcedureAgeLimit, effDate: Date, termDate: Date): IProcedureAgeLimit {
    if (procedure.id === 0) {
        procedure.dateFrom = effDate;
        procedure.dateTo = termDate || null;
    }
    return procedure;
};

/*
 * Add ageLimits array to procedures
 */
export function formatAgeLimits(procedures: Procedure[]): IProcedureAgeLimit[] {
    let output = {};
    let proceduresAgeLimits: IProcedureAgeLimit[] = [];

    procedures.forEach(procedure => {
        const { ageLow, ageHigh, ...procedureNoAges } = procedure;

        if (!output[procedure.code]) {
            output[procedure.code] = {
                ...procedureNoAges,
                ageLimits: [{ ageLow, ageHigh }]
            }
        } else {
            output[procedure.code].ageLimits.push({ ageLow, ageHigh })
        }
    });
    let groups = Object.keys(output);
    if (groups) {
        proceduresAgeLimits = groups.map(key => output[key]);
    }

    return proceduresAgeLimits;
}
