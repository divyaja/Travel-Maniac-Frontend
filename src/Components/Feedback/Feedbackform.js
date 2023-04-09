import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Common/Card';
import './rating.css';

// const colors ={
//   white: "#f4f4f4",
//   blue: "#035efc"
// }

export default function Feedbackform() {

  let navigate = useNavigate();
  
  let loggedinUser = sessionStorage.getItem("user-info");
  console.log("logged in user in Search Feedback page", loggedinUser)
  let id = JSON.parse(loggedinUser).id;

  const [feedback, setFeedback] = useState({
    comments: "",
    userRating: "",
  });
  const { comments } = feedback;
  // const {comments} =feedback;
  //const {rating} =feedback.userRating;
  const [selected, setselected] = useState(10);

  const handleChange = (e) => {
    setselected(+e.target.value);
    setFeedback({ ...feedback, [e.target.name]: e.target.value });

    // setFeedback({ ...feedback,...{  [e.target.name]: e.target.value }); 
    // setUser({ ...user, ...{ card: { ...user.card, [e.target.name]: e.target.value } } });

  }
  const onRatingChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:8080/userrating/${id}`, feedback,);
    alert("Thank you for your feedback!");
    navigate('/searchFlight');
  };

  return (

    <div className='container'>
    <div className='row'>
      <div className='col-md-6 offset-md-3 border rounded p-5 mt-5 shadow'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <span className='text-center'>
        <h4>How would you rate your service with us?</h4></span>
        <ul className='ratingButton'>
          <li >
            <input
              type='radio'
              id='num1'
              name='userRating'
              value='1'
              checked={selected === 1}
              onChange={handleChange}


            />
            <label htmlFor='num1'>1</label>
          </li>
          <li>
            <input
              type='radio'
              id='num2'
              name='userRating'
              value='2'
              checked={selected === 2}
              onChange={handleChange}
            />
            <label htmlFor='num2'>2</label>
          </li>
          <li>
            <input
              type='radio'
              id='num3'
              name='userRating'
              value='3'
              checked={selected === 3}
              onChange={handleChange}
            />
            <label htmlFor='num3'>3</label>
          </li>
          <li>
            <input
              type='radio'
              id='num4'
              name='userRating'
              value='4'
              checked={selected === 4}
              onChange={handleChange}
            />
            <label htmlFor='num4'>4</label>
          </li>
          <li>
            <input
              type='radio'
              id='num5'
              name='userRating'
              value='5'
              checked={selected === 5}
              onChange={handleChange}
            />
            <label htmlFor='num5'>5</label>
          </li>
          <li>
            <input
              type='radio'
              id='num6'
              name='userRating'
              value='6'
              checked={selected === 6}
              onChange={handleChange}
            />
            <label htmlFor='num6'>6</label>
          </li>
          <li>
            <input
              type='radio'
              id='num7'
              name='userRating'
              value='7'
              checked={selected === 7}
              onChange={handleChange}
            />
            <label htmlFor='num7'>7</label>
          </li>
          <li>
            <input
              type='radio'
              id='num8'
              name='userRating'
              value='8'
              checked={selected === 8}
              onChange={handleChange}
            />
            <label htmlFor='num8'>8</label>
          </li>
          <li>
            <input
              type='radio'
              id='num9'
              name='userRating'
              value='9'
              checked={selected === 9}
              onChange={handleChange}
            />
            <label htmlFor='num9'>9</label>
          </li>
          <li>
            <input
              type='radio'
              id='num10'
              name='userRating'
              value='10'
              checked={selected === 10}
              onChange={handleChange}
            />
            <label htmlFor='num10'>10</label>
          </li>
        </ul>
        <div className='input-group'>
          <input
            type={"text"}
            placeholder='Write a review'
            name='comments'
            value={comments}
            onChange={onRatingChange}
          />
        </div>
        <div className='text-center'>
          {/* <Link to="/feedbacksuccess" className='btn btn-outline-primary m-4'>Submit</Link> */}
          <button type='submit' className='btn btn-outline-primary m-4'>Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>



  )
}
