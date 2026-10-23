// TTD Darshan Fill — Content Script

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'fill') {
    var count = 0;
    for (var i = 0; i < msg.list.length; i++) {
      count += fillPilgrim(msg.list[i].pilgrimIndex, msg.list[i].profile);
    }
    sendResponse({ ok: true, count: count });
  }
  return true;
});

// Set value on an input (works with plain HTML and React/Angular)
function setVal(el, value) {
  if (!el || value === undefined || value === null || value === '') return 0;
  try {
    var desc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
    if (desc && desc.set && el.tagName === 'INPUT') {
      desc.set.call(el, value);
    } else {
      el.value = value;
    }
  } catch(e) {
    el.value = value;
  }
  el.dispatchEvent(new Event('input',  { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.dispatchEvent(new Event('blur',   { bubbles: true }));
  return 1;
}

// Set a <select> by matching option text or value
function setSelectVal(el, value) {
  if (!el || !value) return 0;
  var opts = Array.from(el.options);
  var match = opts.find(function(o) {
    return o.text.toLowerCase().includes(value.toLowerCase()) ||
           o.value.toLowerCase().includes(value.toLowerCase());
  });
  if (!match) return 0;
  el.value = match.value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.dispatchEvent(new Event('blur',   { bubbles: true }));
  return 1;
}

// Get the Nth element matching a selector (0-indexed)
function getNth(selector, n) {
  try {
    var all = document.querySelectorAll(selector);
    return all[n] || null;
  } catch(e) { return null; }
}

function fillPilgrim(idx, p) {
  var count = 0;

  // ── Strategy 1: target by index within all matching inputs on page ──
  // The form has Person 1..6 each with Name, Age, then selects for Gender, ID Proof, then ID Number input
  // All name inputs
  var nameInputs = document.querySelectorAll([
    'input[name*="name" i]',
    'input[id*="name" i]',
    'input[placeholder*="name" i]',
    'input[formcontrolname*="name" i]'
  ].join(','));
  // filter out non-pilgrim fields like search/username
  nameInputs = Array.from(nameInputs).filter(function(el) {
    var nm = (el.name + el.id + el.placeholder).toLowerCase();
    return !nm.includes('search') && !nm.includes('user') && !nm.includes('login') && !nm.includes('email');
  });
  if (nameInputs[idx]) count += setVal(nameInputs[idx], p.name);

  var ageInputs = document.querySelectorAll([
    'input[name*="age" i]',
    'input[id*="age" i]',
    'input[placeholder*="age" i]',
    'input[formcontrolname*="age" i]'
  ].join(','));
  if (ageInputs[idx]) count += setVal(ageInputs[idx], p.age);

  var genderSelects = document.querySelectorAll([
    'select[name*="gender" i]',
    'select[id*="gender" i]',
    'select[formcontrolname*="gender" i]'
  ].join(','));
  if (genderSelects[idx]) count += setSelectVal(genderSelects[idx], p.gender);

  var idProofSelects = document.querySelectorAll([
    'select[name*="proof" i]',
    'select[id*="proof" i]',
    'select[formcontrolname*="proof" i]',
    'select[name*="idtype" i]',
    'select[id*="idtype" i]',
    'select[formcontrolname*="idtype" i]',
    'select[name*="photo" i]',
    'select[id*="photo" i]',
    'select[formcontrolname*="photo" i]',
    'select[name*="document" i]',
    'select[id*="document" i]'
  ].join(','));
  if (idProofSelects[idx]) count += setSelectVal(idProofSelects[idx], p.idProof);

  var idNumInputs = document.querySelectorAll([
    'input[name*="idno" i]',
    'input[id*="idno" i]',
    'input[formcontrolname*="idno" i]',
    'input[name*="idnumber" i]',
    'input[id*="idnumber" i]',
    'input[formcontrolname*="idnumber" i]',
    'input[name*="proofno" i]',
    'input[id*="proofno" i]',
    'input[name*="photoid" i]',
    'input[id*="photoid" i]',
    'input[formcontrolname*="photoid" i]',
    'input[placeholder*="id number" i]',
    'input[placeholder*="aadhaar" i]',
    'input[placeholder*="number" i]'
  ].join(','));
  if (idNumInputs[idx]) count += setVal(idNumInputs[idx], p.idNumber);

  // ── Strategy 2: find person section by heading and fill within it ──
  if (count === 0) {
    var sections = document.querySelectorAll('div, section, fieldset, tr');
    var personSection = null;
    sections.forEach(function(sec) {
      var text = sec.textContent || '';
      var headings = ['person ' + (idx+1), 'pilgrim ' + (idx+1), 'member ' + (idx+1), 'devotee ' + (idx+1)];
      headings.forEach(function(h) {
        if (text.toLowerCase().includes(h) && sec.querySelectorAll('input').length > 0) {
          if (!personSection) personSection = sec;
        }
      });
    });
    if (personSection) {
      var inputs  = personSection.querySelectorAll('input[type="text"], input[type="number"], input:not([type])');
      var selects = personSection.querySelectorAll('select');
      if (inputs[0])  count += setVal(inputs[0], p.name);
      if (inputs[1])  count += setVal(inputs[1], p.age);
      if (selects[0]) count += setSelectVal(selects[0], p.gender);
      if (selects[1]) count += setSelectVal(selects[1], p.idProof);
      if (inputs[2])  count += setVal(inputs[2], p.idNumber);
    }
  }

  return count;
}
