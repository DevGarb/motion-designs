// Utilidades compartilhadas: escape de texto e curvas de nível do fundo
window.MD = {
  esc: s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  pad: n => String(n).padStart(2, "0"),
  topo(svg) {
    let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const ph = Array.from({ length: 7 }, () => rnd() * 6.28), am = Array.from({ length: 7 }, () => 0.05 + rnd() * 0.07);
    let out = "";
    for (let k = 1; k <= 14; k++) {
      const R = 40 + k * 32, pts = [];
      for (let a = 0; a <= 64; a++) {
        const t = a / 64 * 6.2832; let r = R;
        for (let h = 0; h < 7; h++) r += R * am[h] * Math.sin((h + 2) * t + ph[h] + k * 0.18);
        pts.push((r * Math.cos(t)).toFixed(1) + " " + (r * Math.sin(t)).toFixed(1));
      }
      out += `<path d="M${pts.join(" L")}Z"/>`;
    }
    svg.innerHTML = out;
  },
  // Curva suave (Catmull-Rom) passando pelos pontos; devolve amostras e comprimentos acumulados
  curve(P, K = 16) {
    const n = P.length - 1, S = [];
    for (let i = 0; i < n; i++) {
      const a = P[Math.max(0, i - 1)], b = P[i], c = P[i + 1], e = P[Math.min(n, i + 2)];
      for (let k = 0; k < K; k++) {
        const u = k / K, u2 = u * u, u3 = u2 * u;
        const f = j => 0.5 * (2 * b[j] + (c[j] - a[j]) * u + (2 * a[j] - 5 * b[j] + 4 * c[j] - e[j]) * u2 + (3 * b[j] - a[j] - 3 * c[j] + e[j]) * u3);
        S.push([f(0), f(1)]);
      }
    }
    S.push(P[n]);
    const L = [0];
    for (let i = 1; i < S.length; i++) L.push(L[i - 1] + Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]));
    return { S, L, K, total: L[L.length - 1], d: "M" + S.map(q => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L") };
  }
};
