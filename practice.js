"use strict";

const byId = id => document.getElementById(id);
const questions = QUESTION_BANK;
const questionsById = new Map(questions.map(question => [question.id, question]));
const positionById = new Map(questions.map((question, position) => [question.id, position]));
const progressKey = "aip-c01.zh.v1.";
const records = new Map();
const pageSize = 20;
let storageAvailable = true;
let mapFilter = "all";
let mapPage = 0;

function readLocal(key) {
  try {
    return localStorage.getItem(progressKey + key);
  } catch {
    storageAvailable = false;
    return null;
  }
}

function writeLocal(key, value) {
  try {
    if (value === null) localStorage.removeItem(progressKey + key);
    else localStorage.setItem(progressKey + key, value);
  } catch {
    storageAvailable = false;
  }
}

function getRecord(question, encoded) {
  if (encoded === null) return null;
  try {
    const data = JSON.parse(encoded);
    if (!data || typeof data.graded !== "boolean" || !Array.isArray(data.choices)) return null;
    const valid = data.choices.every(key => Object.hasOwn(question.options, key));
    const choices = [...new Set(data.choices)].sort();
    if (!valid || choices.length !== data.choices.length || choices.length === 0) return null;
    if (choices.length > question.answer.length || (data.graded && choices.length !== question.answer.length)) return null;
    return { choices, graded: data.graded };
  } catch {
    return null;
  }
}

function saveRecord(id, record) {
  if (record) records.set(id, record);
  else records.delete(id);
  writeLocal("q." + id, record ? JSON.stringify(record) : null);
}

function idFromHash() {
  const match = /^#q-(\d+)$/.exec(location.hash);
  const id = match ? Number(match[1]) : 0;
  return questionsById.has(id) ? id : null;
}

for (const question of questions) {
  const record = getRecord(question, readLocal("q." + question.id));
  if (record) records.set(question.id, record);
}

const previousId = Number(readLocal("current"));
let currentId = idFromHash() ?? (questionsById.has(previousId) ? previousId : questions[0].id);

function textElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function correct(question, record) {
  return record.choices.length === question.answer.length && record.choices.every(key => question.answer.includes(key));
}

function outcome(question) {
  const record = records.get(question.id);
  if (!record?.graded) return "unanswered";
  return correct(question, record) ? "right" : "wrong";
}

function renderStem(question) {
  const stem = byId("stem");
  stem.replaceChildren();
  const lines = question.stem.split(/\n+/).filter(Boolean);
  let logLines = [];
  function flushLog() {
    if (!logLines.length) return;
    const pre = document.createElement("pre");
    pre.append(textElement("code", logLines.join("\n")));
    stem.append(pre);
    logLines = [];
  }
  for (const [index, line] of lines.entries()) {
    if (/^(用户|操作|资源|上下文)\s*[:：]/.test(line)) {
      logLines.push(line);
      continue;
    }
    flushLog();
    if (/^python\s+\w+\s*=/.test(line)) {
      const pre = document.createElement("pre");
      pre.append(textElement("code", line.replace(/^python\s+/, "")));
      stem.append(pre);
    } else {
      const isAsk = lines.length > 1 && index === lines.length - 1 && /[?？]/.test(line);
      stem.append(textElement("p", line, isAsk ? "question-ask" : ""));
    }
  }
  flushLog();
}

function renderChoices(question) {
  const record = records.get(question.id);
  const selected = record?.choices ?? [];
  const graded = Boolean(record?.graded);
  const required = question.answer.length;
  const multi = required > 1;
  const holder = byId("choices");
  holder.replaceChildren();
  byId("instructions").textContent = graded ? "本题选项" : multi
    ? "请选择 " + required + " 项，再提交答案" : "点选一个选项即可查看解析";
  for (const [key, text] of Object.entries(question.options)) {
    const choice = document.createElement("button");
    choice.type = "button";
    choice.className = "choice";
    choice.dataset.key = key;
    choice.disabled = graded;
    const picked = selected.includes(key);
    choice.append(textElement("span", key, "choice-letter"), textElement("span", text, "choice-text"));
    if (graded) {
      if (question.answer.includes(key)) {
        choice.classList.add("correct");
        const message = picked ? "✓ 正确答案 · 已选" : "✓ 正确答案 · 未选";
        choice.append(textElement("span", message, "choice-mark"));
      } else if (picked) {
        choice.classList.add("incorrect");
        choice.append(textElement("span", "× 你的选择 · 错选", "choice-mark"));
      }
    } else if (multi) {
      choice.setAttribute("aria-pressed", String(picked));
      choice.classList.toggle("selected", picked);
    }
    holder.append(choice);
  }
  byId("multi-actions").hidden = graded || !multi;
  byId("selection-count").textContent = "已选 " + selected.length + " / " + required;
  byId("submit-answer").disabled = selected.length !== required;
}

