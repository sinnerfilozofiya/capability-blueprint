import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const sectionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
};

export default function JumpTestEngineeringDeepDive() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className="max-w-4xl mx-auto px-6 pb-20"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-8">
        Engineering deep dive
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-10">
        This section highlights the <strong className="text-foreground">implementation and coding decisions</strong> behind the pipeline: data flow, numerical methods, signal processing, and how the algorithms are structured in code (Python, SciPy, NumPy). The same logic drives the embedded viewer above.
      </p>

      <div className="space-y-12">
        {/* 1. Pipeline / data flow */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Processing pipeline (implementation order)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The code processes data in a strict, dependency-ordered pipeline: baseline (weighing window) runs first so bodyweight and σ are available; optional low-pass filter is applied to a copy of the force array; event detection runs in a fixed sequence (take-off and landing first to establish contact bounds, then movement onset and min force); COM velocity is integrated only after onset and take-off exist; eccentric end and velocity zero use that velocity array. Phases and metrics are derived from the resulting indices—no separate “phase detection” step, just interval arithmetic from event indices.
          </p>
          <div className="rounded-lg border border-border bg-card/50 p-4 overflow-x-auto">
            <svg
              viewBox="0 0 720 200"
              className="w-full min-w-[480px] h-auto text-foreground"
              aria-label="CMJ processing pipeline"
            >
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0 0 L8 3 L0 6 Z" fill="currentColor" />
                </marker>
              </defs>
              {/* Row 1: inputs and baseline */}
              <rect x="10" y="20" width="90" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="55" y="42" textAnchor="middle" fill="currentColor" fontSize="11">Raw F(t)</text>
              <line x1="100" y1="38" x2="130" y2="38" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <rect x="130" y="20" width="100" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="180" y="42" textAnchor="middle" fill="currentColor" fontSize="10">Weighing 1 s</text>
              <line x1="230" y1="38" x2="260" y2="38" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <rect x="260" y="20" width="80" height="36" rx="6" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" />
              <text x="300" y="42" textAnchor="middle" fill="currentColor" fontSize="10">BW, m, σ</text>
              {/* Optional filter */}
              <rect x="350" y="20" width="70" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeDasharray="4 2" />
              <text x="385" y="42" textAnchor="middle" fill="currentColor" fontSize="9">LP filter</text>
              <line x1="420" y1="38" x2="450" y2="38" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              {/* Events */}
              <rect x="450" y="20" width="120" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="510" y="42" textAnchor="middle" fill="currentColor" fontSize="10">TO, Land, Onset</text>
              <line x1="570" y1="38" x2="600" y2="38" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <rect x="600" y="20" width="110" height="36" rx="6" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" />
              <text x="655" y="42" textAnchor="middle" fill="currentColor" fontSize="9">MinF, v(t)</text>
              {/* Row 2: kinematics → phases → metrics */}
              <line x1="655" y1="56" x2="655" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <rect x="580" y="80" width="150" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="655" y="102" textAnchor="middle" fill="currentColor" fontSize="10">Ecc end, v=0</text>
              <line x1="655" y1="116" x2="655" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <rect x="550" y="140" width="210" height="36" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="655" y="162" textAnchor="middle" fill="currentColor" fontSize="10">Phases + metrics</text>
            </svg>
          </div>
        </motion.div>

        {/* 2. Phase timeline */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Phase timeline (derived from event indices)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Phases are not detected separately—they are computed as time intervals between the six event indices. The code uses a single phases structure (e.g. dataclass or dict) keyed by name; unweighting, braking, propulsion, flight, and landing are derived from onset, min_force, velocity_zero, take_off, and landing. This keeps one source of truth and avoids phase/event drift.
          </p>
          <div className="rounded-lg border border-border bg-card/50 p-4 overflow-x-auto">
            <svg viewBox="0 0 640 120" className="w-full min-w-[400px] h-auto text-foreground" aria-label="CMJ phase timeline">
              <text x="10" y="28" fill="currentColor" opacity="0.7" fontSize="10">onset</text>
              <text x="10" y="52" fill="currentColor" opacity="0.7" fontSize="10">min F</text>
              <text x="10" y="76" fill="currentColor" opacity="0.7" fontSize="10">v=0</text>
              <text x="10" y="100" fill="currentColor" opacity="0.7" fontSize="10">TO / Land</text>
              <line x1="60" y1="20" x2="620" y2="20" stroke="hsl(var(--border))" strokeWidth="1" />
              <rect x="80" y="32" width="120" height="14" rx="3" fill="hsl(var(--primary) / 0.4)" stroke="hsl(var(--primary))" />
              <text x="140" y="42" textAnchor="middle" fill="currentColor" fontSize="9">Unweighting</text>
              <rect x="200" y="32" width="100" height="14" rx="3" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--border))" />
              <text x="250" y="42" textAnchor="middle" fill="currentColor" fontSize="9">Braking</text>
              <rect x="300" y="32" width="180" height="14" rx="3" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              <text x="390" y="42" textAnchor="middle" fill="currentColor" fontSize="9">Propulsion (concentric)</text>
              <rect x="480" y="56" width="80" height="14" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              <text x="520" y="66" textAnchor="middle" fill="currentColor" fontSize="9">Flight</text>
              <rect x="560" y="56" width="60" height="14" rx="3" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--border))" />
              <text x="590" y="66" textAnchor="middle" fill="currentColor" fontSize="9">Landing</text>
              <line x1="80" y1="70" x2="80" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <line x1="200" y1="70" x2="200" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <line x1="300" y1="70" x2="300" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <line x1="480" y1="70" x2="480" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <line x1="560" y1="70" x2="560" y2="90" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
            </svg>
          </div>
        </motion.div>

        {/* 3. Event detection: order and thresholds */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Event detection (algorithm and thresholds in code)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each event is implemented as a small, testable function: threshold comparison, sustain checks (consecutive samples or duration), and a defined search window. Take-off and landing use configurable thresholds (e.g. max(20 N, 0.05×BW)); movement onset uses a statistical threshold (BW − k×σ_quiet) with a fallback so the code behaves when σ is zero. Order is enforced in the pipeline so that contact bounds exist before onset search (avoiding landing being misclassified as onset).
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-3 px-4 font-mono text-primary">Event</th>
                  <th className="text-left py-3 px-4 font-mono text-primary">Threshold / rule</th>
                  <th className="text-left py-3 px-4 font-mono text-primary">Sustain / search</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2.5 px-4 font-medium text-foreground">Take-off</td>
                  <td className="py-2.5 px-4">F &lt; max(20 N, 0.05×BW)</td>
                  <td className="py-2.5 px-4">K consecutive samples below (e.g. K=4)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 px-4 font-medium text-foreground">Landing</td>
                  <td className="py-2.5 px-4">F &gt; max(200 N, 0.05×BW)</td>
                  <td className="py-2.5 px-4">After TO; sustained ≥20 ms</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 px-4 font-medium text-foreground">Movement onset</td>
                  <td className="py-2.5 px-4">F &lt; BW − 5σ_quiet (fallback: 0.95×BW)</td>
                  <td className="py-2.5 px-4">Sustained 30 ms; search from 0.5 s to TO</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 px-4 font-medium text-foreground">Min force</td>
                  <td className="py-2.5 px-4">argmin(F) in [onset, take_off]</td>
                  <td className="py-2.5 px-4">—</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2.5 px-4 font-medium text-foreground">Eccentric end</td>
                  <td className="py-2.5 px-4">Index where COM velocity v(t) is minimum</td>
                  <td className="py-2.5 px-4">Requires v(t) from kinematics</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-foreground">Velocity zero</td>
                  <td className="py-2.5 px-4">First v &gt; 0 after eccentric_end</td>
                  <td className="py-2.5 px-4">Bottom of dip; start of concentric</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 4. Kinematics */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Kinematics (numerical integration and drift correction)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Acceleration is computed in a single pass over the force array; velocity is integrated with <strong className="text-foreground">scipy.integrate.cumtrapz</strong> over the contact segment [onset, take_off+1] so the take-off sample is included. Integration drift is corrected by a linear ramp so that v(take_off) matches J/m (impulse/mass), keeping the implementation numerically stable without filtering velocity.
          </p>
          <div className="rounded-lg border border-border bg-card/50 p-4 font-mono text-sm space-y-2">
            <p className="text-foreground">a(t) = (F(t) − BW) / m</p>
            <p className="text-muted-foreground">v(onset) = 0; v(t) = ∫_{"onset"}^t a(τ) dτ (cumtrapz)</p>
            <p className="text-muted-foreground">Drift correction: ramp so v(TO) = J/m</p>
          </div>
        </motion.div>

        {/* 5. Metrics */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Metrics (implementation: trapezoidal integration and Savitzky–Golay)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All integrals use the same trapezoidal scheme (NumPy/SciPy) over sample indices; jump height uses impulse–momentum and flight-time as cross-checks. RFD is implemented with <strong className="text-foreground">scipy.signal.savgol_filter</strong> (window ~20 ms, order 3) then numpy.gradient for dF/dt; peak RFD is taken over configurable windows (global, eccentric, concentric, 0–100 ms, 0–200 ms). Phase impulses are trapezoidal integration of (F − BW) over the phase intervals; RSImod and other scalars are simple arithmetic from the computed values.
          </p>
          <ul className="text-sm text-muted-foreground space-y-3 list-none">
            <li>
              <span className="font-medium text-foreground">Jump height (impulse–momentum):</span> J = ∫(F − BW) dt over [onset, TO]; v_TO = J/m; H = v_TO²/(2g).
            </li>
            <li>
              <span className="font-medium text-foreground">Jump height (flight-time):</span> t_flight = (landing − TO)/sample_rate; H = g·t_flight²/8.
            </li>
            <li>
              <span className="font-medium text-foreground">Peak power:</span> P(t) = F(t)·v(t); max over contact.
            </li>
            <li>
              <span className="font-medium text-foreground">RFD:</span> Savitzky–Golay on F (~20 ms, order 3), then dF/dt; peak over contact and over eccentric/concentric windows; also RFD 0–100 ms, 0–200 ms.
            </li>
            <li>
              <span className="font-medium text-foreground">Phase impulses:</span> Unweighting (onset→min_force), braking (min_force→v=0), propulsion (v=0→TO); trapezoidal integration of (F − BW).
            </li>
            <li>
              <span className="font-medium text-foreground">RSImod:</span> jump_height_impulse / time_to_takeoff.
            </li>
          </ul>
        </motion.div>

        {/* 6. Optional filter */}
        <motion.div {...fadeIn} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Optional signal processing (scipy.signal)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When enabled (e.g. CLI <code className="px-1 py-0.5 rounded bg-secondary text-foreground font-mono text-xs">--filter 80</code>), the code builds a <strong className="text-foreground">copy</strong> of the trial with force replaced by a 4th-order Butterworth low-pass via <strong className="text-foreground">scipy.signal.filtfilt</strong> (zero-phase, so no shift). That copy is used for all event detection, integration, and metrics; bodyweight is always from the raw first 1 s. This keeps a single code path with one “active” force array and makes it easy to compare raw vs filtered in tests or exports.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
