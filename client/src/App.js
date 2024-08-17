// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Landing from './components/Landing';
// import Footer from './components/Footer';
// import About from './components/About';
// import Alert from './components/Alert';
// import Register from './components/Register';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import RiddleState from './context/riddles/riddleState';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Import your CSS file if needed
// import backgroundImage from './images/background_image.jpeg'; // Import the image

// function App() {
//   return (
//     <RiddleState>
//       <Router>
//         <div style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '100vh'
//         }}>
//           <Alert message="Welcome to Riddle, the Game !" />
//           <div className='container'>
//             <Routes>
//               <Route exact path="/" element={<Landing />} />
//               <Route exact path="/about" element={<About />} />
//               <Route exact path="/login" element={<Login />} />
//               <Route exact path="/register" element={<Register />} />
//               {/* Add more routes as needed */}
//             </Routes>
//           </div>
//           <Footer/>
//         </div>
//       </Router>
//     </RiddleState>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import Footer from './components/Footer';
import About from './components/About';
import Alert from './components/Alert';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import your Dashboard component
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RiddleState from './context/riddles/riddleState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your CSS file if needed
import backgroundImage from './images/background_image.jpeg'; // Import the image

function App() {
  return (
    <RiddleState>
      <Router>
        <div style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}>
          <Alert message="Welcome to Riddle, the Game!" />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} /> {/* Add the dashboard route */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </RiddleState>
  );
}

export default App;
