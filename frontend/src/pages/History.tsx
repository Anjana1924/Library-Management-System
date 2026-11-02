import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import api, { errMsg } from '../api';
import type { BorrowRecord } from '../types';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB');

export default function History() {
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get<BorrowRecord[]>('/borrows/my');
      setRecords(data);
    } catch (e) {
      setMsg(errMsg(e));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const giveBack = async (id: string) => {
    try {
      await api.put(`/borrows/${id}/return`);
      load();
    } catch (e) {
      setMsg(errMsg(e));
    }
  };

  return (
    <div className="bg-dark">
      <PageHeader title="History" back="/dashboard" showNav />
      <div className="container">
        <div className="panel">
          <h1>History</h1>
          {msg && <p className="error">{msg}</p>}
          <table className="table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Borrowed Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{r.book?.title ?? 'Removed book'}</td>
                  <td>{fmt(r.borrowedDate)}</td>
                  <td>{fmt(r.dueDate)}</td>
                  <td>
                    <span className={`badge ${r.status === 'Over Due' ? 'overdue' : r.status.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status !== 'Returned' && (
                      <button className="btn small-btn" onClick={() => giveBack(r._id)}>Return</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && <p>No borrowing history yet.</p>}
        </div>
      </div>
    </div>
  );
}