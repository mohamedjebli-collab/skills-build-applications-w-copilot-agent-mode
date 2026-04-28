import ResourceTable from './ResourceTable';

function Workouts() {
  return (
    <ResourceTable
      title="Workouts"
      endpointPath="-8000.app.github.dev/api/workouts"
      logPrefix="[Workouts]"
      primaryFields={['name', 'title']}
      secondaryFields={['difficulty', 'level', 'duration']}
      metaFields={['id', '_id', 'activity']}
    />
  );
}

export default Workouts;
