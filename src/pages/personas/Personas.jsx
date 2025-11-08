import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Personas = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Create Your First Persona</h1>
        <p className="text-gray-600 mb-8">
          Personas capture the voice, goals, and decision drivers for the relationships you want to
          grow. Start by creating one and we’ll use it throughout the growth tools.
        </p>
        <button
          onClick={() => navigate('/personas/builder')}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Create Persona
        </button>
      </div>
    </div>
  );
};

export default Personas;