function renderFeedback(question) {
  const record = records.get(question.id);
  const panel = byId("feedback");
  panel.hidden = !record?.graded;
  byId("retry").hidden = !record?.graded;
  for (const id of ["choice-details", "source-details"]) byId(id).open = false;
  if (!record?.graded) return;
  const right = correct(question, record);
  panel.dataset.correct = String(right);
  byId("verdict").textContent = right ? "回答正确" : "回答错误";
  byId("grade").textContent = "你的选择 " + record.choices.join("、") + "　·　参考答案 " + question.answer.join("、");
  byId("source-label").textContent = question.sourceLabel;
  byId("explanation").replaceChildren(...question.explanation.split(/\n+/).filter(Boolean).map(line => textElement("p", line)));
  const notes = byId("choice-notes");
  notes.replaceChildren();
  for (const key of Object.keys(question.options)) {
    const note = question.optionNotes?.[key];
    if (note) notes.append(textElement("dt", key), textElement("dd", note));
  }
  byId("choice-details").hidden = !notes.childElementCount;
  byId("source-pages").textContent = "原题 #" + question.id + "　·　题目版第 " + question.questionPage
    + " 页　·　答案版第 " + question.page + " 页　·　讨论版第 " + question.sourcePage + " 页";
  const votes = Object.entries(question.votes ?? {});
  byId("source-votes").hidden = !votes.length;
  byId("source-votes").textContent = votes.length ? "原资料的社区投票　" + votes.map(([key, value]) => key + " " + value + "%").join("　") : "";
  const links = byId("source-links");
  links.replaceChildren();
  if (question.references?.length) {
    const ul = document.createElement("ul");
    for (const ref of question.references) {
      const row = document.createElement("li");
      const link = textElement("a", ref.title);
      link.href = ref.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      row.append(link);
      ul.append(row);
    }
    links.append(ul);
  }
}

function renderMap(followCurrent = false) {
  const counts = { right: 0, wrong: 0, unanswered: 0 };
  const visible = [];
  for (const q of questions) {
    const state = outcome(q);
    counts[state]++;
    if (mapFilter === "all" || mapFilter === state) visible.push({ id: q.id, state });
  }
  const answered = counts.right + counts.wrong;
  const total = questions.length;
  byId("correct-count").textContent = counts.right;
  byId("wrong-count").textContent = counts.wrong;
  byId("unanswered-count").textContent = counts.unanswered;
  byId("progress-text").textContent = "已答 " + answered + " / " + total;
  byId("progress").max = total;
  byId("progress").value = answered;
  byId("storage-note").textContent = storageAvailable ? "进度保存在当前浏览器" : "浏览器限制存储，本次进度仅在当前页面保留";
  for (const element of byId("map-filters").querySelectorAll("button")) {
    const active = element.dataset.filter === mapFilter;
    element.classList.toggle("selected", active);
    element.setAttribute("aria-pressed", String(active));
  }
  const pageCount = Math.ceil(visible.length / pageSize);
  const position = visible.findIndex(item => item.id === currentId);
  if (followCurrent && position >= 0) mapPage = Math.floor(position / pageSize);
  mapPage = Math.max(0, Math.min(mapPage, pageCount - 1));
  const grid = byId("map-grid");
  grid.replaceChildren();
  const labels = { right: "答对", wrong: "答错", unanswered: "未答" };
  for (const {id, state} of visible.slice(mapPage * pageSize, (mapPage + 1) * pageSize)) {
    const btn = textElement("button", String(id), "number-btn " + state);
    btn.type = "button";
    btn.dataset.id = String(id);
    btn.setAttribute("aria-label", "第 " + id + " 题，" + labels[state]);
    if (id === currentId) btn.setAttribute("aria-current", "step");
    grid.append(btn);
  }
  byId("map-empty").hidden = visible.length > 0;
  byId("map-empty").textContent = mapFilter === "wrong" ? "目前没有错题" : "所有题目均已作答";
  byId("map-pagination").hidden = pageCount <= 1;
  byId("map-page").textContent = (mapPage + 1) + " / " + pageCount;
  byId("map-prev").disabled = mapPage === 0;
  byId("map-next").disabled = mapPage + 1 >= pageCount;
}

