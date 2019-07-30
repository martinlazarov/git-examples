import { Procedure, IProcedureAgeLimit } from 'src/app/shared/interfaces';

export function ageLimiToProcedure(procedures: Procedure[]): IProcedureAgeLimit[] {
  let procedureToSend : IProcedureAgeLimit[] = [];

  procedures.map(procedure => {
      const {ageHigh, ageLow, ...data} = procedure;

      if (!procedureToSend.length) {
          procedureToSend[0] = {
              ...data,
              ageLimits: [{ageLow, ageHigh}]
          }
      } else {
          procedureToSend.forEach(pts => {
              if(pts.code === procedure.code) {
                  pts.ageLimits.push({ageHigh, ageLow})
              } else {
                  const procedureChanged: IProcedureAgeLimit = {
                      ...data,
                      ageLimits: [{ageLow, ageHigh}]
                  }
                  procedureToSend.push(procedureChanged)
              }
          })
      }
  })

  return procedureToSend;

}
