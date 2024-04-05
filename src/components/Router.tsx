import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEnv } from '../envContext';
import MainLayout from './MainLayout';
import HomePage from './HomePage';
import About from './About';
import PayBills from './PayBills';
import TransferMoney from './TransferMoney';
import Deposit from './Deposit';
import Statements from './Statements';
import DemoLayout from './DemoLayout'; 
import SimpleDemo from './SimpleDemo'; 

// Function to determine the default page based on an environment variable
const getDefaultPage = () => {
  const { TINAD_IS_DEMO_SITE } = useEnv();

  if (TINAD_IS_DEMO_SITE) {
    return <SimpleDemo />;
  }
  return <About />;

};

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/demo" element={<DemoLayout />} />
        <Route path="/simpledemo" element={<SimpleDemo />} />
        <Route path="/" element={<MainLayout />} >
          <Route index element={getDefaultPage()} />
          <Route path="dashboard" element={<HomePage />} />
          <Route path="pay" element={<PayBills />} />
          <Route path="transfer" element={<TransferMoney />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="statements" element={<Statements />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterComponent;
