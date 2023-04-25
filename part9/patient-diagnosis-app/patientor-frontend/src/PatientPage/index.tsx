import React, { useEffect } from "react";
import axios from "axios";
import { Diagnosis, Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import { setPatientData, useStateValue, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddOccupationalEntryModal from "../AddOccupationalEntryModal";
import AddHospitalEntryModal from "../AddHospitalEntryModal";
import AddHealthCheckEntryModal from "../AddHealthCheckEntryModal";
import { OccupationalEntryFormValues } from "../AddOccupationalEntryModal/AddOccupationalEntryForm";
import { Button } from "@material-ui/core";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string>();

  const [OccupationalOpen, setOccupationalOpen] = React.useState<boolean>(false);
  const [HospitalOpen, setHospitalOpen] = React.useState<boolean>(false);
  const [HealthCheckOpen, setHealthCheckOpen] = React.useState<boolean>(false);

  const openOccupational = (): void => setOccupationalOpen(true);
  const openHospital = (): void => setHospitalOpen(true);
  const openHealthCheck = (): void => setHealthCheckOpen(true);

  const closeModal = (): void => {
    setOccupationalOpen(false);
    setHospitalOpen(false);
    setHealthCheckOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: OccupationalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries/`,
        values
      );
      if (newEntry) {
        dispatch(addEntry(newEntry));
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const { id } = useParams<{ id: string }>();
  const patientEntries = patient.entries;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          if (patient.id !== id){
            const { data: patientDataFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            for (let indexEntry = 0; indexEntry < patientDataFromApi.entries.length; indexEntry++) {
              if (patientDataFromApi.entries[indexEntry].diagnosisCodes !== undefined){
                for (let index = 0; index < patientDataFromApi.entries[indexEntry].diagnosisCodes!.length; index++) {
                  try {
                    const { data: diagnosisDataFromApi } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${patientDataFromApi.entries[indexEntry].diagnosisCodes![index]}`);
                    patientDataFromApi.entries[indexEntry].diagnosisCodes![index] = patientDataFromApi.entries[indexEntry].diagnosisCodes![index] + ' ' + diagnosisDataFromApi.name;
                  } catch (e: unknown) {
                    if (axios.isAxiosError(e)) {
                      console.error(e?.response?.data || "Unrecognized axios error");
                      setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                    } else {
                      console.error("Unknown error", e);
                      setError("Unknown error");
                    }
                  }
                }
              }
            }
            if (patientDataFromApi) {
              dispatch(setPatientData(patientDataFromApi));
            }
          }
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const divStyle = {
    border: 'solid',
    margin: '4px',
  };

  const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    let healthCheckRating = 0;
    if('healthCheckRating' in entry){
      healthCheckRating = entry.healthCheckRating;
    }
    return (
      <div style={divStyle}>
        {entry.date} <MedicalServicesIcon/><br/>
        <i>{entry.description}</i>
        <ul>
        {entry.diagnosisCodes && Object.values(entry.diagnosisCodes).map((code: string) => (
          <li key={code}>{code}</li>
        ))}
        </ul>
        {healthCheckRating === 0 && <FavoriteIcon style={{color: 'green'}}/>}
        {healthCheckRating === 1 && <FavoriteIcon style={{color: 'yellow'}}/>}
        {healthCheckRating === 2 && <FavoriteIcon style={{color: 'red'}}/>}
        {healthCheckRating === 3 && <FavoriteIcon style={{color: 'black'}}/>}
        <br/>
        diagnose by {entry.specialist}
      </div>
    );
  };

  const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    let discharge = {date: '', criteria: ''};
    if('discharge' in entry){
      discharge = entry.discharge;
    }

    return (
      <div style={divStyle}>
        {entry.date} <LocalHospitalIcon/><br/>
        <i>{entry.description}</i>
        <ul>
        {entry.diagnosisCodes && Object.values(entry.diagnosisCodes).map((code: string) => (
          <li key={code}>{code}</li>
        ))}
        </ul>
        Discharge on: {discharge.date}
        <br/>
        Discharge criteria: {discharge.criteria}
        <br/>
        diagnose by {entry.specialist}
      </div>
    );
  };

  const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    let employerName = '';
    let sickLeave = {startDate: '', endDate: ''};
    if('employerName' in entry){
      employerName = entry.employerName;
    }
    if('sickLeave' in entry) {
      sickLeave = entry.sickLeave as {startDate: string, endDate: string};
    }
    return (
      <div style={divStyle}>
        {entry.date} <WorkIcon/> {employerName}<br/>
        <i>{entry.description}</i>
        <ul>
        {entry.diagnosisCodes && Object.values(entry.diagnosisCodes).map((code: string) => (
          <li key={code}>{code}</li>
        ))}
        </ul>
        {sickLeave.startDate && <p>Sick from: {sickLeave.startDate}</p>}
        {sickLeave.endDate && <p>Until: {sickLeave.endDate}</p>}
        diagnose by {entry.specialist}
      </div>
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry}/>;
      case 'Hospital':
        return <HospitalEntry entry={entry}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

  if (patient){
    return (
      <div className="App">
        <h2>
          {patient.name}
          {patient.gender === 'male' && <MaleIcon/>}
          {patient.gender === 'female' && <FemaleIcon/>}
          {patient.gender === 'other' && <TransgenderIcon/>}
        </h2>
        <br/>
        ssn: {patient.ssn}
        <br/>
        occupation: {patient.occupation}
        <h3>entries</h3>
        {Object.values(patientEntries).map((entry: Entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry}/>
          </div>
        ))}
        <AddOccupationalEntryModal
          modalOpen={OccupationalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddHospitalEntryModal
          modalOpen={HospitalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <AddHealthCheckEntryModal
          modalOpen={HealthCheckOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openOccupational()}>
          Add Occupational Entry
        </Button>
        <Button variant="contained" onClick={() => openHospital()}>
          Add Hospital Entry
        </Button>
        <Button variant="contained" onClick={() => openHealthCheck()}>
          Add HealthCheck Entry
        </Button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <p>Error:</p>
        <p>{error}</p>
      </div>
    );
  }
};

export default PatientPage;