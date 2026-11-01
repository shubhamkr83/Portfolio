import React, { useMemo, useState } from 'react';
import { qaDashboardSamples } from '../../data/qaDashboardSample';
import './qaDashboardDemo.css';

const TABS = [
    ['overview', 'Overview'],
    ['tcs', 'Test Cases'],
    ['smoke', 'Smoke Tests'],
    ['features', 'Features'],
    ['gaps', 'Coverage Gaps'],
    ['run', 'Last Run'],
];

const count = (list, key, value) => list.filter((t) => t[key] === value).length;

const Bars = ({ title, items }) => {
    const max = Math.max(...items.map((i) => i.value), 1);
    return (
        <div className="qad_card">
            <h4 className="qad_card_title">{title}</h4>
            {items.map((i) => (
                <div key={i.label} className="qad_bar_row">
                    <div className="qad_bar_head"><span>{i.label}</span><span>{i.value}</span></div>
                    <div className="qad_bar_track">
                        <div className={`qad_bar_fill qad_tone--${i.tone}`} style={{ width: `${(i.value / max) * 100}%` }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const Overview = ({ tcs, onDomain }) => {
    const domains = [...new Set(tcs.map((t) => t.domain))];
    return (
        <>
            <div className="qad_stats">
                {[['Total TCs', tcs.length], ['Domains', domains.length], ['P1', count(tcs, 'priority', 'P1')], ['Automatable', count(tcs, 'auto', 'Yes')]].map(([label, value]) => (
                    <div key={label} className="qad_card qad_stat">
                        <span className="qad_stat_value">{value}</span>
                        <span className="qad_stat_label">{label}</span>
                    </div>
                ))}
            </div>
            <div className="qad_two">
                <Bars title="Priority" items={[
                    { label: 'P1', value: count(tcs, 'priority', 'P1'), tone: 'fail' },
                    { label: 'P2', value: count(tcs, 'priority', 'P2'), tone: 'warn' },
                    { label: 'P3', value: count(tcs, 'priority', 'P3'), tone: 'pass' },
                ]} />
                <Bars title="Scenario" items={[
                    { label: 'Positive', value: count(tcs, 'scenario', 'Positive'), tone: 'pass' },
                    { label: 'Negative', value: count(tcs, 'scenario', 'Negative'), tone: 'fail' },
                    { label: 'Edge', value: count(tcs, 'scenario', 'Edge'), tone: 'accent' },
                ]} />
            </div>
            <div className="qad_card qad_scroll">
                <table className="qad_table">
                    <thead><tr><th>Domain</th><th>Total</th><th>P1</th><th>P2</th><th>P3</th><th>Smoke</th><th>Auto</th></tr></thead>
                    <tbody>
                        {domains.map((d) => {
                            const rows = tcs.filter((t) => t.domain === d);
                            return (
                                <tr key={d} className="qad_clickable" onClick={() => onDomain(d)} title="Show these test cases">
                                    <td className="qad_strong">{d}</td>
                                    <td>{rows.length}</td>
                                    <td>{count(rows, 'priority', 'P1')}</td>
                                    <td>{count(rows, 'priority', 'P2')}</td>
                                    <td>{count(rows, 'priority', 'P3')}</td>
                                    <td>{count(rows, 'type', 'Smoke')}</td>
                                    <td>{count(rows, 'auto', 'Yes')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const SCENARIO_TONE = { Positive: 'pass', Negative: 'fail', Edge: 'accent' };
const PRIORITY_TONE = { P1: 'fail', P2: 'warn', P3: 'pass' };

const TestCases = ({ tcs, filters, setFilters }) => {
    const [open, setOpen] = useState(null);
    const options = (key) => [...new Set(tcs.map((t) => t[key]))];
    const rows = tcs.filter((t) =>
        (!filters.q || JSON.stringify(t).toLowerCase().includes(filters.q.toLowerCase()))
        && ['domain', 'priority', 'scenario', 'type'].every((k) => !filters[k] || t[k] === filters[k]));
    const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value });

    return (
        <>
            <div className="qad_filters">
                <input className="qad_input" placeholder="Search…" value={filters.q} onChange={set('q')} aria-label="Search test cases" />
                {['domain', 'priority', 'scenario', 'type'].map((key) => (
                    <select key={key} className="qad_input" value={filters[key]} onChange={set(key)} aria-label={`Filter by ${key}`}>
                        <option value="">{key}</option>
                        {options(key).map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                ))}
            </div>
            <p className="qad_muted">{rows.length} results · click a row for steps and expected result</p>
            <div className="qad_card qad_scroll">
                <table className="qad_table">
                    <thead><tr><th>ID</th><th>Title</th><th>Scenario</th><th>Priority</th><th>Type</th><th>Auth</th><th>Auto</th></tr></thead>
                    <tbody>
                        {rows.map((t) => (
                            <React.Fragment key={t.id}>
                                <tr className="qad_clickable" onClick={() => setOpen(open === t.id ? null : t.id)} aria-expanded={open === t.id}>
                                    <td className="qad_mono">{t.id}</td>
                                    <td className="qad_strong">{t.title}</td>
                                    <td><span className={`qad_badge qad_tone--${SCENARIO_TONE[t.scenario]}`}>{t.scenario}</span></td>
                                    <td><span className={`qad_badge qad_tone--${PRIORITY_TONE[t.priority]}`}>{t.priority}</span></td>
                                    <td>{t.type}</td>
                                    <td>{t.auth}</td>
                                    <td>{t.auto}</td>
                                </tr>
                                {open === t.id && (
                                    <tr className="qad_detail">
                                        <td colSpan={7}>
                                            <p><b>Steps:</b> {t.steps}</p>
                                            <p><b>Expected:</b> {t.expected}</p>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const SMOKE_ACTIONS = [['pass', '✓', 'Mark passed'], ['fail', '✗', 'Mark failed'], ['blocked', '⊘', 'Mark blocked']];

const Smoke = ({ smoke }) => {
    const [state, setState] = useState({});
    const passed = Object.values(state).filter((v) => v === 'pass').length;
    return (
        <>
            <div className="qad_row_between">
                <p className="qad_muted">{passed} / {smoke.length} passed</p>
                <button type="button" className="qad_btn qad_btn--ghost" onClick={() => setState({})}>Reset all</button>
            </div>
            <div className="qad_bar_track qad_bar_track--lg">
                <div className="qad_bar_fill qad_tone--pass" style={{ width: `${(passed / smoke.length) * 100}%` }} />
            </div>
            {['Critical', 'Extended', 'RBAC'].map((cat) => {
                const items = smoke.filter((s) => s.category === cat);
                if (items.length === 0) return null;
                return (
                    <div key={cat}>
                        <h4 className="qad_card_title qad_gap_top">{cat}</h4>
                        {items.map((s) => (
                            <div key={s.num} className={`qad_card qad_smoke qad_smoke--${state[s.num] || 'pending'}`}>
                                <span className="qad_mono">#{s.num}</span>
                                <span className="qad_strong qad_grow">{s.check}</span>
                                <span className="qad_muted qad_small">{s.route} · {s.tc}</span>
                                <span className="qad_smoke_actions">
                                    {SMOKE_ACTIONS.map(([value, glyph, label]) => (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`qad_btn qad_btn--sm${state[s.num] === value ? ' is-on' : ''}`}
                                            onClick={() => setState({ ...state, [s.num]: value })}
                                            aria-label={`${label}: ${s.check}`}
                                            aria-pressed={state[s.num] === value}
                                        >
                                            {glyph}
                                        </button>
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
};

const Features = ({ tcs, onDomain }) => {
    const byFeature = {};
    tcs.forEach((t) => {
        const key = `${t.domain}/${t.feature}`;
        byFeature[key] = byFeature[key] || { domain: t.domain, feature: t.feature, n: 0 };
        byFeature[key].n += 1;
    });
    return (
        <div className="qad_grid">
            {Object.values(byFeature).map((f) => (
                <button key={`${f.domain}/${f.feature}`} type="button" className="qad_card qad_feature" onClick={() => onDomain(f.domain)}>
                    <span className="qad_muted qad_small">{f.domain}</span>
                    <span className="qad_strong">{f.feature}</span>
                    <span className="qad_badge qad_tone--accent">{f.n} TCs</span>
                </button>
            ))}
        </div>
    );
};

const Gaps = ({ gaps }) => (
    <>
        <div className={`qad_banner qad_banner--${gaps.length ? 'bad' : 'ok'}`}>
            {gaps.length ? `qa:check found ${gaps.length} gap${gaps.length > 1 ? 's' : ''}` : 'All coverage checks passed'}
        </div>
        <div className="qad_card qad_scroll">
            <table className="qad_table">
                <thead><tr><th>Check</th><th>Item</th></tr></thead>
                <tbody>
                    {gaps.map((g) => <tr key={g.item}><td>{g.kind}</td><td className="qad_mono">{g.item}</td></tr>)}
                </tbody>
            </table>
        </div>
        <p className="qad_muted">Run <code>qa:check</code> in CI; fill gaps with <code>/update-qa-context</code>.</p>
    </>
);

const RUN_TONE = { pass: 'pass', fail: 'fail', skip: 'warn' };

const LastRun = ({ run }) => {
    const [filter, setFilter] = useState('');
    const passed = count(run.results, 'status', 'pass');
    const failed = count(run.results, 'status', 'fail');
    const rows = run.results.filter((r) => !filter || r.status === filter);
    return (
        <>
            <div className={`qad_banner qad_banner--${failed ? 'bad' : 'ok'}`}>
                {failed ? `${failed} failed · ` : ''}{passed}/{run.results.length} passed
            </div>
            <p className="qad_muted">Bruno CLI run · env: {run.env} · {(run.durationMs / 1000).toFixed(1)}s</p>
            <div className="qad_filters">
                {['', 'pass', 'fail', 'skip'].map((s) => (
                    <button key={s || 'all'} type="button" className={`qad_btn${filter === s ? ' is-on' : ''}`} onClick={() => setFilter(s)} aria-pressed={filter === s}>
                        {s || 'All'}
                    </button>
                ))}
            </div>
            <div className="qad_card qad_scroll">
                <table className="qad_table">
                    <thead><tr><th>Request</th><th>File</th><th>Status</th><th>Time</th><th>Error</th></tr></thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.file}>
                                <td className="qad_strong">{r.name}</td>
                                <td className="qad_mono qad_small">{r.file}</td>
                                <td><span className={`qad_badge qad_tone--${RUN_TONE[r.status]}`}>{r.status}</span></td>
                                <td>{r.ms != null ? `${r.ms}ms` : '—'}</td>
                                <td className="qad_small qad_err">{r.error || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const EMPTY_FILTERS = { q: '', domain: '', priority: '', scenario: '', type: '' };

const QaDashboardDemo = () => {
    const [kind, setKind] = useState('backend');
    const [tab, setTab] = useState('overview');
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const sample = qaDashboardSamples[kind];
    // The frontend dashboard has no Bruno run, so it shows 5 tabs instead of 6.
    const tabs = useMemo(() => TABS.filter(([key]) => key !== 'run' || sample.lastRun), [sample]);

    const switchKind = (next) => {
        setKind(next);
        setFilters(EMPTY_FILTERS);
        if (tab === 'run' && !qaDashboardSamples[next].lastRun) setTab('overview');
    };
    const showDomain = (domain) => {
        setFilters({ ...EMPTY_FILTERS, domain });
        setTab('tcs');
    };

    return (
        <div className="qad">
            <div className="qad_kinds" role="group" aria-label="Dashboard type">
                {Object.entries(qaDashboardSamples).map(([key, s]) => (
                    <button key={key} type="button" className={`qad_btn${kind === key ? ' is-on' : ''}`} onClick={() => switchKind(key)} aria-pressed={kind === key}>
                        {s.label} prompt
                    </button>
                ))}
            </div>
            <div className="qad_window">
                <div className="qad_titlebar">
                    <span className="qad_dots" aria-hidden="true"><i /><i /><i /></span>
                    <span className="qad_mono qad_small">QA/qa-dashboard.html</span>
                </div>
                <div className="qad_body">
                    <h3 className="qad_h3">QA Dashboard</h3>
                    <p className="qad_muted">{sample.title} · sample data</p>
                    <div className="qad_tabs" role="tablist" aria-label="Dashboard tabs">
                        {tabs.map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={tab === key}
                                className={`qad_tab${tab === key ? ' is-on' : ''}${key === 'gaps' && sample.gaps.length ? ' is-alert' : ''}`}
                                onClick={() => setTab(key)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div role="tabpanel">
                        {tab === 'overview' && <Overview tcs={sample.tcs} onDomain={showDomain} />}
                        {tab === 'tcs' && <TestCases tcs={sample.tcs} filters={filters} setFilters={setFilters} />}
                        {tab === 'smoke' && <Smoke key={kind} smoke={sample.smoke} />}
                        {tab === 'features' && <Features tcs={sample.tcs} onDomain={showDomain} />}
                        {tab === 'gaps' && <Gaps gaps={sample.gaps} />}
                        {tab === 'run' && sample.lastRun && <LastRun run={sample.lastRun} />}
                    </div>
                </div>
            </div>
            <p className="qad_note">
                Interactive example with made-up data. The real dashboards are generated by <code>qa:dashboard</code> as one self-contained HTML file per repository.
            </p>
        </div>
    );
};

export default QaDashboardDemo;
