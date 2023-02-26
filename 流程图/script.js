const diagram = document.getElementById('diagram');
const updateBtn = document.getElementById('updateBtn');

// 解析 XML 文件并渲染 SVG 图表
fetch(diagram.src)
  .then(response => response.text())
  .then(xml => {
    const svg = parseDiagram(xml);
    document.body.appendChild(svg);
  });

// 解析 XML 文件并返回 SVG 图表
function parseDiagram(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');

  // 获取 Draw.io 中保存的 SVG 图表
  const svgXml = doc.getElementsByTagName('diagram')[0].innerHTML;
  const svgDoc = parser.parseFromString(svgXml, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // 将 SVG 图表转换为 D3.js selection
  const svg = d3.select(svgElement);

  // 添加事件监听，动态修改图表
  updateBtn.addEventListener('click', function() {
    svg.select('#rect-1').attr('fill', 'red');
  });

  return svgElement;
}
