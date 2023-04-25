import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DATA";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DATA":
      return {
        ...state,
        patient: {
          ...action.payload,
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: {
            ...state.patient.entries, [action.payload.id]: action.payload
          }
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST", payload: patientListFromApi 
  };
};

export const setDiagnosesList = (diagnoseListFromApi: Diagnosis[]) : Action => {
  return {
    type: "SET_DIAGNOSE_LIST", payload: diagnoseListFromApi 
  };
};


export const addPatient = (newPatient: Patient) : Action => {
  return {
    type: "ADD_PATIENT", payload: newPatient
  };
};

export const addEntry = (newEntry: Entry) : Action => {
  return {
    type: "ADD_ENTRY", payload: newEntry
  };
};

export const setPatientData = (patientDataFromApi: Patient) : Action => {
  return { type: "SET_PATIENT_DATA", payload: patientDataFromApi };
};

