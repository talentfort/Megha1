

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You may need to install axios
import idea from '../assets/idea.png';
import StyledTableCell from "./StyledTableCell"

function CustomerIdeas() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the backend API endpoint
    axios.get('/api/feedback')
      .then((response) => {
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching feedback data:', error);
      });
  }, []);

  return (
    <div>
          <div className='flex flex-col items-center justify-center pt-10'>
                  <img className='w-12 h-12' src={idea} alt="Idea Icon" />
                  <h2 className="font-extrabold text-green-700 text-center text-4xl pt-2">
                  <span className='text-yellow-500 text-5xl'>CUSTOMER </span>
                  <span className='text-5xl'>IDEAS</span>
                  </h2>
        </div>

      <StyledTableCell className="pt-20"/>
    </div>
  );
}

export default CustomerIdeas;

