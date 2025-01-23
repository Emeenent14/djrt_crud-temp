import { useState, useEffect } from 'react';
import api from '../axios';

function StudentForm({ student, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    address: '',
    status: false,
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        year: student.year,
        address: student.address,
        status: student.status,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (student) {
        // Update existing student
        await api.put(`/students/${student.id}/`, formData);
      } else {
        // Create new student
        await api.post('/students/', formData);
      }
      onSuccess(); // Callback to refresh list
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div>
      <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year: </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status: </label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{student ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default StudentForm;
