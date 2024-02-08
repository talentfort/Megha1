import React, { useState } from 'react';
import Primal from '../assets/Primal.jpeg';
import Logo from '../assets/Logo.png';
import web from '../assets/web.png';

// Start of the copied Rating component code
const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    // Call the parent component's function to update the formData
    onRatingChange(newRating);
  };

  return (
    <div className="flex items-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-4xl ${
            star <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => handleRatingClick(star)}
        >
          &#9733; {/* Unicode star character */}
        </button>
      ))}
      <p className="ml-2">{rating} stars</p>
    </div>
  );
};
// End of the copied Rating component code

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    comment: '',
    userReview: 0, // Initialize userReview with 0, or you can use your default rating
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      userReview: newRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    // Make a POST request to your backend API
    fetch('https://backend.megha1.org/user-comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitting(false);
        if (data.success) {
          // Clear user-entered values in the form fields
          setFormData({
            name: '',
            phoneNumber: '',
            comment: '',
            userReview: 0,
          });
          setSubmissionSuccess(true);
  
          // Reload the page after a successful submission
          window.location.reload();
        } else {
          setSubmissionError(data.error);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        setSubmissionError(error.message);
      });
  };
  


  return (
    <div>

     
      <div className='flex flex-col flex-auto w-full h-screen'>
        <div className='h-full'>
          <div className='grid grid-cols-3 h-full'>
            <div
              className='bg-green-700 bg-contain lg:flex bg-no-repeat hidden h-full'
              style={{ backgroundImage: `url(${Primal})` }}
            >
              <div class='p-4 text-white flex flex-col justify-end items-end'>
                <div className='flex items-center justify-center'>
                  <img
                    src={Logo}
                    alt='logo'
                    className='w-[250px] h-[100px] mb-5 ml-[100px] justify-center'
                  />
                </div>
              </div>
            </div>

            <div className='col-span-2 flex justify-center items-center'>
              <div className='min-w-[450] px-8'>
                <div className='mb-8'>
                  <h2 className='text-3xl text-yellow-500 font-extrabold'>
                    Welcome to MEGHA1
                  </h2>
                  <p className='text-slate-800'>Share Your Ideas With Us</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='font-medium mb-2 flex'>Enter Your Name</label>
                    <input
                      type='text'
                      name='username'
                      required
                      placeholder='Enter your name'
                      className='w-full border rounded-md bg-transparent border-gray-400 p-3'
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='font-medium mb-2 flex'>
                      Enter Your Phone Number
                    </label>
                    <input
                      type='number'
                      name='userPhoneNo'
                      placeholder='Enter your phone number'
                      className='w-full border rounded-md bg-transparent border-gray-400 p-3'
                      value={formData.userPhoneNo}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='font-medium mb-2 flex'>
                      Share Your Comment Here
                    </label>
                    <textarea
                      name='userComment'
                      placeholder='Enter your comment'
                      className='w-full border rounded-md bg-transparent border-gray-400 p-3 h-40 resize-none'
                      required
                      value={formData.userComment}
                      onChange={handleChange}
                    />
                    <StarRating onRatingChange={handleRatingChange} />
                  </div>

                  <button
                    type="submit"
                    className='block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded hover:text-green-700  duration-300'
                  >
                    Share With Us
                  </button>


                </form>

                <div className='pt-6 flex flex-row items-center'>
  <button
    type="submit"
    className=' bg-green-700 hover:bg-yellow-500 text-white flex items-center py-2 px-16 rounded hover:text-green-700 duration-300'
  >
    <img className='w-10 h-10 mr-2 text-white' src={web} alt="Website Icon" />
    VISIT US ONLINE
  </button>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;


