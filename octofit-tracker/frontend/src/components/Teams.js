import ResourceTable from './ResourceTable';

function Teams() {
  return (
    <ResourceTable
      title="Teams"
      endpointPath="teams"
      logPrefix="[Teams]"
      primaryFields={['name']}
      secondaryFields={['members_count', 'size', 'description']}
      metaFields={['id', '_id', 'captain']}
    />
  );
}

export default Teams;
