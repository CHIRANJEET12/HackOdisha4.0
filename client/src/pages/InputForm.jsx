import React from 'react';
import { useNavigate } from 'react-router-dom';

function InputForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the "Nearby Shops" page on form submission
    navigate('/shops');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bookName" className="form-label">Book name</label>
          <input type="text" className="form-control" id="bookName" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select name="category" id="bookTypeSelect">
            <option value="">--Please choose an option--</option>
            <option value="textbook">Textbook</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="yearsUsed" className="form-label">NO. OF YEARS USED</label>
          <input type="number" className="form-control" id="yearsUsed" />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
