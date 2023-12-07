import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router';

const Home = () => {
  routes.filter((route) => route.path !== '/')

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {/* 遍历页面文件列表生成跳转链接 */}
        {routes.map((page) => (
          <li key={page.path}>
            <Link to={`${page.path}`}>{page.path}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
