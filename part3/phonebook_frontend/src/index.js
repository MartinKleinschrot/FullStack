import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

//ReactDOM.render(
    //<App/>,
    //document.getElementById('root')
  //)