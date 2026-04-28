import ResourceTable from './ResourceTable';

function Workouts() {
  return (
    <ResourceTable
      title="Workouts"
      endpointPath="workouts"
      logPrefix="[Workouts]"
      primaryFields={['name', 'title']}
      secondaryFields={['difficulty', 'level', 'duration']}
      metaFields={['id', '_id', 'activity']}
    />
  );
}

export default Workouts;
