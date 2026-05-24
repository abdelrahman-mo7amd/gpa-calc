// ── Tab switching ──
function showTab(name, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

// ── STEM scales ──
let currentStemUni = 'standard4';

const stemScales = {
  standard4: { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 },
  plus4:     { 'A+': 4.3, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0 },
  scale5:    { 'A+': 5.0, 'A': 4.7, 'A-': 4.3, 'B+': 4.0, 'B': 3.7, 'B-': 3.3, 'C+': 3.0, 'C': 2.7, 'C-': 2.3, 'D+': 2.0, 'D': 1.7, 'F': 0.0 },
  percentage: { 'A+ (95–100%)': 97, 'A (90–94%)': 92, 'A- (85–89%)': 87, 'B+ (80–84%)': 82, 'B (75–79%)': 77, 'B- (70–74%)': 72, 'C+ (65–69%)': 67, 'C (60–64%)': 62, 'D (50–59%)': 55, 'F (<50%)': 25 },
  pass_fail:  { 'Pass': 1, 'Fail': 0 },
};

const stemUniDesc = {
  standard4:  'Standard 4.0 scale used by most US and international STEM universities. A/A+ = 4.0, B+ = 3.3, B = 3.0 …',
  plus4:      'Modified 4.0 scale where A+ counts as 4.3, rewarding top performance. Common in engineering programs.',
  scale5:     '5.0 scale used by research-intensive and some European STEM institutions. A+ = 5.0, A = 4.7 …',
  percentage: 'Percentage-based grading used in many Asian and Middle Eastern universities. Final result shown as average %.',
  pass_fail:  'Pass/Fail system used for lab courses, seminars, and some electives. Shows pass rate.',
};

function selectUni(type, btn) {
  currentStemUni = type;
  document.querySelectorAll('.uni-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('stem-uni-desc').textContent = stemUniDesc[type];
  document.getElementById('stem-result').classList.remove('show');
  // Rebuild rows with correct grade options
  const container = document.getElementById('stem-courses');
  const count = container.children.length || 3;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) addRow('stem');
}

function stemLetterLabel(gpa, uni) {
  if (uni === 'percentage') {
    if (gpa >= 90) return 'A — Excellent';
    if (gpa >= 80) return 'B — Very Good';
    if (gpa >= 70) return 'C — Good';
    if (gpa >= 60) return 'D — Pass';
    return 'F — Fail';
  }
  const max = uni === 'scale5' ? 5.0 : (uni === 'plus4' ? 4.3 : 4.0);
  const ratio = gpa / max;
  if (ratio >= 0.93) return 'A / A+';
  if (ratio >= 0.87) return 'A−';
  if (ratio >= 0.80) return 'B+';
  if (ratio >= 0.73) return 'B';
  if (ratio >= 0.67) return 'B−';
  if (ratio >= 0.60) return 'C+';
  if (ratio >= 0.53) return 'C';
  if (ratio >= 0.47) return 'C−';
  if (ratio >= 0.37) return 'D';
  return 'F';
}

function stemStanding(gpa, uni) {
  const max = uni === 'scale5' ? 5.0 : (uni === 'plus4' ? 4.3 : (uni === 'percentage' ? 100 : 4.0));
  const ratio = gpa / max;
  if (ratio >= 0.92) return '🏆 Outstanding STEM Performance';
  if (ratio >= 0.83) return "🌟 Dean's List Eligible";
  if (ratio >= 0.75) return '✅ Good Academic Standing';
  if (ratio >= 0.50) return '📚 Satisfactory Standing';
  if (ratio >= 0.25) return '⚠️ Academic Probation Risk';
  return '❌ Academic Failure';
}

// ── Grade data ──
const americanGrades = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const igcseGrades = { 'A*': 9, 'A': 8, 'B': 7, 'C': 6, 'D': 5, 'E': 4, 'F': 3, 'G': 2, 'U': 0 };

function igcseLabel(avg) {
  if (avg >= 8.5) return 'A*';
  if (avg >= 7.5) return 'A';
  if (avg >= 6.5) return 'B';
  if (avg >= 5.5) return 'C';
  if (avg >= 4.5) return 'D';
  if (avg >= 3.5) return 'E';
  if (avg >= 2.5) return 'F';
  if (avg >= 1.5) return 'G';
  return 'U';
}

function percentToGPA(p) {
  if (p >= 95) return 4.0;
  if (p >= 90) return 4.0;
  if (p >= 85) return 3.7;
  if (p >= 80) return 3.3;
  if (p >= 75) return 3.0;
  if (p >= 70) return 2.7;
  if (p >= 65) return 2.3;
  if (p >= 60) return 2.0;
  if (p >= 50) return 1.0;
  return 0.0;
}

function gpaToLetter(g) {
  if (g >= 3.85) return 'A / A+';
  if (g >= 3.5)  return 'A−';
  if (g >= 3.15) return 'B+';
  if (g >= 2.85) return 'B';
  if (g >= 2.5)  return 'B−';
  if (g >= 2.15) return 'C+';
  if (g >= 1.85) return 'C';
  if (g >= 1.5)  return 'C−';
  if (g >= 1.15) return 'D+';
  if (g >= 0.85) return 'D';
  if (g >= 0.5)  return 'D−';
  return 'F';
}

function gpaStanding(g) {
  if (g >= 3.7) return '🏆 Outstanding Academic Standing';
  if (g >= 3.3) return '🌟 Dean\'s List Eligible';
  if (g >= 3.0) return '✅ Good Academic Standing';
  if (g >= 2.0) return '📚 Satisfactory Standing';
  if (g >= 1.0) return '⚠️ Academic Probation Risk';
  return '❌ Academic Failure';
}

// ── Add / remove rows ──
function addRow(type) {
  const container = document.getElementById(type + '-courses');
  const div = document.createElement('div');
  div.className = 'course-row grid-3';

  if (type === 'american') {
    div.innerHTML = `
      <input type="text" placeholder="Course name" />
      <select>${Object.keys(americanGrades).map(g => `<option>${g}</option>`).join('')}</select>
      <input type="number" placeholder="Credits" min="0.5" max="6" step="0.5" value="3" />
      <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  } else if (type === 'british') {
    div.innerHTML = `
      <input type="text" placeholder="Module name" />
      <input type="number" placeholder="Mark %" min="0" max="100" step="0.1" />
      <input type="number" placeholder="Credits" min="1" value="10" />
      <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  } else if (type === 'igcse') {
    div.innerHTML = `
      <input type="text" placeholder="Subject name" />
      <select>${Object.keys(igcseGrades).map(g => `<option>${g}</option>`).join('')}</select>
      <input type="number" placeholder="Weight" min="0.5" step="0.5" value="1" />
      <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  } else if (type === 'stem') {
    div.className = 'course-row grid-2';
    const gradeKeys = Object.keys(stemScales[currentStemUni] || stemScales['standard4']);
    div.innerHTML = `
      <input type="text" placeholder="Subject name" />
      <select>${gradeKeys.map(g => `<option>${g}</option>`).join('')}</select>
      <button class="btn-danger" onclick="this.parentElement.remove()">✕</button>`;
  }

  container.appendChild(div);
}

function clearAll(type) {
  document.getElementById(type + '-courses').innerHTML = '';
  document.getElementById(type + '-result').classList.remove('show');
  addRow(type); addRow(type); addRow(type);
}

// ── Calculations ──

function calcAmerican() {
  const rows = document.querySelectorAll('#american-courses .course-row');
  let totalPoints = 0, totalCredits = 0;
  rows.forEach(row => {
    const grade   = row.querySelector('select').value;
    const credits = parseFloat(row.querySelectorAll('input')[1].value);
    if (credits > 0 && grade in americanGrades) {
      totalPoints  += americanGrades[grade] * credits;
      totalCredits += credits;
    }
  });
  if (totalCredits === 0) return alert('Please add at least one course with valid credits.');
  const gpa = totalPoints / totalCredits;
  document.getElementById('american-gpa').textContent    = gpa.toFixed(2);
  document.getElementById('american-letter').textContent = gpaToLetter(gpa);
  document.getElementById('american-status').textContent = gpaStanding(gpa);
  document.getElementById('american-result').classList.add('show');
}

function calcBritish() {
  const rows = document.querySelectorAll('#british-courses .course-row');
  let totalWeighted = 0, totalCredits = 0;
  rows.forEach(row => {
    const inputs  = row.querySelectorAll('input');
    const mark    = parseFloat(inputs[1].value);
    const credits = parseFloat(inputs[2].value);
    if (!isNaN(mark) && credits > 0 && mark >= 0 && mark <= 100) {
      totalWeighted += mark * credits;
      totalCredits  += credits;
    }
  });
  if (totalCredits === 0) return alert('Please add at least one module with a valid mark and credits.');
  const avg = totalWeighted / totalCredits;
  let cls, status;
  if (avg >= 70)      { cls = '1st Class Honours';   status = '🏆 Top classification'; }
  else if (avg >= 60) { cls = 'Upper Second (2:1)';  status = '🌟 Very strong result'; }
  else if (avg >= 50) { cls = 'Lower Second (2:2)';  status = '✅ Satisfactory pass'; }
  else if (avg >= 40) { cls = 'Third Class Honours'; status = '📚 Minimum honours pass'; }
  else                { cls = 'Fail';                status = '❌ Below pass threshold'; }
  document.getElementById('british-gpa').textContent    = avg.toFixed(1) + '%';
  document.getElementById('british-letter').textContent = cls;
  document.getElementById('british-status').textContent = status;
  document.getElementById('british-result').classList.add('show');
}

function calcIGCSE() {
  const rows = document.querySelectorAll('#igcse-courses .course-row');
  let totalPoints = 0, totalWeight = 0;
  let hasEntry = false;
  rows.forEach(row => {
    const grade  = row.querySelector('select').value;
    const weight = parseFloat(row.querySelectorAll('input')[1].value) || 0;
    if (weight > 0 && grade in igcseGrades) {
      totalPoints += igcseGrades[grade] * weight;
      totalWeight += weight;
      hasEntry = true;
    }
  });
  if (!hasEntry || totalWeight === 0) return alert('Please add at least one subject with a valid weight.');
  const avg = totalPoints / totalWeight;
  const lbl = igcseLabel(avg);
  let status;
  if (avg >= 8)      status = '🏆 Exceptional — University ready';
  else if (avg >= 6) status = '🌟 Strong IGCSE performance';
  else if (avg >= 5) status = '✅ Meets A-Level requirements';
  else if (avg >= 4) status = '📚 Passing — room to improve';
  else               status = '❌ Below pass — consider resits';
  document.getElementById('igcse-gpa').textContent    = avg.toFixed(2);
  document.getElementById('igcse-letter').textContent = 'Average: ' + lbl;
  document.getElementById('igcse-status').textContent = status;
  document.getElementById('igcse-result').classList.add('show');
}

function calcSTEM() {
  const rows = document.querySelectorAll('#stem-courses .course-row');
  const scale = stemScales[currentStemUni];
  let totalPoints = 0, count = 0;

  if (currentStemUni === 'pass_fail') {
    let passed = 0;
    rows.forEach(row => {
      const grade = row.querySelector('select').value;
      if (grade === 'Pass') passed++;
      count++;
    });
    if (count === 0) return alert('Please add at least one subject.');
    const pct = ((passed / count) * 100).toFixed(0);
    document.getElementById('stem-gpa').textContent    = passed + '/' + count;
    document.getElementById('stem-gpa-label').textContent = 'Subjects Passed';
    document.getElementById('stem-letter').textContent = pct + '% Pass Rate';
    document.getElementById('stem-status').textContent = passed === count ? '🏆 All subjects passed!' : passed > count / 2 ? '✅ Majority passed' : '⚠️ More than half failed';
    document.getElementById('stem-result').classList.add('show');
    return;
  }

  rows.forEach(row => {
    const grade = row.querySelector('select').value;
    if (grade in scale) {
      totalPoints += scale[grade];
      count++;
    }
  });
  if (count === 0) return alert('Please add at least one subject.');
  const gpa = totalPoints / count;
  const maxScale = currentStemUni === 'scale5' ? 5.0 : currentStemUni === 'percentage' ? 100 : (currentStemUni === 'plus4' ? 4.3 : 4.0);
  document.getElementById('stem-gpa').textContent    = gpa.toFixed(2);
  document.getElementById('stem-gpa-label').textContent = 'STEM GPA (' + maxScale + ' Scale)';
  document.getElementById('stem-letter').textContent = stemLetterLabel(gpa, currentStemUni);
  document.getElementById('stem-status').textContent = stemStanding(gpa, currentStemUni);
  document.getElementById('stem-result').classList.add('show');
}

// ── Thanaweya Amma ──
const sciSubjects = [
  { name: 'Arabic Language',      max: 60 },
  { name: 'First Foreign Language', max: 40 },
  { name: 'Pure Mathematics',     max: 90 },
  { name: 'Physics',              max: 90 },
  { name: 'Chemistry',            max: 90 },
  { name: 'Biology / Geology',    max: 90 },
];
const litSubjects = [
  { name: 'Arabic Language',       max: 60 },
  { name: 'First Foreign Language',max: 40 },
  { name: 'History',               max: 90 },
  { name: 'Geography',             max: 90 },
  { name: 'Philosophy & Logic',    max: 90 },
  { name: 'Second Foreign Language',max: 40 },
];

function buildThanGrid(subjects, gridId) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  subjects.forEach((subj, i) => {
    const box = document.createElement('div');
    box.className = 'grade-input-box';
    box.innerHTML = `
      <label>${subj.name}<span class="max-hint"> / ${subj.max}</span></label>
      <input type="number" id="${gridId}-${i}" placeholder="Score" min="0" max="${subj.max}" step="0.5" />`;
    grid.appendChild(box);
  });
}

function calcThan(track) {
  const subjects = track === 'sci' ? sciSubjects : litSubjects;
  const gridId   = track === 'sci' ? 'than-sci-grid' : 'than-lit-grid';
  let total = 0, maxTotal = 0;
  let hasEntry = false;

  subjects.forEach((subj, i) => {
    const el  = document.getElementById(gridId + '-' + i);
    const val = parseFloat(el?.value);
    if (!isNaN(val) && val >= 0) {
      total    += Math.min(val, subj.max); // cap at subject max
      hasEntry  = true;
    }
    maxTotal += subj.max;
  });

  if (!hasEntry) return alert('Please enter at least one subject score.');

  const pct = (total / maxTotal * 100).toFixed(1);
  let cls;
  if (pct >= 85)      cls = '🏆 Excellent';
  else if (pct >= 75) cls = '🌟 Very Good';
  else if (pct >= 65) cls = '✅ Good';
  else if (pct >= 50) cls = '📚 Pass';
  else                cls = '❌ Fail';

  document.getElementById('than-total').textContent   = total;
  document.getElementById('than-out-of').textContent  = 'out of ' + maxTotal;
  document.getElementById('than-percent').textContent = pct + '%';
  document.getElementById('than-status').textContent  = cls;
  document.getElementById('than-result').classList.add('show');
}

function clearThan() {
  document.querySelectorAll('#than-sci-grid input, #than-lit-grid input').forEach(i => i.value = '');
  document.getElementById('than-result').classList.remove('show');
}

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
  ['american', 'british', 'igcse', 'stem'].forEach(t => {
    addRow(t); addRow(t); addRow(t);
  });
  buildThanGrid(sciSubjects, 'than-sci-grid');
  buildThanGrid(litSubjects, 'than-lit-grid');
});
