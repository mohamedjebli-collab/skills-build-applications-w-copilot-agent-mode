import ResourceTable from './ResourceTable';

function Users() {
  return (
    <ResourceTable
      title="Users"
      endpointPath="-8000.app.github.dev/api/users"
      logPrefix="[Users]"
      primaryFields={['username', 'name']}
      secondaryFields={['email', 'role']}
      metaFields={['id', '_id', 'team']}
    />
  );
}

export default Users;