function renderQuestion() {
  const question = questionsById.get(currentId);
  byId("number").textContent = "第 " + question.id + " 题";
  byId("type").textContent = question.answer.length === 1 ? "单选题" : "多选题 · 选 " + question.answer.length + " 项";
  renderStem(question);
  renderChoices(question);
  renderFeedback(question);
  const index = positionById.get(currentId);
  byId("previous").disabled = index === 0;
  byId("next").disabled = index === questions.length - 1;
  renderMap(true);
}

function navigate(id, updateUrl = true) {
  if (!questionsById.has(id)) return;
  const dialog = byId("map-dialog");
  if (dialog.open) dialog.close();
  currentId = id;
  writeLocal("current", String(id));
  if (updateUrl && location.hash !== "#q-" + id) {
    try { history.replaceState(null, "", "#q-" + id); } catch { /* A local preview may restrict history. */ }
  }
  byId("live").textContent = "";
  renderQuestion();
  byId("number").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function grade(question, choices) {
  if (records.get(question.id)?.graded || choices.length !== question.answer.length) return;
  saveRecord(question.id, { choices: [...choices].sort(), graded: true });
  renderChoices(question);
  renderFeedback(question);
  renderMap();
  const result = byId("verdict");
  byId("live").textContent = result.textContent + "。" + byId("grade").textContent;
  result.focus({ preventScroll: true });
  byId("feedback").scrollIntoView({ block: "start", behavior: "instant" });
}

byId("choices").addEventListener("click", event => {
  const button = event.target.closest("button[data-key]");
  if (!button || button.disabled) return;
  const key = button.dataset.key;
  const question = questionsById.get(currentId);
  const required = question.answer.length;
  if (required === 1) {
    grade(question, [key]);
    return;
  }
  const choices = [...(records.get(currentId)?.choices ?? [])];
  const index = choices.indexOf(key);
  if (index >= 0) choices.splice(index, 1);
  else if (choices.length < required) choices.push(key);
  else {
    byId("selection-count").textContent = "已选满 " + required + " 项，可先取消一个选项";
    byId("live").textContent = byId("selection-count").textContent;
    return;
  }
  saveRecord(currentId, choices.length ? { choices: choices.sort(), graded: false } : null);
  renderChoices(question);
  byId("choices").querySelector('button[data-key="' + key + '"]').focus({ preventScroll: true });
  byId("live").textContent = byId("selection-count").textContent;
});

byId("submit-answer").addEventListener("click", () => grade(questionsById.get(currentId), records.get(currentId)?.choices ?? []));
byId("retry").addEventListener("click", () => {
  saveRecord(currentId, null);
  navigate(currentId);
  byId("live").textContent = "可以重新作答本题。";
});
byId("previous").addEventListener("click", () => navigate(questions[positionById.get(currentId) - 1]?.id));
byId("next").addEventListener("click", () => navigate(questions[positionById.get(currentId) + 1]?.id));
byId("map-grid").addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (button) navigate(Number(button.dataset.id));
});
byId("map-filters").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  mapFilter = button.dataset.filter;
  mapPage = 0;
  renderMap(true);
});
byId("map-prev").addEventListener("click", () => { mapPage--; renderMap(); });
byId("map-next").addEventListener("click", () => { mapPage++; renderMap(); });

const mobile = window.matchMedia("(max-width: 840px)");
const dialog = byId("map-dialog");
function positionMap() {
  if (!mobile.matches && dialog.open) dialog.close();
  byId(mobile.matches ? "mobile-map" : "desktop-map").append(byId("question-map"));
}
mobile.addEventListener("change", positionMap);
byId("open-map").addEventListener("click", () => {
  renderMap(true);
  dialog.showModal();
});
byId("close-map").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
window.addEventListener("hashchange", () => { const id = idFromHash(); if (id !== null) navigate(id, false); });
window.addEventListener("storage", event => {
  if (event.key === null) {
    records.clear();
    renderQuestion();
    return;
  }
  if (!event.key.startsWith(progressKey + "q.")) return;
  const id = Number(event.key.slice((progressKey + "q.").length));
  const question = questionsById.get(id);
  if (!question) return;
  const record = getRecord(question, event.newValue);
  if (record) records.set(id, record);
  else records.delete(id);
  if (id === currentId) renderQuestion();
  else renderMap();
});
positionMap();
renderQuestion();
