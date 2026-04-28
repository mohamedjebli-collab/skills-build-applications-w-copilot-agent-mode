import ResourceTable from './ResourceTable';

function Activities() {
  return (
    <ResourceTable
      title="Activities"
      endpointPath="-8000.app.github.dev/api/activities"
      logPrefix="[Activities]"
      primaryFields={['name', 'title']}
      secondaryFields={['type', 'duration', 'description']}
      metaFields={['id', '_id', 'team', 'user']}
    />
  );
}

export default Activities;
