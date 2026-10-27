'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../landing/Icon';
import {
  availableCleanersList,
  initialDetailedCleaningTasks,
  type DetailedCleaningTask,
} from './fixtures';

export function CleaningOperationsModule() {
  const [tasks, setTasks] = useState<DetailedCleaningTask[]>(initialDetailedCleaningTasks);
  const [activeTab, setActiveTab] = useState<'queue' | 'cleaners' | 'readiness'>('queue');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Critical' | 'Urgent' | 'Standard'>('all');
  const [selectedTask, setSelectedTask] = useState<DetailedCleaningTask | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New task form state
  const [newTaskTable, setNewTaskTable] = useState('T3');
  const [newTaskPriority, setNewTaskPriority] = useState<'Critical' | 'Urgent' | 'Standard'>('Standard');
  const [newTaskCleaner, setNewTaskCleaner] = useState('Carlos Mendez');
  const [newTaskReason, setNewTaskReason] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTask(null);
        setIsNewTaskModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Toggle checklist item
  const toggleChecklistItem = (taskId: string, checkId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedList = t.checklist.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c));
          return { ...t, checklist: updatedList };
        }
        return t;
      })
    );
    if (selectedTask && selectedTask.id === taskId) {
      const updatedList = selectedTask.checklist.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c));
      setSelectedTask({ ...selectedTask, checklist: updatedList });
    }
  };

  // Task state transitions: Pending -> Assigned -> In Progress -> Completed
  const advanceTaskStatus = (taskId: string) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === taskId);
      if (!target) return prev;

      if (target.status === 'pending') {
        const nextCleaner = target.cleanerName && target.cleanerName !== 'Unassigned' ? target.cleanerName : 'Maria R.';
        showToast(`[Simulated Action] Assigned Table ${target.tableId} reset to ${nextCleaner}.`);
        return prev.map((t) => (t.id === taskId ? { ...t, status: 'assigned', cleanerName: nextCleaner } : t));
      } else if (target.status === 'assigned') {
        showToast(`[Simulated Action] Cleaner ${target.cleanerName} started sanitization on Table ${target.tableId}.`);
        return prev.map((t) => (t.id === taskId ? { ...t, status: 'in_progress' } : t));
      } else if (target.status === 'in_progress') {
        const completedChecklist = target.checklist.map((c) => ({ ...c, done: true }));
        showToast(`[Simulated Action] Table ${target.tableId} turnaround completed! Floor Plan updated: Table marked Clean & Available.`);
        return prev.map((t) =>
          t.id === taskId
            ? { ...t, status: 'completed', checklist: completedChecklist }
            : t
        );
      }
      return prev;
    });

    if (selectedTask && selectedTask.id === taskId) {
      if (selectedTask.status === 'pending') {
        setSelectedTask({ ...selectedTask, status: 'assigned', cleanerName: selectedTask.cleanerName || 'Maria R.' });
      } else if (selectedTask.status === 'assigned') {
        setSelectedTask({ ...selectedTask, status: 'in_progress' });
      } else if (selectedTask.status === 'in_progress') {
        setSelectedTask({ ...selectedTask, status: 'completed', checklist: selectedTask.checklist.map((c) => ({ ...c, done: true })) });
      }
    }
  };

  const reassignCleaner = (taskId: string, newCleanerName: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, cleanerName: newCleanerName, status: t.status === 'pending' ? 'assigned' : t.status } : t))
    );
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, cleanerName: newCleanerName, status: selectedTask.status === 'pending' ? 'assigned' : selectedTask.status });
    }
    showToast(`[Simulated Action] Reassigned Table ${selectedTask?.tableId || ''} to ${newCleanerName}. Cleaner notified via pager.`);
  };

  const handleCreateNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DetailedCleaningTask = {
      id: `cln-${Date.now()}`,
      tableId: newTaskTable,
      section: newTaskTable.startsWith('P') ? 'Patio Garden' : newTaskTable.startsWith('M') ? 'Mezzanine VIP' : 'Main Floor',
      priority: newTaskPriority,
      status: newTaskCleaner === 'Unassigned' ? 'pending' : 'assigned',
      cleanerName: newTaskCleaner,
      cleanerId: newTaskCleaner === 'Carlos Mendez' ? 'cln-staff-1' : newTaskCleaner === 'Maria R.' ? 'cln-staff-2' : 'cln-staff-3',
      assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elapsedMinutes: 0.5,
      targetMinutes: 5.0,
      turnaroundTarget: newTaskReason || 'Manual dispatch — quick sanitize requested',
      sensorTrigger: 'Manager Console Override',
      checklist: [
        { id: `c-new-1`, label: 'Clear tableware & check floor area', done: false },
        { id: `c-new-2`, label: 'Wipe down and sanitize seating and tabletop', done: false },
        { id: `c-new-3`, label: 'Reset clean menus, QR coaster, and cutlery', done: false },
      ],
    };

    setTasks((prev) => [created, ...prev]);
    setIsNewTaskModalOpen(false);
    showToast(`[Simulated Action] Dispatched new cleaning request for Table ${newTaskTable} (${newTaskPriority} priority).`);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
      return true;
    });
  }, [tasks, priorityFilter]);

  const activeBacklogCount = tasks.filter((t) => t.status !== 'completed').length;
  const criticalCount = tasks.filter((t) => t.priority === 'Critical' && t.status !== 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="manager-cleaning-container">
      {/* Top Header & Breadcrumbs */}
      <section className="manager-kds-header">
        <div className="manager-kds-header-top">
          <div>
            <div className="manager-breadcrumbs">
              <span>Operations</span>
              <span className="manager-sep">/</span>
              <span>Facility &amp; Hygiene</span>
              <span className="manager-sep">/</span>
              <span className="manager-badge manager-badge-success">Sanitation Queue</span>
            </div>
            <div className="manager-kds-title-row">
              <h1 className="manager-kds-heading">Cleaning Operations &amp; Automated Dispatch</h1>
              <span className="manager-telemetry-pill">
                <span className="manager-pulse-dot" />
                IoT Sensor Turnover Active
              </span>
            </div>
            <p className="manager-kds-subtitle">
              The Rustic Oak — Downtown • Shift B: Dinner Rush • Real-time table turnover orchestration, sensor deduplication &amp; sanitation workforce balancing.
            </p>
          </div>

          <div className="manager-kds-actions-cluster">
            <button
              className="manager-btn manager-btn-secondary"
              onClick={() => showToast('[Simulated Action] Broadcasted high-priority chime to all 3 on-duty cleaners.')}
              type="button"
            >
              <Icon name="cell_tower" />
              <span>Broadcast Cleaners</span>
            </button>
            <button
              className="manager-btn manager-btn-primary"
              onClick={() => setIsNewTaskModalOpen(true)}
              type="button"
            >
              <Icon name="add" />
              <span>New Cleaning Request</span>
            </button>
          </div>
        </div>

        {/* Operational Sub-Navigation Tabs */}
        <div className="manager-kds-toolbar">
          <div className="manager-station-tabs" role="tablist">
            <button
              className={`manager-station-tab${activeTab === 'queue' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('queue')}
              type="button"
            >
              <Icon name="hourglass_top" />
              <span>Live Queue ({activeBacklogCount} Active)</span>
            </button>
            <button
              className={`manager-station-tab${activeTab === 'cleaners' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('cleaners')}
              type="button"
            >
              <Icon name="groups" />
              <span>Cleaner Workload &amp; Roster (3 on Duty)</span>
            </button>
            <button
              className={`manager-station-tab${activeTab === 'readiness' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('readiness')}
              type="button"
            >
              <Icon name="verified" />
              <span>Table Readiness Verification</span>
            </button>
          </div>

          {activeTab === 'queue' && (
            <div className="manager-kds-filter-tools">
              <div className="manager-pill-filters">
                <button
                  className={`manager-pill-filter${priorityFilter === 'all' ? ' is-active' : ''}`}
                  onClick={() => setPriorityFilter('all')}
                  type="button"
                >
                  All Priorities ({tasks.length})
                </button>
                <button
                  className={`manager-pill-filter${priorityFilter === 'Critical' ? ' is-active' : ''}`}
                  onClick={() => setPriorityFilter('Critical')}
                  type="button"
                >
                  Critical ({criticalCount})
                </button>
                <button
                  className={`manager-pill-filter${priorityFilter === 'Urgent' ? ' is-active' : ''}`}
                  onClick={() => setPriorityFilter('Urgent')}
                  type="button"
                >
                  Urgent
                </button>
                <button
                  className={`manager-pill-filter${priorityFilter === 'Standard' ? ' is-active' : ''}`}
                  onClick={() => setPriorityFilter('Standard')}
                  type="button"
                >
                  Standard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Telemetry Metric Strip */}
        <div className="manager-kds-metrics-bar">
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Active Backlog:</span>
            <strong className={activeBacklogCount > 0 ? 'text-warning' : 'text-success'}>
              {activeBacklogCount} Turnovers Pending
            </strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">In Sanitization:</span>
            <strong className="text-primary">{inProgressCount} Tables</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Avg Turnover SLA:</span>
            <strong>4.8 min (Target &lt; 5.0m)</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Cleaners on Duty:</span>
            <strong className="text-success">3 Staff (100% Active)</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Hospitality Readiness:</span>
            <strong className="text-success">96.4% Compliance</strong>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      {activeTab === 'queue' && (
        <div className="manager-cleaning-grid">
          {filteredTasks.map((task) => {
            const isCritical = task.priority === 'Critical';
            const isCompleted = task.status === 'completed';
            const allChecked = task.checklist.every((c) => c.done);

            return (
              <div
                key={task.id}
                className={`manager-cleaning-card${isCritical ? ' is-critical' : ''}${isCompleted ? ' is-completed' : ''}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className="manager-cleaning-card-header">
                  <div>
                    <span className={`manager-badge ${isCritical ? 'manager-badge-danger' : task.priority === 'Urgent' ? 'manager-badge-warning' : 'manager-badge-neutral'}`}>
                      {task.priority.toUpperCase()} PRIORITY
                    </span>
                    <h3 className="manager-cleaning-title">Table {task.tableId} Turnaround</h3>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Sector: {task.section} • Trigger: {task.sensorTrigger}
                    </div>
                  </div>

                  <span className={`manager-time-badge ${isCritical ? 'is-late' : ''}`}>
                    <Icon name="timer" /> {task.elapsedMinutes}m elapsed
                  </span>
                </div>

                <div className="manager-turnaround-target">
                  <Icon name="info" />
                  <span>{task.turnaroundTarget}</span>
                </div>

                {/* Sanitization Checklist */}
                <div className="manager-checklist-container">
                  <strong style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                    Turnaround Protocol Checklist ({task.checklist.filter((c) => c.done).length}/{task.checklist.length}):
                  </strong>
                  <div className="manager-checklist-items">
                    {task.checklist.map((item) => (
                      <label
                        key={item.id}
                        className="manager-check-row"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          checked={item.done}
                          disabled={isCompleted}
                          type="checkbox"
                          onChange={() => toggleChecklistItem(task.id, item.id)}
                        />
                        <span className={item.done ? 'is-done' : ''}>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cleaner Assignment Row */}
                <div className="manager-cleaning-card-footer">
                  <div className="manager-cleaner-info">
                    <Icon name="mop" />
                    <span>
                      Cleaner: <strong>{task.cleanerName || 'Unassigned'}</strong>
                    </span>
                  </div>

                  <div className="manager-cleaning-action-btns" onClick={(e) => e.stopPropagation()}>
                    {task.status !== 'completed' ? (
                      <button
                        className={`manager-btn manager-btn-sm ${allChecked ? 'manager-btn-primary' : 'manager-btn-secondary'}`}
                        onClick={() => advanceTaskStatus(task.id)}
                        type="button"
                      >
                        {task.status === 'pending'
                          ? 'Assign Staff'
                          : task.status === 'assigned'
                          ? 'Start Cleaning'
                          : 'Complete & Ready'}
                      </button>
                    ) : (
                      <span className="text-success font-semibold" style={{ fontSize: '0.8125rem' }}>
                        <Icon name="check_circle" /> Ready for Guests
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'cleaners' && (
        <div className="manager-cleaners-roster">
          <div className="manager-cleaners-card">
            <div className="manager-cleaners-header">
              <div>
                <h3>Sanitation Workforce &amp; Cleaner Roster (Shift B)</h3>
                <p>Real-time cleaner telemetry and location tracking across active dining rooms</p>
              </div>
              <button
                className="manager-btn manager-btn-sm manager-btn-secondary"
                onClick={() => showToast('[Simulated Action] Rebalanced cleaner sector zones based on current dining departures.')}
                type="button"
              >
                <Icon name="tune" /> Auto-Rebalance Zones
              </button>
            </div>

            <table className="manager-table">
              <thead>
                <tr>
                  <th>Cleaner Name</th>
                  <th>Assigned Venue Sector</th>
                  <th>Current Active Task</th>
                  <th>Workforce Status</th>
                  <th>Shift Performance Metric</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableCleanersList.map((cleaner) => (
                  <tr key={cleaner.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="manager-cleaner-avatar">
                          <Icon name="person" />
                        </div>
                        <div>
                          <strong>{cleaner.name}</strong>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>ID: {cleaner.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{cleaner.activeStation}</td>
                    <td>
                      {cleaner.name === 'Carlos Mendez' ? (
                        <span className="manager-badge manager-badge-danger">Table 7 (Critical Reset)</span>
                      ) : cleaner.name === 'Maria R.' ? (
                        <span className="manager-badge manager-badge-warning">Table M2 (VIP Staging)</span>
                      ) : (
                        <span className="manager-badge manager-badge-success">Idle / Ready for Dispatch</span>
                      )}
                    </td>
                    <td>
                      <span className="text-success font-semibold" style={{ fontSize: '0.8125rem' }}>
                        <Icon name="check" /> On Floor Active
                      </span>
                    </td>
                    <td>4.2m Avg Reset (SLA: &lt; 5.0m)</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="manager-btn manager-btn-sm manager-btn-secondary"
                        onClick={() => showToast(`[Simulated Action] Paged ${cleaner.name} with audio chime.`)}
                        type="button"
                      >
                        <Icon name="cell_tower" /> Page Cleaner
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'readiness' && (
        <div className="manager-readiness-panel">
          <div className="manager-banner manager-banner-info" style={{ marginBottom: '1.25rem' }}>
            <Icon name="verified" />
            <div>
              <strong>Automated Table Readiness Engine:</strong>
              <div>
                When a turnaround task passes all 5 hygiene verification steps, DineFlow automatically notifies the FOH hostess stand that the table is sanitized and ready for guest seating.
              </div>
            </div>
          </div>

          <div className="manager-readiness-grid">
            <div className="manager-readiness-card">
              <h4>Turnaround Health Standard</h4>
              <p>EPA-registered hospital disinfectant used on all contact surfaces, salt shakers, and digital QR coasters.</p>
              <div className="manager-readiness-stat">
                <strong>100%</strong>
                <span>Protocol Audit Score</span>
              </div>
            </div>

            <div className="manager-readiness-card">
              <h4>Average Turnover Speed</h4>
              <p>Elapsed time from guest departure signal (IoT weight release) to walk-in readiness verification.</p>
              <div className="manager-readiness-stat">
                <strong>4.8 min</strong>
                <span className="text-success">Ahead of 5.0m Target</span>
              </div>
            </div>

            <div className="manager-readiness-card">
              <h4>VIP Staged Tables</h4>
              <p>Pre-sanitized executive tables staged with crystal glassware for upcoming dinner reservations.</p>
              <div className="manager-readiness-stat">
                <strong>2 Tables</strong>
                <span>M-2 &amp; B-1 Reserved</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="manager-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTask(null);
          }}
        >
          <div className="manager-modal">
            <div className="manager-modal-header">
              <div className="manager-modal-title-wrap">
                <span className={`manager-badge ${selectedTask.priority === 'Critical' ? 'manager-badge-danger' : 'manager-badge-neutral'}`}>
                  {selectedTask.priority} Priority
                </span>
                <h3>Table {selectedTask.tableId} Sanitation Dispatch</h3>
              </div>
              <button
                className="manager-modal-close-btn"
                onClick={() => setSelectedTask(null)}
                type="button"
                aria-label="Close task modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-drawer-meta-grid">
                <div>
                  <small>Table Reference</small>
                  <strong>Table {selectedTask.tableId} ({selectedTask.section})</strong>
                </div>
                <div>
                  <small>Elapsed Since Departure</small>
                  <strong>{selectedTask.elapsedMinutes}m (Target: {selectedTask.targetMinutes}m)</strong>
                </div>
                <div>
                  <small>Assigned Cleaner</small>
                  <strong>{selectedTask.cleanerName || 'Unassigned'}</strong>
                </div>
                <div>
                  <small>Workflow Status</small>
                  <strong className="text-primary">{selectedTask.status.replace('_', ' ').toUpperCase()}</strong>
                </div>
              </div>

              <div className="manager-banner manager-banner-warning" style={{ marginTop: '1rem' }}>
                <Icon name="info" />
                <div>
                  <strong>Turnaround Operational Context:</strong>
                  <div>{selectedTask.turnaroundTarget}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--color-text-muted)' }}>
                    Trigger: {selectedTask.sensorTrigger}
                  </div>
                </div>
              </div>

              <h4 style={{ margin: '1.25rem 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
                Reassign Cleaner on Floor
              </h4>
              <div className="manager-cleaner-select-grid">
                {availableCleanersList.map((c) => (
                  <button
                    key={c.id}
                    className={`manager-cleaner-option-btn${selectedTask.cleanerName === c.name ? ' is-selected' : ''}`}
                    onClick={() => reassignCleaner(selectedTask.id, c.name)}
                    type="button"
                  >
                    <strong>{c.name}</strong>
                    <small>{c.activeStation}</small>
                  </button>
                ))}
              </div>

              <h4 style={{ margin: '1.25rem 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
                Hygiene Inspection Checklist
              </h4>
              <div className="manager-checklist-items">
                {selectedTask.checklist.map((c) => (
                  <label key={c.id} className="manager-check-row">
                    <input
                      checked={c.done}
                      type="checkbox"
                      onChange={() => toggleChecklistItem(selectedTask.id, c.id)}
                    />
                    <span className={c.done ? 'is-done' : ''}>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => setSelectedTask(null)}
                type="button"
              >
                Close
              </button>
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => advanceTaskStatus(selectedTask.id)}
                type="button"
              >
                {selectedTask.status === 'pending'
                  ? 'Assign & Dispatch'
                  : selectedTask.status === 'assigned'
                  ? 'Confirm In Progress'
                  : 'Complete & Mark Ready'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Cleaning Request Modal */}
      {isNewTaskModalOpen && (
        <div
          className="manager-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsNewTaskModalOpen(false);
          }}
        >
          <div className="manager-modal">
            <div className="manager-modal-header">
              <h3>Create Manual Cleaning Request</h3>
              <button
                className="manager-modal-close-btn"
                onClick={() => setIsNewTaskModalOpen(false)}
                type="button"
                aria-label="Close modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreateNewTask}>
              <div className="manager-modal-body">
                <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  Dispatch an ad-hoc sanitization or busing request for any table or dining station.
                </p>

                <div className="manager-form-grid">
                  <div className="manager-field">
                    <label>Target Table</label>
                    <select
                      value={newTaskTable}
                      onChange={(e) => setNewTaskTable(e.target.value)}
                    >
                      <option value="T3">Table 3 (Main Floor)</option>
                      <option value="T6">Table 6 (Main Floor)</option>
                      <option value="T7">Table 7 (Main Floor)</option>
                      <option value="B1">Booth 1 (Main Floor)</option>
                      <option value="M2">Mezzanine M2 (VIP)</option>
                      <option value="P2">Patio P2 (Garden)</option>
                      <option value="P4">Patio P4 (Garden)</option>
                    </select>
                  </div>

                  <div className="manager-field">
                    <label>Priority SLA</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    >
                      <option value="Standard">Standard (Target &lt; 6.0m)</option>
                      <option value="Urgent">Urgent (Target &lt; 5.0m)</option>
                      <option value="Critical">Critical (Immediate Turnover)</option>
                    </select>
                  </div>

                  <div className="manager-field manager-col-span-2">
                    <label>Cleaner Assignment</label>
                    <select
                      value={newTaskCleaner}
                      onChange={(e) => setNewTaskCleaner(e.target.value)}
                    >
                      <option value="Carlos Mendez">Carlos Mendez (Main Floor)</option>
                      <option value="Maria R.">Maria R. (Mezzanine VIP)</option>
                      <option value="Jamal K.">Jamal K. (Patio &amp; Bar)</option>
                      <option value="Unassigned">Auto-Dispatch (Next Available)</option>
                    </select>
                  </div>

                  <div className="manager-field manager-col-span-2">
                    <label>Reason / Specific Instructions</label>
                    <input
                      placeholder="e.g. Red wine spill on tablecloth — immediate change needed"
                      type="text"
                      value={newTaskReason}
                      onChange={(e) => setNewTaskReason(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="manager-modal-footer">
                <button
                  className="manager-btn manager-btn-secondary"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className="manager-btn manager-btn-primary" type="submit">
                  <Icon name="mop" /> Dispatch Cleaner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="manager-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

