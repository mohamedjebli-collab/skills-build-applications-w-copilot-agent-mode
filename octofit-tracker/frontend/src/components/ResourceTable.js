import { useEffect, useMemo, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

function normalizePayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

function resolveDisplayValue(item, fieldCandidates, fallback) {
  for (const field of fieldCandidates) {
    const value = item?.[field];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value);
    }
  }

  return fallback;
}

function ResourceTable({
  title,
  endpointPath,
  logPrefix,
  primaryFields,
  secondaryFields,
  metaFields,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = `${getApiBaseUrl()}/${endpointPath}/`;

  const fetchRows = async () => {
    setLoading(true);
    setError('');

    console.log(`${logPrefix} REST endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      console.log(`${logPrefix} fetched data:`, payload);
      setRows(normalizePayload(payload));
    } catch (err) {
      setError(err.message || `Unable to load ${title.toLowerCase()}`);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows = useMemo(() => {
    if (!query.trim()) {
      return rows;
    }

    const loweredQuery = query.trim().toLowerCase();
    return rows.filter((item) => JSON.stringify(item).toLowerCase().includes(loweredQuery));
  }, [rows, query]);

  return (
    <section className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex flex-wrap gap-2 justify-content-between align-items-center">
          <h2 className="h4 mb-0">{title}</h2>
          <a
            className="btn btn-link text-decoration-none px-0"
            href={endpoint}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open REST endpoint
          </a>
        </div>

        <div className="card-body">
          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="col-md-6">
              <label htmlFor={`${endpointPath}-search`} className="form-label fw-semibold">
                Search {title}
              </label>
              <input
                id={`${endpointPath}-search`}
                className="form-control"
                type="text"
                placeholder="Filter by any value"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-auto d-flex gap-2">
              <button type="button" className="btn btn-primary" onClick={fetchRows}>
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setQuery('')}
              >
                Clear
              </button>
            </div>
          </form>

          {loading && <p className="text-secondary mb-0">Loading {title.toLowerCase()}...</p>}
          {!loading && error && <p className="text-danger mb-0">{error}</p>}

          {!loading && !error && (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: '72px' }}>#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Details</th>
                      <th scope="col">Meta</th>
                      <th scope="col" style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-secondary py-4">
                          No data found.
                        </td>
                      </tr>
                    )}

                    {filteredRows.map((item, index) => (
                      <tr key={item.id || item._id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{resolveDisplayValue(item, primaryFields, `${title.slice(0, -1)} ${index + 1}`)}</td>
                        <td>{resolveDisplayValue(item, secondaryFields, 'N/A')}</td>
                        <td>{resolveDisplayValue(item, metaFields, item.id || item._id || 'N/A')}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSelectedItem(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Field</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedItem).map(([key, value]) => (
                          <tr key={key}>
                            <td className="fw-semibold">{key}</td>
                            <td>{value === null ? 'null' : String(value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default ResourceTable;
