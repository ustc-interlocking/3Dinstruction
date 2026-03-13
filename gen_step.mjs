import fs from "node:fs";

const objText = fs.readFileSync("./model.obj", "utf8");

// OBJ 常见：o xxx 或 g xxx
const names = [];
for (const line of objText.split(/\r?\n/)) {
  if (line.startsWith("o ")) names.push(line.slice(2).trim());
  else if (line.startsWith("g ")) names.push(line.slice(2).trim());
}

// 去重 + 过滤空
const uniq = [...new Set(names)].filter(Boolean);

// 生成：每步一个零件（你可以后续手动合并步骤）
const steps = uniq.map((n, i) => ({
  add: [n],
  note: `安装：${n}`
}));

fs.writeFileSync("./steps.json", JSON.stringify({ steps }, null, 2), "utf8");
console.log(`Done. parts=${uniq.length}, steps.json generated.`);