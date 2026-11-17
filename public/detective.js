
(() => {
  const cases = window.WYL_CASES || [];
  const root = document.getElementById('detective');

  if (!root) {
    console.error('Detective container not found.');
    return;
  }

  let current = null;
  let view = 'overview';

  const key = 'wyl-detective-progress-v3';
  let progress = {};

  try {
    progress = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (error) {
    progress = {};
  }

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));

  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.warn('Progress could not be saved.', error);
    }
  };

  function record() {
    return progress[current.id] || (
      progress[current.id] = {
        clues: [],
        attempts: 0,
        solved: false,
        score: 0,
        verdict: null
      }
    );
  }

  function render() {
    if (!current) {
      root.innerHTML = `
        <section class="game-panel">
          <div class="eyebrow">
            HOLBERTON · INVESTIGATION DESK
          </div>

          <h2>Choose your next case.</h2>

          <p class="muted">
            Inspect profiles, compare messages and timelines,
            collect evidence, and prove who lied.
          </p>

          <div class="case-grid">
            ${cases.map(c => `
              <button class="case-tile" data-case="${esc(c.id)}">
                <span class="eyebrow">
                  CASE #${esc(c.id)} · ${esc(c.difficulty)}
                </span>

                <h3>${esc(c.title)}</h3>
                <p>${esc(c.incident)}</p>

                <span class="case-status">
                  ${progress[c.id]?.solved
                    ? '✓ Solved · ' + progress[c.id].score + ' pts'
                    : 'Open investigation →'}
                </span>
              </button>
            `).join('')}
          </div>
        </section>
      `;

      root.querySelectorAll('[data-case]').forEach(button => {
        button.onclick = () => {
          current = cases.find(
            c => String(c.id) === button.dataset.case
          );
          view = 'overview';
          render();
        };
      });

      return;
    }

    const r = record();
    let body = '';

    if (view === 'overview') {
      body = `
        <p class="muted">${esc(current.incident)}</p>

        <div class="stats">
          <div class="stat">
            👤 ${current.suspects.length} suspects
          </div>

          <div class="stat">
            🧩 ${r.clues.length}/${current.evidence.length}
            clues collected
          </div>

          <div class="stat">
            🏆 ${r.score} points
          </div>
        </div>

        <p class="muted">
          Your mission: identify the person whose statement
          contradicts the evidence.
        </p>
      `;
    }

    if (view === 'suspects') {
      body = `
        <div class="case-grid">
          ${current.suspects.map(s => `
            <article class="case-tile">
              <div class="eyebrow">SUSPECT PROFILE</div>
              <h3>${esc(s.name)}</h3>
              <small>${esc(s.role)}</small>
              <p>“${esc(s.statement)}”</p>
            </article>
          `).join('')}
        </div>
      `;
    }

    if (view === 'messages') {
      body = `
        <div class="evidence-grid">
          ${current.messages.map(m => `
            <article class="case-tile">
              <span class="eyebrow">${esc(m.time)}</span>
              <h3>💬 ${esc(m.from)}</h3>
              <p>${esc(m.text)}</p>
            </article>
          `).join('')}
        </div>
      `;
    }

    if (view === 'timeline') {
      body = `
        <ol class="timeline">
          ${current.timeline.map(t => `
            <li>
              <strong>${esc(t.time)}</strong>
              <span>${esc(t.event)}</span>
            </li>
          `).join('')}
        </ol>
      `;
    }

    if (view === 'evidence') {
      body = `
        <div class="evidence-grid">
          ${current.evidence.map(e => `
            <article class="case-tile">
              <div class="eyebrow">${esc(e.type)}</div>
              <h3>${esc(e.title)}</h3>
              <p>${esc(e.detail)}</p>

              <button
                class="${r.clues.includes(e.id)
                  ? 'outline'
                  : 'primary'}"
                data-clue="${esc(e.id)}"
                ${r.clues.includes(e.id) ? 'disabled' : ''}
              >
                ${r.clues.includes(e.id)
                  ? '✓ Collected'
                  : '+ Collect clue'}
              </button>
            </article>
          `).join('')}
        </div>
      `;
    }

    if (view === 'verdict') {
      body = `
        <p class="muted">
          Choose the suspect you can prove was lying.
          Collecting evidence improves your score.
        </p>

        <div class="votes">
          ${current.suspects.map(s => `
            <button
              class="vote"
              data-accuse="${esc(s.id)}"
              ${r.solved ? 'disabled' : ''}
            >
              ⚖️ ${esc(s.name)}
              <small>Make accusation →</small>
            </button>
          `).join('')}
        </div>

        ${r.verdict ? `
          <div class="verdict-result">
            <h3>
              ${r.verdict.correct
                ? '✓ Case solved'
                : '✕ Incorrect accusation'}
            </h3>

            <p>${esc(r.verdict.explanation)}</p>

            <p>
              <strong>
                ${r.verdict.correct
                  ? '+' + r.score + ' points earned'
                  : 'Review the evidence and timeline.'}
              </strong>
            </p>
          </div>
        ` : ''}
      `;
    }

    root.innerHTML = `
      <section class="game-panel">
        <button class="outline" id="back-cases">
          ← All cases
        </button>

        <div class="eyebrow" style="margin-top:20px">
          CASE #${esc(current.id)} · ${esc(current.difficulty)}
        </div>

        <h2>${esc(current.title)}</h2>

        <div class="case-tabs">
          ${[
            ['overview', 'Briefing'],
            ['suspects', 'Suspects'],
            ['messages', 'Messages'],
            ['timeline', 'Timeline'],
            ['evidence', 'Evidence'],
            ['verdict', 'Verdict']
          ].map(([id, label]) => `
            <button
              class="mode ${view === id ? 'active' : ''}"
              data-view="${id}"
            >
              ${label}
            </button>
          `).join('')}
        </div>

        ${body}
      </section>
    `;

    root.querySelector('#back-cases').onclick = () => {
      current = null;
      render();
    };

    root.querySelectorAll('[data-view]').forEach(button => {
      button.onclick = () => {
        view = button.dataset.view;
        render();
      };
    });

    root.querySelectorAll('[data-clue]').forEach(button => {
      button.onclick = () => {
        const clue = current.evidence.find(
          e => String(e.id) === button.dataset.clue
        );

        if (!clue || r.clues.includes(clue.id)) return;

        r.clues.push(clue.id);
        save();
        render();
      };
    });

    root.querySelectorAll('[data-accuse]').forEach(button => {
      button.onclick = () => {
        if (r.solved) return;

        if (!confirm('Submit your final accusation?')) return;

        r.attempts++;

        const correct =
          String(button.dataset.accuse) ===
          String(current.culprit);

        if (correct) {
          r.solved = true;

          r.score = Math.max(
            20,
            100 + 10 * r.clues.length -
            20 * (r.attempts - 1)
          );
        }

        r.verdict = {
          correct,
          explanation: correct
            ? current.explanation
            : 'The evidence does not prove that accusation. Look for a direct contradiction.'
        };

        save();
        render();
      };
    });
  }

  const detectiveButton =
    document.getElementById('mode-detective');

  const partyButton =
    document.getElementById('mode-party');

  const welcomeElement =
    document.getElementById('welcome');

  const gameElement =
    document.getElementById('game');

  function getSession() {
    try {
      if (typeof session !== 'undefined') {
        return session;
      }
    } catch (error) {
      // Session is not accessible in this scope.
    }

    return null;
  }

  function mode(party) {
    const activeSession = getSession();

    root.hidden = party;

    if (welcomeElement) {
      welcomeElement.hidden = !party || !!activeSession;
    }

    if (gameElement) {
      gameElement.hidden = !party || !activeSession;
    }

    if (detectiveButton) {
      detectiveButton.classList.toggle('active', !party);
    }

    if (partyButton) {
      partyButton.classList.toggle('active', party);
    }

    try {
      localStorage.setItem(
        'wyl-mode',
        party ? 'party' : 'detective'
      );
    } catch (error) {
      console.warn('Mode preference could not be saved.');
    }
  }

  if (detectiveButton) {
    detectiveButton.onclick = () => mode(false);
  }

  if (partyButton) {
    partyButton.onclick = () => mode(true);
  }

  // Prevent repeated hidden attribute mutations.
  if (gameElement) {
    const observer = new MutationObserver(() => {
      if (localStorage.getItem('wyl-mode') !== 'detective') {
        return;
      }

      if (welcomeElement && !welcomeElement.hidden) {
        welcomeElement.hidden = true;
      }

      if (!gameElement.hidden) {
        gameElement.hidden = true;
      }
    });

    observer.observe(gameElement, {
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  render();

  const savedMode = localStorage.getItem('wyl-mode');
  const hasRoom = new URLSearchParams(
    window.location.search
  ).has('room');

  mode(savedMode === 'party' || hasRoom);
})();
