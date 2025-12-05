# 欢迎来到 Hush 技术博客

<style>
/* 页面整体样式 */
.hero {
  text-align: center;
  margin-top: 50px;
}.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #0a192f;
}.hero p {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
}/* 卡片容器 */
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
}/* 单个卡片 */
.card {
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  width: 280px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: left;
}.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}.card h2 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #0a192f;
}.card p {
  font-size: 1rem;
  color: #555;
}/* 卡片按钮 */
.card a {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 14px;
  border-radius: 6px;
  text-decoration: none;
  color: #fff;
  background-color: #0077ff;
  transition: background-color 0.2s;
}.card a:hover {
  background-color: #005fcc;
}</style>
<div class="hero">
  <h1>Hush 技术博客</h1>
  <p>记录我的技术学习笔记与实践项目，持续沉淀与分享</p>
</div>

<div class="cards">
  <div class="card">
    <h2>ClickHouse 学习笔记</h2>
    <p>ClickHouse 安装、配置及 SQL 查询基础，手把手记录学习过程。</p>
    <a href="/ClickHouse学习笔记">阅读文章</a>
  </div>
  <div class="card">
    <h2>Java 基础</h2>
    <p>Java 核心语法、面向对象、集合框架及常用工具方法笔记。</p>
    <a href="/Java基础">阅读文章</a>
  </div>
  <div class="card">
    <h2>前端技术</h2>
    <p>HTML、CSS、JavaScript、Vue 及现代前端开发技巧整理。</p>
    <a href="/frontend">阅读文章</a>
  </div>
  <div class="card">
    <h2>项目与实践</h2>
    <p>个人项目、实战案例以及技术栈应用心得分享。</p>
    <a href="/projects">阅读文章</a>
  </div>
</div>
