import { useState } from 'react';
import { uploadCSV } from '../api/taskApi';
import { useAuth } from '../context/AuthContext';

const CSVUpload = ({ fetchTasks }) => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a CSV file');

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      await uploadCSV(formData, token);
      fetchTasks();
      alert('CSV uploaded successfully');
      setFile(null);
    } catch (error) {
      alert('Error uploading CSV');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Upload CSV</h3>

      {/* File Input */}
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange} 
        className="block w-full border p-2 mb-2 rounded"
      />

      {/* Selected File Preview */}
      {file && <p className="text-sm text-gray-600 mb-2">Selected: {file.name}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default CSVUpload;
