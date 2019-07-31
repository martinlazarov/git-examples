
export function addProceduresToClass(procedure: any[], effDate?: any) {
    let tranformedPr = []
    procedure.forEach(element => {
        element.data.isCustom = 0;
        element.data.benClassId = 0;
        if (effDate) {
            element.data.dateFrom = effDate;
        }
        tranformedPr.push(element.data)
    });
    return tranformedPr;
}
