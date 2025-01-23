import{ useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleSuccess = () => {
    setSelectedStudent(null);
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm student={selectedStudent} onSuccess={handleSuccess} />
      <StudentList onEdit={handleEdit} />
    </div>
  );
}

export default App;
