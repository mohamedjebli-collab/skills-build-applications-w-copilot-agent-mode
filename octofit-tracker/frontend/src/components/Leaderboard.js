import ResourceTable from './ResourceTable';

function Leaderboard() {
  return (
    <ResourceTable
      title="Leaderboard"
      endpointPath="-8000.app.github.dev/api/leaderboard"
      logPrefix="[Leaderboard]"
      primaryFields={['username', 'name', 'user']}
      secondaryFields={['points', 'score', 'rank']}
      metaFields={['id', '_id', 'team']}
    />
  );
}

export default Leaderboard;
