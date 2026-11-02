import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import api from '../api';
import type { User } from '../types';

export default function AdminMembers() {
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>('/users').then(({ data }) => setMembers(data)).catch(() => {});
  }, []);

  return (
    <div className="bg-dark">
      <PageHeader title="Total Members" back="/admin" />
      <div className="container">
        <div className="panel">
          <h1>Members</h1>
          <table className="table">
            <thead>
              <tr><th>Member Name</th><th>Reg No.</th><th>ID No.</th><th>Email</th></tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.regNo}</td>
                  <td>{m.idNo || '-'}</td>
                  <td>{m.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && <p>No members yet.</p>}
        </div>
      </div>
    </div>
  );
}