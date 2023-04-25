import React, { createContext, useContext, useReducer } from "react";
import { Patient, Gender, HealthCheckRating, Diagnosis} from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnoses: { [id: string]: Diagnosis }
};

const initialState: State = {
  patients: {},
  patient: {
    name: '',
    dateOfBirth: '',
    ssn: '',
    gender: Gender.Other,
    occupation: '',
    id: '',
    entries: [{
      id: '',
      description: '',
      date: '',
      specialist: '',
      type: "HealthCheck",
      healthCheckRating: HealthCheckRating.Healthy,
    }],
  },
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
