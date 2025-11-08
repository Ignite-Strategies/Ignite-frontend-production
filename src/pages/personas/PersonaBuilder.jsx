import { useSearchParams } from 'react-router-dom';
import PersonaBuilder from '../../components/ignite/personas/PersonaBuilder';

export default function PersonaBuilderPage() {
  const [searchParams] = useSearchParams();
  const personaId = searchParams.get('personaId') || undefined;
  const companyId = searchParams.get('companyId') || undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PersonaBuilder personaId={personaId} companyId={companyId} />
      </div>
    </div>
  );
}

